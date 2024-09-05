import {useState} from 'react';
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
                [`${id}.votes`]: votes,
            }),
        onSuccess: () => {
            client.invalidateQueries({queryKey: ['messages']});
        },
    });

    const handleClick = () => {
        if (!id) return;

        if (active) {
            setActive(false);
            mutate({id, votes: (votes ?? 0) - 1});
        } else {
            setActive(true);
            mutate({id, votes: (votes ?? 0) + 1});
        }
    };

    return (
        <Styled.VoteUp>
            <Styled.VoteUpButton onClick={handleClick}>
                <Thumb fill={active ? 'green' : undefined} />
            </Styled.VoteUpButton>
            {votes}
        </Styled.VoteUp>
    );
};
