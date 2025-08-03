import {CSSProperties, ReactElement, useEffect, useRef, useState} from 'react';

export type DraggableChildrenProps = {
	'data-drag-id': string;
	ref?: React.RefObject<HTMLDivElement>;
	onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
	style?: CSSProperties;
};

type DraggableProps = {children: (props: DraggableChildrenProps) => ReactElement; dragId: string};

export const Draggable = ({children, dragId}: DraggableProps) => {
	const [isDragging, setIsDragging] = useState(false);
	const dragRef = useRef<HTMLDivElement>(null);
	const pointerRef = useRef<{top: number; left: number} | null>(null);

	const mouseDownHandler = (event: React.MouseEvent<HTMLDivElement>) => {
		if (!dragRef.current) return;

		const dragRect = dragRef.current.getBoundingClientRect();

		pointerRef.current = {top: dragRect.top - event.clientY, left: dragRect.left - event.clientX};

		setIsDragging(true);
	};

	useEffect(() => {
		const mouseMoveHandler = (event: MouseEvent) => {
			if (!dragRef.current || !pointerRef.current) return;

			const {top, left} = pointerRef.current;

			dragRef.current.style.left = `${event.clientX + top}px`;
			dragRef.current.style.top = `${event.clientY + left}px`;
		};

		const mouseUpHandler = (event: MouseEvent) => {
			if (!dragRef.current || !pointerRef.current) return;

			const {top, left} = pointerRef.current;

			const dragRect = dragRef.current.getBoundingClientRect();

			const deepestElement = document.elementFromPoint(
				event.clientX + left + dragRect.width / 2,
				event.clientY + top + dragRect.height / 2,
			);

			const closestElement = deepestElement?.closest('[data-drop-id]');

			setIsDragging(false);

			if (!closestElement) return;

			console.log(closestElement);
		};
		if (isDragging) {
			window.addEventListener('mousemove', mouseMoveHandler);
			window.addEventListener('mouseup', mouseUpHandler);
		}
		return () => {
			window.removeEventListener('mousemove', mouseMoveHandler);
			window.removeEventListener('mouseup', mouseUpHandler);
		};
	}, [isDragging]);

	return children({
		ref: dragRef,
		'data-drag-id': dragId,
		onMouseDown: mouseDownHandler,
		style: {
			position: isDragging ? 'fixed' : undefined,
			pointerEvents: isDragging ? 'none' : undefined,
			userSelect: isDragging ? 'none' : undefined,
			zIndex: isDragging ? 1 : undefined,
			cursor: isDragging ? 'grabbing' : 'grab',
		},
	});
};
