import {Spacer} from '../../../../../../components/Spacer';
import {IDiscussion, useDiscussions} from '../../../../../../store/useDiscussions';
import {formatDate} from '../../../../../../utils/dateUtils';
import * as Styled from './DiscussionsItem.styled';
import {useNavigate} from 'react-router-dom';
import Close from '../../../../../../assets/close';
import {IconButton} from '../../../../../../components/IconButton';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteDoc, doc} from 'firebase/firestore';
import {db} from '../../../../../../initFirebase';

interface IWorkspaceItem {
    item: IDiscussion;
    setCurrent: () => void;
}

export const DiscussionsItem = (props: IWorkspaceItem) => {
    const client = useQueryClient();

    const navigate = useNavigate();

    const {currentDiscussionId, setCurrentDiscussionId} = useDiscussions();

    const {item, setCurrent} = props;

    const {mutate} = useMutation({
        mutationFn: async () => {
            await deleteDoc(doc(db, 'discussions', item.id));
            await deleteDoc(doc(db, 'areas', item.id));
            await deleteDoc(doc(db, 'messages', item.id));
        },
        onSuccess: () => {
            client.invalidateQueries({queryKey: ['discussions']});
        },
    });

    const deleteDiscussion = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

        mutate();

        if (currentDiscussionId === item.id) {
            setCurrentDiscussionId(undefined);
            navigate({pathname: '/'});
        }
    };

    return (
        <Styled.DiscussionsItem onClick={setCurrent} $isCurrent={item.id === currentDiscussionId}>
            <Styled.Info>
                <Styled.Label>{item.name}</Styled.Label>
                <Styled.Date>{formatDate(item.date)}</Styled.Date>
            </Styled.Info>
            <Spacer />
            <IconButton onClick={(e) => deleteDiscussion(e)}>
                <Close />
            </IconButton>
        </Styled.DiscussionsItem>
    );
};
