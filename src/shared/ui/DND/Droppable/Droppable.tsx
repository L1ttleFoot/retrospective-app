import {CSSProperties, MutableRefObject, ReactElement, useRef} from 'react';

type DroppableProps = {
	children: (props: {
		'data-drop-id': string;
		ref: MutableRefObject<HTMLDivElement | null>;
		style: CSSProperties;
	}) => ReactElement;
	dropId: string;
};

export const Droppable = ({children, dropId}: DroppableProps) => {
	const dropRef = useRef<HTMLDivElement | null>(null);

	return children({ref: dropRef, 'data-drop-id': dropId, style: {}});
};
