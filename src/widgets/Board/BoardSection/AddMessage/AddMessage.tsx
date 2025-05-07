import {ChangeEvent, useState} from 'react';
import * as Styled from './AddMessage.styled';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createMessage} from '../api';

type AddItemType = {
    sectionId: string;
    handleShowInput: (value: boolean) => void;
    color: string;
};

export const AddMessage = ({sectionId, handleShowInput, color}: AddItemType) => {
    const queryClient = useQueryClient();

    const [text, setText] = useState('');

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const {mutate} = useMutation({
        mutationFn: createMessage,
        onSuccess: (data) => {
            localStorage.setItem('authorId', data.authorId);
            setText('');
            queryClient.invalidateQueries({queryKey: ['messages', sectionId]});
        },
    });

    const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            if (!text.trim()) {
                handleShowInput(false);
                return;
            }
            const authorId = localStorage.getItem('authorId');
            mutate({text, sectionId, authorId});
            handleShowInput(false);
        }
    };

    const handleBlur = () => {
        if (!text.trim()) {
            handleShowInput(false);
            return;
        }

        mutate({text, sectionId});
        handleShowInput(false);
    };

    return (
        <Styled.Wrapper $color={color}>
            <Styled.Input
                autoFocus
                value={text}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleEnter}
            />
        </Styled.Wrapper>
    );
};
