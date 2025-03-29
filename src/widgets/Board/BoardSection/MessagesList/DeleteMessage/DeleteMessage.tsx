import {useQueryClient, useMutation} from '@tanstack/react-query';
import Close from '@assets/icons/close.svg?react';
import {IconButton} from '@ui/IconButton';
import * as Styled from './DeleteMessage.styled';
import {deleteMessage} from '../../api';
import {Message, Section} from '../../BoardSection.types';
import {Discussion} from '@store/useDiscussions';
import {useAuth} from '@store/useAuth';

export const DeleteMessage = ({
    messageId,
    sectionId,
    authorId,
    ownerId,
}: {
    messageId: Message['id'];
    sectionId: Section['id'];
    authorId: Message['authorId'];
    ownerId: Discussion['ownerId'];
}) => {
    const client = useQueryClient();

    const {userData} = useAuth();

    const {mutate} = useMutation({
        mutationFn: () => deleteMessage(messageId),
        onSuccess: () => {
            client.invalidateQueries({queryKey: ['messages', sectionId]});
        },
    });

    const handleClick = () => {
        if (!messageId) return;
        mutate();
    };

    const isAuthor = authorId === localStorage.getItem('authorId');
    const isOwner = ownerId === userData?.id;

    if (!isAuthor && !isOwner) return null;

    return (
        <Styled.DeleteMessage>
            <IconButton onClick={handleClick} size="verySmall" withTheme={true}>
                <Close />
            </IconButton>
        </Styled.DeleteMessage>
    );
};
