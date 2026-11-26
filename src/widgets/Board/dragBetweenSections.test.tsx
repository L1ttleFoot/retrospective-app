import {act, fireEvent, screen, waitFor, within} from '@testing-library/react';
import {HttpResponse, http} from 'msw';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import {server} from '@/src/mocks/node';
import {useAuth} from '@/store/useAuth';
import {useBoards} from '@/store/useBoards';
import {DropContext} from '@/ui/DND/DropContext';
import {render} from '@/utils/testUtils';

import {Board} from './Board';
import {BoardSection} from './BoardSection';

vi.mock('@floating-ui/react-dom', async (importOriginal) => ({
	...(await importOriginal<typeof import('@floating-ui/react-dom')>()),
	useFloating: () => ({
		refs: {setReference: () => {}, setFloating: () => {}},
		strategy: 'absolute',
		x: 0,
		y: 0,
	}),
}));

const OWNER_ID = 'owner-1';

const message = (id: string, sectionId: string) => ({
	id,
	sectionId,
	text: `text-${id}`,
	color: '#ffd700',
	pinnedAt: null,
	reactions: [],
	authorId: OWNER_ID,
	ownerId: OWNER_ID,
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
});

let elementUnderPointer: Element | null = null;

describe('перенос карточки между секциями (интеграция BoardSection + DraggableOnDrag)', () => {
	beforeEach(() => {
		useAuth.setState({
			userData: {id: OWNER_ID, username: 'u', token: 't', roles: [], isGuest: false},
			isAuth: true,
		});
		document.elementFromPoint = () => elementUnderPointer;
		HTMLElement.prototype.setPointerCapture = vi.fn();

		server.use(
			http.get('*/api/sections/:sectionId/messages', ({params}) =>
				HttpResponse.json({messages: params.sectionId === 's1' ? [message('m1', 's1')] : []}),
			),
		);
	});

	it('отпускание над другой секцией вызывает onDrop с id целевой секции', async () => {
		const onDrop = vi.fn();
		render(
			<DropContext.Provider value={onDrop}>
				<BoardSection id="s1" title="Первая" color="#ffd700" boardId="b1" />
				<BoardSection id="s2" title="Вторая" color="#00ff00" boardId="b1" />
			</DropContext.Provider>,
		);

		await screen.findByText('text-m1');
		const card = screen.getByText('text-m1').closest('[data-drag-id], div[class]') as HTMLElement;
		const actions = screen.getByLabelText('actions area');
		const grip = within(actions).getAllByRole('button')[0];
		const target = document.querySelector('[data-drop-id="s2"]');
		expect(target).not.toBeNull();

		elementUnderPointer = target;
		await act(async () => {
			fireEvent.pointerDown(grip, {clientX: 0, clientY: 0, button: 0, pointerId: 1});
			fireEvent.pointerMove(window, {clientX: 40, clientY: 20, pointerId: 1});
			fireEvent.pointerUp(window, {clientX: 40, clientY: 20, pointerId: 1});
		});

		await waitFor(() => expect(onDrop).toHaveBeenCalledWith('m1', 's2', 's1'));
		expect(card).toBeDefined();
	});

	it('полная доска: отпускание над другой секцией отправляет PATCH с новым sectionId', async () => {
		const patches: unknown[] = [];
		vi.stubGlobal(
			'EventSource',
			class {
				addEventListener() {}
				close() {}
			},
		);
		server.use(
			http.get('*/api/boards/:boardId/sections', () =>
				HttpResponse.json({
					boardTitle: 'Test board',
					sections: [
						{id: 's1', title: 'Первая', color: '#ffd700', boardId: 'b1'},
						{id: 's2', title: 'Вторая', color: '#00ff00', boardId: 'b1'},
					],
				}),
			),
			http.patch('*/api/messages/:messageId', async ({request, params}) => {
				patches.push({id: params.messageId, body: await request.json()});
				return HttpResponse.json({});
			}),
		);
		useBoards.setState({currentBoardId: 'b1'});

		render(<Board />);

		await screen.findByText('text-m1');
		const grip = within(screen.getByLabelText('actions area')).getAllByRole('button')[0];
		elementUnderPointer = document.querySelector('[data-drop-id="s2"]');

		await act(async () => {
			fireEvent.pointerDown(grip, {clientX: 0, clientY: 0, button: 0, pointerId: 1});
			fireEvent.pointerMove(window, {clientX: 40, clientY: 20, pointerId: 1});
			fireEvent.pointerUp(window, {clientX: 40, clientY: 20, pointerId: 1});
		});

		await waitFor(() => expect(patches).toEqual([{id: 'm1', body: {sectionId: 's2'}}]));
		useBoards.setState({currentBoardId: undefined});
	});

	it('показывает ошибку, если не удалось загрузить секции доски', async () => {
		vi.stubGlobal(
			'EventSource',
			class {
				addEventListener() {}
				close() {}
			},
		);
		server.use(
			http.get('*/api/boards/:boardId/sections', () =>
				HttpResponse.json({message: 'failed'}, {status: 500}),
			),
		);
		useBoards.setState({currentBoardId: 'b1'});

		render(<Board />);

		expect(await screen.findByRole('alert')).toHaveTextContent(
			'Ошибка на стороне сервера. Попробуйте позже',
		);
		useBoards.setState({currentBoardId: undefined});
	});

	it('возвращает карточку в исходную секцию при ошибке PATCH', async () => {
		const patches: string[] = [];
		vi.stubGlobal(
			'EventSource',
			class {
				addEventListener() {}
				close() {}
			},
		);
		server.use(
			http.get('*/api/boards/:boardId/sections', () =>
				HttpResponse.json({
					boardTitle: 'Test board',
					sections: [
						{id: 's1', title: 'Первая', color: '#ffd700', boardId: 'b1'},
						{id: 's2', title: 'Вторая', color: '#00ff00', boardId: 'b1'},
					],
				}),
			),
			http.patch('*/api/messages/:messageId', ({params}) => {
				patches.push(params.messageId as string);
				return HttpResponse.json({message: 'failed'}, {status: 500});
			}),
		);
		useBoards.setState({currentBoardId: 'b1'});

		render(<Board />);

		await screen.findByText('text-m1');
		const source = document.querySelector('[data-drop-id="s1"]') as HTMLElement;
		const target = document.querySelector('[data-drop-id="s2"]') as HTMLElement;
		const grip = within(screen.getByLabelText('actions area')).getAllByRole('button')[0];
		elementUnderPointer = target;

		await act(async () => {
			fireEvent.pointerDown(grip, {clientX: 0, clientY: 0, button: 0, pointerId: 1});
			fireEvent.pointerMove(window, {clientX: 40, clientY: 20, pointerId: 1});
			fireEvent.pointerUp(window, {clientX: 40, clientY: 20, pointerId: 1});
		});

		await waitFor(() => expect(patches).toEqual(['m1']));
		await waitFor(() => {
			expect(within(source).getByText('text-m1')).toBeInTheDocument();
			expect(within(target).queryByText('text-m1')).not.toBeInTheDocument();
		});
		useBoards.setState({currentBoardId: undefined});
	});
});
