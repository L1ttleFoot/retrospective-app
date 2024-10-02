import {useQueryClient, useMutation} from '@tanstack/react-query';
import {deleteField, doc, updateDoc} from 'firebase/firestore';
import Close from '../../../../../../assets/close';
import {IconButton} from '../../../../../../components/IconButton';
import {db} from '../../../../../../initFirebase';
import {useDiscussions} from '../../../../../../store/useDiscussions';
import * as Styled from './DeleteMessage.styled';

export const DeleteMessage = ({id}: {id?: string}) => {
    const client = useQueryClient();
    const {currentDiscussionId} = useDiscussions();

    const {mutate} = useMutation({
        mutationFn: ({id}: {id: string}) =>
            updateDoc(doc(db, 'messages', currentDiscussionId!), {
                [`${id}`]: deleteField(),
            }),
        onSuccess: () => {
            client.invalidateQueries({queryKey: ['messages']});
        },
    });

    const handleClick = () => {
        if (!id) return;
        mutate({id});
    };

    return (
        <Styled.DeleteMessage>
            <IconButton onClick={handleClick} size="small">
                <Close />
            </IconButton>
        </Styled.DeleteMessage>
    );
};
