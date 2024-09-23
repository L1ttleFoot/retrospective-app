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
import {SpringValue} from 'react-spring';
import {useEffect} from 'react';

interface IBoardItem {
    item: IDiscussion;
    setCurrent: () => void;
    style: Record<string, SpringValue>;
}

export const DiscussionsItem = (props: IBoardItem) => {
    const client = useQueryClient();

    const navigate = useNavigate();

    const {currentDiscussionId, setCurrentDiscussionId, setIsDiscussionsLoading} = useDiscussions();

    const {item, setCurrent, style} = props;

    const {mutate, isPending} = useMutation({
        mutationFn: async () => {
            await deleteDoc(doc(db, 'discussions', item.id));
            await deleteDoc(doc(db, 'sections', item.id));
            await deleteDoc(doc(db, 'messages', item.id));
        },
        onSuccess: () => {
            client.invalidateQueries({queryKey: ['discussions']});
        },
    });

    useEffect(() => {
        setIsDiscussionsLoading(isPending);
    }, [isPending, setIsDiscussionsLoading]);

    const deleteDiscussion = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

        mutate();

        if (currentDiscussionId === item.id) {
            setCurrentDiscussionId(undefined);
            navigate({pathname: '/'});
        }
    };

    return (
        <Styled.DiscussionsItem
            style={style}
            onClick={setCurrent}
            $isCurrent={item.id === currentDiscussionId}
        >
            <Styled.Info>
                <Styled.Label>{item.name}</Styled.Label>
                <Styled.Date>{formatDate(item.createdAt)}</Styled.Date>
            </Styled.Info>
            <Spacer />
            <IconButton onClick={(e) => deleteDiscussion(e)}>
                <Close />
            </IconButton>
        </Styled.DiscussionsItem>
    );
};
