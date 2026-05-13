import {useMutation, useQueryClient} from '@tanstack/react-query';
import {CirclePlus} from 'lucide-react';
import {useState} from 'react';

import {updateMessage} from '@/src/widgets/Board/BoardSection/api';
import {DroppableOnDrag} from '@/ui/DND/Droppable/DroppableOnDrag';
import {IconButton} from '@/ui/IconButton';

import {AddMessage} from './AddMessage';
import * as Styled from './BoardSection.styled';
import {Message, Section} from './BoardSection.types';
import {MessagesList} from './MessagesList';
import {useMessagesData} from './useMessagesData';

export const BoardSection = ({title, color, id}: Section) => {
	const queryClient = useQueryClient();

	const [showInput, setShowInput] = useState(false);

	const handleShowInput = (value: boolean) => {
		setShowInput(value);
	};

	const {messagesData} = useMessagesData(id);

	const {mutate} = useMutation({
		mutationKey: ['messages'],
		mutationFn: updateMessage,
		onMutate: async (variables) => {
			const {messageId, dto, sourceSectionId} = variables;

			const previousTargetData = queryClient.getQueryData(['messages', dto.sectionId]) as {
				messages: Message[];
			};

			const previousSourceData = queryClient.getQueryData(['messages', sourceSectionId]) as {
				messages: Message[];
			};

			queryClient.setQueryData(['messages', sourceSectionId], (old: {messages: Message[]}) => ({
				messages: old.messages.filter((message) => message.id !== messageId),
			}));

			queryClient.setQueryData(['messages', dto.sectionId], (old: {messages: Message[]}) => {
				const message = {
					...previousSourceData.messages.find((message) => message.id === messageId),
					waiting: true,
				};
				if (!old) return [message];
				return {messages: [...old.messages, message]};
			});

			return {previousSourceData, previousTargetData, sourceSectionId, sectionId: dto.sectionId};
		},
		onSuccess: (_, varibles) => {
			queryClient.invalidateQueries({queryKey: ['messages', varibles.sourceSectionId]});
			queryClient.invalidateQueries({queryKey: ['messages', varibles.dto.sectionId]});
		},
	});

	return (
		<Styled.BoardSection>
			<Styled.BoardSectionHeader>
				{title}
				<IconButton
					onClick={() => setShowInput(true)}
					size={'small'}
					color={color}
					aria-label="add-message"
				>
					<CirclePlus />
				</IconButton>
			</Styled.BoardSectionHeader>
			<DroppableOnDrag
				dropId={id}
				onDrop={(draggableId, dropId, sourceDropId) =>
					mutate({messageId: draggableId, dto: {sectionId: dropId}, sourceSectionId: sourceDropId})
				}
			>
				{({isDraggingOver, ...props}) => (
					<Styled.BoardSectionBody {...props} $isDraggingOver={isDraggingOver}>
						<MessagesList messages={messagesData.messages} color={color} />

						{showInput && (
							<AddMessage sectionId={id} handleShowInput={handleShowInput} color={color} />
						)}
					</Styled.BoardSectionBody>
				)}
			</DroppableOnDrag>
		</Styled.BoardSection>
	);
};
