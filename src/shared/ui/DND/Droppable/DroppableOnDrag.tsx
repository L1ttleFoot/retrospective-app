import {DragEvent, ReactElement, useContext, useRef, useState} from 'react';

import {DropContext} from '../DropContext';

export type DroppableChildrenProps = {
	ref: (element: HTMLDivElement | null) => void;
	'data-drop-id': string;
	onDragOver: (event: DragEvent<HTMLDivElement>) => void;
	onDragEnter: (event: DragEvent<HTMLDivElement>) => void;
	onDragLeave: (event: DragEvent<HTMLDivElement>) => void;
	onDrop: (event: DragEvent<HTMLDivElement>) => void;
	isDraggingOver: boolean;
};

type DroppableProps = {children: (props: DroppableChildrenProps) => ReactElement; dropId: string};

export const DroppableOnDrag = ({children, dropId}: DroppableProps) => {
	const dropRef = useRef<HTMLDivElement | null>(null);
	const onDrop = useContext(DropContext);
	const [isDraggingOver, setIsDraggingOver] = useState(false);

	const setDropRef = (element: HTMLDivElement | null) => {
		dropRef.current = element;
	};

	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDraggingOver(true);
	};

	const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
		if (dropRef.current && !dropRef.current.contains(event.relatedTarget as Node)) {
			setIsDraggingOver(false);
		}
	};

	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDraggingOver(false);

		const draggableId = event.dataTransfer.getData('draggableItemId');
		const sourceDropId = event.dataTransfer.getData('sourceDropId');
		if (!draggableId || sourceDropId === dropId) return;

		onDrop(draggableId, dropId, sourceDropId);
	};

	return children({
		ref: setDropRef,
		'data-drop-id': dropId,
		onDragOver: handleDragOver,
		onDragEnter: handleDragEnter,
		onDragLeave: handleDragLeave,
		onDrop: handleDrop,
		isDraggingOver,
	});
};
