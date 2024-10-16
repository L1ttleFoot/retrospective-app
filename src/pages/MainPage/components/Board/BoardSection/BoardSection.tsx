import * as Styled from './BoardSection.styled';
import {Message} from './Message';
import {useState} from 'react';
import Add from '../../../../../assets/add';
import {IconButton} from '../../../../../components/IconButton';
import {IMessages, ISection} from './BoardSection.types';
import {AddItem} from './AddItem';

export const BoardSection = (props: ISection & {index: number; messages: IMessages}) => {
    const {title, index, messages, color} = props;

    const [showInput, setShowInput] = useState(false);

    const handleShowInput = (value: boolean) => {
        setShowInput(value);
    };

    return (
        <Styled.BoardSection>
            <Styled.BoardSectionHeader>
                {title}
                <IconButton onClick={() => setShowInput(true)}>
                    <Add />
                </IconButton>
            </Styled.BoardSectionHeader>
            <Styled.BoardSectionBody>
                {messages[index]
                    ?.sort((a, b) => a.timestamp - b.timestamp)
                    .map((item) => <Message key={item.id} {...item} color={color} />)}
                {showInput && (
                    <AddItem
                        index={index}
                        messages={messages}
                        handleShowInput={handleShowInput}
                        color={color}
                    />
                )}
            </Styled.BoardSectionBody>
        </Styled.BoardSection>
    );
};
