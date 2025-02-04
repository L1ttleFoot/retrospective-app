import {useQueryClient, useMutation} from '@tanstack/react-query';
import Close from '@assets/icons/close.svg?react';
import {IconButton} from '@components/IconButton';
import * as Styled from './DeleteMessage.styled';
import {BASE_URL} from '@src/consts/api';

export const DeleteMessage = ({id}: {id?: string}) => {
    const client = useQueryClient();

    const deleteMessage = async () => {
        const response = await fetch(`${BASE_URL}/api/messages/${id}`, {method: 'DELETE'});

        const message = await response.json();

        return message;
    };

    const {mutate} = useMutation({
        mutationFn: deleteMessage,
        onSuccess: () => {
            client.invalidateQueries({queryKey: ['messages']});
        },
    });

    const handleClick = () => {
        if (!id) return;
        mutate();
    };

    return (
        <Styled.DeleteMessage>
            <IconButton onClick={handleClick} size="verySmall" withTheme={true}>
                <Close />
            </IconButton>
        </Styled.DeleteMessage>
    );
};
