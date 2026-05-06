import {GripVertical} from 'lucide-react';
import {useState} from 'react';

import {useAuth} from '@/store/useAuth';
import {Board} from '@/store/useBoards';
import {DraggableChildrenProps} from '@/ui/DND/Draggable/DraggableOnDrag';
import {IconButton} from '@/ui/IconButton';

import {Message, Section} from '../../BoardSection.types';
import {CurrentReactions} from '../../Reactions/CurrentReactions';
import {ReactionsPicker} from '../../Reactions/ReactionsPicker';
import {reactionList} from '../../Reactions/ReactionsPicker/ReactionsPicker.consts';
import {DeleteMessage} from './../DeleteMessage';
import {EditMessage, EditMessageTextArea} from '../EditMessage';
import * as Styled from './MessageItem.styled';

export type BoardSection = {
	id: Message['id'];
	sectionId: Section['id'];
	text: Message['text'];
	color: Message['color'];
	isBeingDragged?: boolean;
	reactions: Message['reactions'];
	authorId: Message['authorId'];
	ownerId: Board['ownerId'];
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
		reactions,
		...other
	} = props;

	const {userData} = useAuth();

	const [isEdit, setIsEdit] = useState(false);

	const handleEditField = (value: boolean) => {
		setIsEdit(value);
	};
	const [isDraggable, setIsDraggable] = useState(false);

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
		<Styled.MessageWrapper {...other} draggable={allowedActions && isDraggable}>
			<Styled.MessageItem $color={color} $isBeingDragged={isBeingDragged}>
				<Styled.MessageItemText>{text}</Styled.MessageItemText>
			</Styled.MessageItem>

			{allowedActions && (
				<Styled.ActionsArea $color={color} aria-label="actions area">
					<IconButton
						size="medium"
						onMouseEnter={() => setIsDraggable(true)}
						onMouseLeave={() => setIsDraggable(false)}
						color="white"
					>
						<GripVertical />
					</IconButton>
					<EditMessage handleClick={handleEditField} />
					<DeleteMessage messageId={id} sectionId={sectionId} />
				</Styled.ActionsArea>
			)}

			<Styled.ReactionsArea>
				<ReactionsPicker
					reactions={reactions}
					messageId={id}
					sectionId={sectionId}
					enabledReactions={reactionList}
				/>
				<CurrentReactions
					reactions={reactions}
					color={color}
					messageId={id}
					sectionId={sectionId}
				/>
			</Styled.ReactionsArea>
		</Styled.MessageWrapper>
	);
};
