import {useState} from 'react';

import {useAuth} from '@/store/useAuth';
import {Discussion} from '@/store/useDiscussions';
import {DraggableChildrenProps} from '@/ui/DND/Draggable/DraggableOnDrag';

import {Message, Section} from '../../BoardSection.types';
import {DeleteMessage} from './../DeleteMessage';
import {EditMessage, EditMessageTextArea} from '../EditMessage';
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
	const {id, text, color, sectionId, authorId, ownerId, isBeingDragged, ref, onDragOver, ...other} =
		props;

	const {userData} = useAuth();

	const [isEdit, setIsEdit] = useState(false);

	const handleEditField = (value: boolean) => {
		setIsEdit(value);
	};

	if (isEdit) {
		return (
			<Styled.MessageItem $color={color}>
				<EditMessageTextArea
					text={text}
					handleEditField={handleEditField}
					messageId={id}
					sectionId={sectionId}
				/>
			</Styled.MessageItem>
		);
	}

	const isAuthor = authorId === localStorage.getItem('authorId');
	const isOwner = ownerId === userData?.id;

	const allowedActions = (isAuthor || isOwner) && id !== 'tempId';

	return (
		<Styled.MessageItem
			{...other}
			draggable={allowedActions}
			$color={color}
			$isBeingDragged={isBeingDragged}
			ref={ref}
			onDragOver={(e) => onDragOver(e, id)}
			style={id === 'tempId' ? {opacity: 0.2} : undefined}
			aria-label="message-item"
		>
			<Styled.MessageItemText>{text}</Styled.MessageItemText>
			{allowedActions && (
				<Styled.ActionsArea $color={color} aria-label="actions area">
					<EditMessage handleClick={handleEditField} />
					<DeleteMessage messageId={id} sectionId={sectionId} />
				</Styled.ActionsArea>
			)}
		</Styled.MessageItem>
	);
};
