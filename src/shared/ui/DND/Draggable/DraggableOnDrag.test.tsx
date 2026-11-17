import {fireEvent, render} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {DropContext, type DropHandler} from '../DropContext';
import {DroppableOnDrag} from '../Droppable/DroppableOnDrag';
import {DraggableOnDrag} from './DraggableOnDrag';

let elementUnderPointer: Element | null = null;

const renderBoard = (onDrop: DropHandler) =>
	render(
		<DropContext.Provider value={onDrop}>
			<DroppableOnDrag dropId="sec-1">
				{({ref, ...drop}) => (
					<div ref={ref} data-testid="sec-1" {...drop}>
						<DraggableOnDrag dragId="msg-1" sourceId="sec-1">
							{({ref: cardRef, onDragStart, onPointerDown}) => (
								<div ref={cardRef} data-testid="card" onDragStart={onDragStart}>
									<button type="button" data-testid="grip" onPointerDown={onPointerDown} />
								</div>
							)}
						</DraggableOnDrag>
					</div>
				)}
			</DroppableOnDrag>
			<DroppableOnDrag dropId="sec-2">
				{({ref, ...drop}) => <div ref={ref} data-testid="sec-2" {...drop} />}
			</DroppableOnDrag>
		</DropContext.Provider>,
	);

describe('DraggableOnDrag: касание (pointer events)', () => {
	beforeEach(() => {
		document.elementFromPoint = () => elementUnderPointer;

		HTMLElement.prototype.setPointerCapture = vi.fn();
	});

	afterEach(() => {
		elementUnderPointer = null;
	});

	it('переносит карточку в другую дроп-зону при отпускании', () => {
		const onDrop = vi.fn();
		const {getByTestId} = renderBoard(onDrop);
		elementUnderPointer = getByTestId('sec-2');

		fireEvent.pointerDown(getByTestId('grip'), {clientX: 0, clientY: 0, button: 0, pointerId: 1});
		fireEvent.pointerMove(window, {clientX: 50, clientY: 10, pointerId: 1});
		fireEvent.pointerUp(window, {clientX: 50, clientY: 10, pointerId: 1});

		expect(onDrop).toHaveBeenCalledWith('msg-1', 'sec-2', 'sec-1');
	});

	it('не переносит, если отпустили над исходной зоной', () => {
		const onDrop = vi.fn();
		const {getByTestId} = renderBoard(onDrop);
		elementUnderPointer = getByTestId('sec-1');

		fireEvent.pointerDown(getByTestId('grip'), {clientX: 0, clientY: 0, button: 0, pointerId: 1});
		fireEvent.pointerMove(window, {clientX: 50, clientY: 10, pointerId: 1});
		fireEvent.pointerUp(window, {clientX: 50, clientY: 10, pointerId: 1});

		expect(onDrop).toHaveBeenCalledWith('msg-1', 'sec-1', 'sec-1');
	});

	it('клик без движения не считается переносом', () => {
		const onDrop = vi.fn();
		const {getByTestId} = renderBoard(onDrop);
		elementUnderPointer = getByTestId('sec-2');

		fireEvent.pointerDown(getByTestId('grip'), {clientX: 0, clientY: 0, button: 0, pointerId: 1});
		fireEvent.pointerUp(window, {clientX: 0, clientY: 0, pointerId: 1});

		expect(onDrop).not.toHaveBeenCalled();
	});

	it('мышь (pointerType=mouse) не запускает pointer-путь: это работа HTML5 drag', () => {
		const onDrop = vi.fn();
		const {getByTestId} = renderBoard(onDrop);
		elementUnderPointer = getByTestId('sec-2');

		fireEvent.pointerDown(getByTestId('grip'), {
			clientX: 0,
			clientY: 0,
			button: 0,
			pointerId: 1,
			pointerType: 'mouse',
		});
		fireEvent.pointerMove(window, {clientX: 50, clientY: 10, pointerId: 1});
		fireEvent.pointerUp(window, {clientX: 50, clientY: 10, pointerId: 1});

		expect(onDrop).not.toHaveBeenCalled();
	});
});

describe('DraggableOnDrag: мышь (HTML5 drag)', () => {
	it('dragstart кладет id карточки и исходную секцию, drop в другую секцию вызывает onDrop', () => {
		const onDrop = vi.fn();
		const {getByTestId} = renderBoard(onDrop);
		const store: Record<string, string> = {};
		const dataTransfer = {
			setData: (key: string, value: string) => {
				store[key] = value;
			},
			getData: (key: string) => store[key] ?? '',
		};

		fireEvent.dragStart(getByTestId('card'), {dataTransfer});
		fireEvent.drop(getByTestId('sec-1'), {dataTransfer});
		expect(onDrop).not.toHaveBeenCalled();

		fireEvent.dragStart(getByTestId('card'), {dataTransfer});
		fireEvent.drop(getByTestId('sec-2'), {dataTransfer});
		expect(onDrop).toHaveBeenCalledWith('msg-1', 'sec-2', 'sec-1');
	});
});
