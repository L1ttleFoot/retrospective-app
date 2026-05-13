import {DraggableOnDrag} from '@/ui/DND/Draggable/DraggableOnDrag';

import {Message, Section} from '../BoardSection.types';
import {MessageItem} from './MessageItem';

type MessageListProps = {messages: Message[]; color: Section['color']};

export const MessagesList = ({messages, color}: MessageListProps) => {
	return (
		<>
			{messages.map((item) => {
				return (
					<DraggableOnDrag dragId={item.id} key={item.id} sourceId={item.sectionId}>
						{(props) => <MessageItem {...item} {...props} color={color} />}
					</DraggableOnDrag>
				);
			})}
		</>
	);
};
