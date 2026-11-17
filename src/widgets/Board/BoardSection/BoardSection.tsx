import {CirclePlus} from 'lucide-react';
import {useState} from 'react';

import {DroppableOnDrag} from '@/ui/DND/Droppable/DroppableOnDrag';
import {IconButton} from '@/ui/IconButton';

import {AddMessage} from './AddMessage';
import * as Styled from './BoardSection.styled';
import {Section} from './BoardSection.types';
import {MessagesList} from './MessagesList';
import {useMessagesData} from './useMessagesData';

export const BoardSection = ({title, color, id}: Section) => {
	const [showInput, setShowInput] = useState(false);

	const handleShowInput = (value: boolean) => {
		setShowInput(value);
	};

	const {messagesData} = useMessagesData(id);

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
			<DroppableOnDrag dropId={id}>
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
