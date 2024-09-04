import {useState} from 'react';
import {IconButton} from '../../../../../../components/IconButton';
import * as Styled from './VoteUp.styled';
import Thumb from '../../../../../../assets/thumb';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '../../../../../../initFirebase';
import {useDiscussions} from '../../../../../../store/useDiscussions';

export const VoteUp = ({votes, id}: {id?: string; votes?: number}) => {
    const client = useQueryClient();
    const {currentDiscussionId} = useDiscussions();

    const [active, setActive] = useState(false);

    const {mutate} = useMutation({
        mutationFn: ({id, votes}: {id: string; votes?: number}) =>
            updateDoc(doc(db, 'messages', currentDiscussionId!), {
                [`${id}.votes`]: (votes ?? 0) + 1,
            }),
        onSuccess: () => {
            client.invalidateQueries({queryKey: ['messages']});
        },
    });

    const handleClick = () => {
        if (active || !id) return;
        setActive(true);
        mutate({id, votes});
    };

    return (
        <Styled.VoteUp>
            <IconButton onClick={handleClick}>
                <Thumb fill={active ? 'green' : undefined} />
            </IconButton>
            {votes}
        </Styled.VoteUp>
    );
};
