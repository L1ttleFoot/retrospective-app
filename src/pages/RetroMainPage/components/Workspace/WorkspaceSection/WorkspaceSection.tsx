import * as Styled from './WorkspaceSection.styled';
import {Message} from './Message';
import {useState} from 'react';
import Add from '../../../../../assets/add';
import {IconButton} from '../../../../../components/IconButton';
import {Area} from '../../../../../store/useAreas';
import {Messages} from '../../../../../store/useMessages';
import {AddItem} from './AddItem';

export const WorkspaceArea = (props: Area & {index: number; messages: Messages}) => {
    const {title, index, messages, color} = props;

    const [showInput, setShowInput] = useState(false);

    const handleShowInput = (value: boolean) => {
        setShowInput(value);
    };

    return (
        <Styled.WorkspaceSection>
            <Styled.WorkspaceSectionHeader>
                {title}
                <IconButton onClick={() => setShowInput(true)}>
                    <Add />
                </IconButton>
            </Styled.WorkspaceSectionHeader>
            <Styled.WorkspaceSectionBody>
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
            </Styled.WorkspaceSectionBody>
        </Styled.WorkspaceSection>
    );
};
