import {GripVertical} from 'lucide-react';
import {useState} from 'react';

import {useAuth} from '@/store/useAuth';
import {Board} from '@/store/useBoards';
import {DraggableChildrenProps} from '@/ui/DND/Draggable/DraggableOnDrag';
import {IconButton} from '@/ui/IconButton';
import {can} from '@/utils/can';

import {Message, Section} from '../../BoardSection.types';
import {CurrentReactions} from '../../Reactions/CurrentReactions';
import {ReactionsPicker} from '../../Reactions/ReactionsPicker';
import {reactionList} from '../../Reactions/ReactionsPicker/ReactionsPicker.consts';
import {DeleteMessage} from './../DeleteMessage';
import {EditMessage, EditMessageTextArea} from '../EditMessage';
import {PinMessage} from '../PinMessage';
import * as Styled from './MessageItem.styled';

export type BoardSection = {
	id: Message['id'];
	sectionId: Section['id'];
	text: Message['text'];
	color: Message['color'];
	pinnedAt: Message['pinnedAt'];
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
		pinnedAt,
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
			<Styled.MessageItem $color={color} $isPinned={false}>
				<EditMessageTextArea
					text={text}
					handleEditField={handleEditField}
					messageId={id}
					sectionId={sectionId}
				/>
			</Styled.MessageItem>
		);
	}

	const isPinned = Boolean(pinnedAt);

	const ctx = {userId: userData?.id, ownerId, authorId};
	const isRealMessage = id !== 'tempId';
	const canMove = isRealMessage && can('message.move', ctx);
	const canEdit = isRealMessage && can('message.edit', ctx);
	const canDelete = isRealMessage && can('message.delete', ctx);
	const canPin = isRealMessage && can('message.pin', ctx);
	const canReact = isRealMessage && can('message.react', ctx);
	const hasActions = canMove || canEdit || canDelete || canPin;

	return (
		<Styled.MessageWrapper {...other} draggable={canMove && isDraggable}>
			<Styled.MessageItem $color={color} $isBeingDragged={isBeingDragged} $isPinned={isPinned}>
				<Styled.MessageItemText>{text}</Styled.MessageItemText>
			</Styled.MessageItem>

			{hasActions && (
				<Styled.ActionsArea $color={color} aria-label="actions area">
					{canMove && (
						<IconButton
							size="medium"
							onMouseEnter={() => setIsDraggable(true)}
							onMouseLeave={() => setIsDraggable(false)}
							color="white"
						>
							<GripVertical />
						</IconButton>
					)}

					{canPin && <PinMessage pinnedAt={pinnedAt} messageId={id} sectionId={sectionId} />}
					{canEdit && <EditMessage handleClick={handleEditField} />}
					{canDelete && <DeleteMessage messageId={id} sectionId={sectionId} />}
				</Styled.ActionsArea>
			)}

			<Styled.ReactionsArea>
				{canReact && (
					<ReactionsPicker
						reactions={reactions}
						messageId={id}
						sectionId={sectionId}
						enabledReactions={reactionList}
					/>
				)}
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
