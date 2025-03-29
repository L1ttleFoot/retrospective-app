import * as Styled from './BoardSection.styled';
import {Fragment, useState} from 'react';
import Add from '@assets/icons/add.svg?react';
import {IconButton} from '@ui/IconButton';
import {Section} from './BoardSection.types';
import {AddMessage} from './AddMessage';
import {useMessagesData} from './useMessagesData';
import {MessageItem} from './MessagesList/MessageItem';
import {Draggable, Droppable} from '@hello-pangea/dnd';
import {MessagesList} from './MessagesList';

export const BoardSection = (props: Section) => {
    const {title, color, id} = props;

    const [showInput, setShowInput] = useState(false);

    const handleShowInput = (value: boolean) => {
        setShowInput(value);
    };

    const {messagesData} = useMessagesData(id);

    return (
        <Styled.BoardSection>
            <Styled.BoardSectionHeader>
                {title}
                <IconButton onClick={() => setShowInput(true)} color={color}>
                    <Add />
                </IconButton>
            </Styled.BoardSectionHeader>

            <Droppable droppableId={id} direction="vertical">
                {(provided, snapshot) => (
                    <Styled.BoardSectionBody
                        ref={provided.innerRef}
                        $isDraggingOver={snapshot.isDraggingOver}
                    >
                        <MessagesList
                            messagesData={messagesData}
                            color={color}
                            snapshot={snapshot}
                        />

                        {provided.placeholder}
                        {showInput && (
                            <AddMessage
                                sectionId={id}
                                handleShowInput={handleShowInput}
                                color={color}
                            />
                        )}
                    </Styled.BoardSectionBody>
                )}
            </Droppable>
        </Styled.BoardSection>
    );
};
