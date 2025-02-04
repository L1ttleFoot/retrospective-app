import {ChangeEvent, useState} from 'react';
import {Message} from '../Message';
import * as Styled from './AddMessage.styled';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {IMessage} from '../BoardSection.types';
import {BASE_URL} from '@src/consts/api';

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

    const createMessage = async (text: IMessage['text']): Promise<IMessage> => {
        const response = await fetch(`${BASE_URL}/api/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({text, sectionId, votes: 0}),
        });

        return response.json();
    };

    const {mutate} = useMutation({
        mutationFn: createMessage,
        onSuccess: () => {
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

            mutate(text);
            handleShowInput(false);
        }
    };

    const handleBlur = () => {
        if (!text.trim()) {
            handleShowInput(false);
            return;
        }

        mutate(text);
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
