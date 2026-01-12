import {Discussion} from '@/store/useDiscussions';
import {DraggableChildrenProps} from '@/ui/DND/Draggable/DraggableOnDrag';

import {Message, Section} from '../../BoardSection.types';
import {DeleteMessage} from './../DeleteMessage';
import * as Styled from './MessageItem.styled';

export type BoardSection = {
	id: Message['id'];
	sectionId: Section['id'];
	text: Message['text'];
	color: Message['color'];
	isBeingDragged?: boolean;
	emojies: Message['emojies'];
	authorId: Message['authorId'];
	ownerId: Discussion['ownerId'];
} & DraggableChildrenProps;

export const MessageItem = (props: BoardSection) => {
	const {
		id,
		text,
		color,
		sectionId,
		authorId,
		ownerId,
		isBeingDragged,
		ref,
		onDragOver,
		waiting,
		...other
	} = props;

	//console.log(props);

	return (
		<Styled.MessageItem
			{...other}
			draggable={!waiting}
			$color={color}
			$isBeingDragged={isBeingDragged}
			ref={ref}
			onDragOver={(e) => onDragOver(e, id)}
			style={waiting ? {opacity: 0.2} : undefined}
		>
			<Styled.MessageItemText>{text}</Styled.MessageItemText>
			<DeleteMessage messageId={id} sectionId={sectionId} authorId={authorId} ownerId={ownerId} />
		</Styled.MessageItem>
	);
};
