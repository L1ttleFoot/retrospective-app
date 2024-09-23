import {ChangeEvent, useState} from 'react';
import {Message} from '../Message';
import * as Styled from './AddItem.styled';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '../../../../../../initFirebase';
import {useDiscussions} from '../../../../../../store/useDiscussions';
import {Messages} from '../../../../../../store/useMessages';
import {v4} from 'uuid';

type AddItemType = {
    index: number;
    messages: Messages;
    handleShowInput: (value: boolean) => void;
    color: string;
};

export const AddItem = ({index, messages, handleShowInput, color}: AddItemType) => {
    const client = useQueryClient();

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
            client.invalidateQueries({queryKey: ['messages', currentDiscussionId]});
        },
    });

    const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!text.trim()) return;

        if (e.key === 'Enter') {
            const id = v4();

            mutate(id);
            handleShowInput(false);
        }
    };

    const handleBlur = () => {
        if (!text.trim()) return;

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
