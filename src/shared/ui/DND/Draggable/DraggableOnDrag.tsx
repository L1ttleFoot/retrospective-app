import {
	DragEvent,
	ReactElement,
	PointerEvent as ReactPointerEvent,
	useContext,
	useRef,
} from 'react';

import {DropContext} from '../DropContext';

const DRAG_THRESHOLD = 5;

export type DraggableChildrenProps = {
	ref: (element: HTMLDivElement | null) => void;
	onDragStart: (event: DragEvent<HTMLDivElement>) => void;
	onPointerDown: (event: ReactPointerEvent<HTMLElement>) => void;
};

type DraggableProps = {
	children: (props: DraggableChildrenProps) => ReactElement;
	dragId: string;
	sourceId: string;
};

export const DraggableOnDrag = ({children, dragId, sourceId}: DraggableProps) => {
	const cardRef = useRef<HTMLDivElement | null>(null);
	const onDrop = useContext(DropContext);

	const setCardRef = (element: HTMLDivElement | null) => {
		cardRef.current = element;
	};

	const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
		event.dataTransfer.setData('draggableItemId', dragId);
		event.dataTransfer.setData('sourceDropId', sourceId);
	};

	const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
		const card = cardRef.current;
		if (!card || event.button !== 0 || event.pointerType === 'mouse') return;

		event.preventDefault();
		const handle = event.currentTarget;
		handle.setPointerCapture(event.pointerId);

		const startX = event.clientX;
		const startY = event.clientY;
		let isDragging = false;
		let overDrop: HTMLElement | null = null;

		const setOver = (element: HTMLElement | null) => {
			if (element === overDrop) return;
			overDrop?.removeAttribute('data-over');
			element?.setAttribute('data-over', 'true');
			overDrop = element;
		};

		const handleMove = (moveEvent: PointerEvent) => {
			const dx = moveEvent.clientX - startX;
			const dy = moveEvent.clientY - startY;

			if (!isDragging) {
				if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
				isDragging = true;
				card.style.zIndex = '1';
				card.style.pointerEvents = 'none';
				handle.style.pointerEvents = 'none';
			}

			card.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;

			const element = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY);
			setOver(element?.closest<HTMLElement>('[data-drop-id]') ?? null);
		};

		const finish = (shouldDrop: boolean) => {
			window.removeEventListener('pointermove', handleMove);
			window.removeEventListener('pointerup', handleUp);
			window.removeEventListener('pointercancel', handleCancel);

			const target = overDrop;
			card.style.transform = '';
			card.style.zIndex = '';
			card.style.pointerEvents = '';
			handle.style.pointerEvents = '';
			setOver(null);

			if (shouldDrop && isDragging && target?.dataset.dropId) {
				onDrop(dragId, target.dataset.dropId, sourceId);
			}
		};

		const handleUp = () => finish(true);
		const handleCancel = () => finish(false);

		window.addEventListener('pointermove', handleMove);
		window.addEventListener('pointerup', handleUp);
		window.addEventListener('pointercancel', handleCancel);
	};

	return children({
		ref: setCardRef,
		onDragStart: handleDragStart,
		onPointerDown: handlePointerDown,
	});
};
