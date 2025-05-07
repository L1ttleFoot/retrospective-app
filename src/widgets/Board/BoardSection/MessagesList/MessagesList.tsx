import {Draggable, DroppableStateSnapshot} from '@hello-pangea/dnd';
import {Fragment} from 'react/jsx-runtime';
import {Message, Section} from '../BoardSection.types';
import {MessageItem} from './MessageItem';

interface MessageListProps {
    messagesData: Message[];
    color: Section['color'];
    snapshot: DroppableStateSnapshot;
}

export const MessagesList = ({messagesData, color, snapshot}: MessageListProps) => {
    return (
        <>
            {messagesData.map((item, index) => {
                const isBeingDragged = item.id === snapshot.draggingFromThisWith;
                return (
                    <Fragment key={item.id}>
                        <Draggable draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                        ...provided.draggableProps.style,
                                        //width: 'calc(33% - 10px)',
                                        width: 'clamp(200px,30%, 300px)',
                                        transform: snapshot.isDragging
                                            ? provided.draggableProps.style?.transform
                                            : 'translate(0, 0)',
                                    }}
                                >
                                    <MessageItem {...item} color={color} />
                                </div>
                            )}
                        </Draggable>
                        {isBeingDragged && (
                            <MessageItem {...item} color={color} isBeingDragged={isBeingDragged} />
                        )}
                    </Fragment>
                );
            })}
        </>
    );
};
