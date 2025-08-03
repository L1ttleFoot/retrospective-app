import {CSSProperties, DragEvent, MutableRefObject, ReactElement, useRef, useState} from 'react';

export type DroppableChildrenProps = {
	ref: MutableRefObject<HTMLDivElement | null>;
	style: CSSProperties;
	onDragOver: (event: DragEvent<HTMLDivElement>) => void;
	onDragEnter: (event: DragEvent<HTMLDivElement>) => void;
	onDragLeave: (event: DragEvent<HTMLDivElement>) => void;
	onDragEnd: (event: DragEvent<HTMLDivElement>) => void;
	onDrop: (event: DragEvent<HTMLDivElement>) => void;
	isDraggingOver: boolean;
};

type DroppableProps = {
	children: (props: DroppableChildrenProps) => ReactElement;
	dropId: string;
	onDrop: (draggableId: string, dropId: string, sourceDropId: string) => void;
};

export const DroppableOnDrag = ({children, dropId, onDrop}: DroppableProps) => {
	const dropRef = useRef<HTMLDivElement | null>(null);

	const [draggingOverId, setDraggingOverId] = useState<string>();

	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const handleDragEnter = (event: DragEvent<HTMLDivElement>, id: string) => {
		event.preventDefault();

		setDraggingOverId(id);
	};

	const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();

		if (dropRef.current && !dropRef.current.contains(event.relatedTarget as Node)) {
			setDraggingOverId(undefined);
		}
	};

	const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDraggingOverId(undefined);
	};

	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		const draggableId = event.dataTransfer.getData('draggableItemId');
		const sourceDropId = event.dataTransfer.getData('sourceDropId');
		setDraggingOverId(undefined);
		if (sourceDropId === dropId) {
			return;
		}

		onDrop(draggableId, dropId, sourceDropId);
	};

	return children({
		ref: dropRef,
		onDragOver: handleDragOver,
		onDragEnter: (e) => handleDragEnter(e, dropId),
		onDragLeave: handleDragLeave,
		onDragEnd: handleDragEnd,
		onDrop: handleDrop,
		isDraggingOver: draggingOverId === dropId,
		style: {},
	});
};
