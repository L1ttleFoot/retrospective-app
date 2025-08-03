import {CSSProperties, DragEvent, ReactElement, useRef} from 'react';

export type DraggableChildrenProps = {
	ref?: React.RefObject<HTMLDivElement>;
	onDragStart: (event: DragEvent<HTMLDivElement>) => void;
	onDragOver: (event: DragEvent<HTMLDivElement>, id: string) => void;
	draggable: boolean;
	style?: CSSProperties;
};

type DraggableProps = {
	children: (props: DraggableChildrenProps) => ReactElement;
	dragId: string;
	sourceId: string;
};

export const DraggableOnDrag = ({children, dragId, sourceId}: DraggableProps) => {
	const dragRef = useRef<HTMLDivElement>(null);

	const handleDragStart = (e: DragEvent<HTMLDivElement>, id: string) => {
		e.dataTransfer.setData('draggableItemId', id);
		e.dataTransfer.setData('sourceDropId', sourceId);
	};

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	return children({
		ref: dragRef,
		onDragStart: (e) => handleDragStart(e, dragId),
		onDragOver: handleDragOver,
		draggable: true,
		style: {},
	});
};
