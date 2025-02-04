import * as Styled from './BoardSection.styled';
import {useState} from 'react';
import Add from '@assets/icons/add.svg?react';
import {IconButton} from '@components/IconButton';
import {ISection} from './BoardSection.types';
import {AddMessage} from './AddMessage';
import {useMessagesData} from './useMessagesData';
import {Message} from './Message';

export const BoardSection = (props: ISection) => {
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
            <Styled.BoardSectionBody>
                {messagesData.map((item) => (
                    <Message key={item.id} {...item} color={color} />
                ))}
                {showInput && (
                    <AddMessage sectionId={id} handleShowInput={handleShowInput} color={color} />
                )}
            </Styled.BoardSectionBody>
        </Styled.BoardSection>
    );
};
