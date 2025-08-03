import {DraggableOnDrag} from '@/ui/DND/Draggable/DraggableOnDrag';

import {Message, Section} from '../BoardSection.types';
import {MessageItem} from './MessageItem';

interface MessageListProps {
	messagesData: Message[];
	color: Section['color'];
}

export const MessagesList = ({messagesData, color}: MessageListProps) => {
	return (
		<>
			{messagesData.map((item) => {
				return (
					<DraggableOnDrag dragId={item.id} key={item.id} sourceId={item.sectionId}>
						{(props) => <MessageItem {...item} {...props} color={color} />}
					</DraggableOnDrag>
				);
			})}
		</>
	);
};
