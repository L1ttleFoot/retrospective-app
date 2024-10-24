import {ChangeEvent, useState} from 'react';
import {Message} from '../Message';
import * as Styled from './AddItem.styled';
import {useMutation} from '@tanstack/react-query';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '../../../../../../initFirebase';
import {useDiscussions} from '@store/useDiscussions';
import {IMessages} from '../BoardSection.types';
import {v4} from 'uuid';

type AddItemType = {
    index: number;
    messages: IMessages;
    handleShowInput: (value: boolean) => void;
    color: string;
};

export const AddItem = ({index, messages, handleShowInput, color}: AddItemType) => {
    const {currentDiscussionId} = useDiscussions();

    const [text, setText] = useState('');

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const {mutate} = useMutation({
        mutationFn: (id: string) =>
            updateDoc(doc(db, 'messages', currentDiscussionId!), {
                [id]: {
                    id,
                    sectionId: `${currentDiscussionId}`,
                    sectionIndex: index,
                    text,
                    votes: 0,
                    timestamp: new Date().getTime(),
                },
            }),
        onSuccess: () => {
            setText('');
        },
    });

    const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            if (!text.trim()) {
                handleShowInput(false);
                return;
            }

            const id = v4();

            mutate(id);
            handleShowInput(false);
        }
    };

    const handleBlur = () => {
        if (!text.trim()) {
            handleShowInput(false);
            return;
        }

        const id = v4();

        mutate(id);
        handleShowInput(false);
    };

    return (
        <Message
            color={color}
            input={
                <Styled.Input
                    autoFocus
                    value={text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleEnter}
                />
            }
        />
    );
};
