import {Spacer} from '../../../../../../components/Spacer';
import {IDiscussion, useDiscussions} from '../../../../../../store/useDiscussions';
import {formatDate} from '../../../../../../utils/dateUtils';
import * as Styled from './DiscussionsItem.styled';
import {useNavigate} from 'react-router-dom';
import Close from '@assets/icons/close.svg?react';
import {IconButton} from '../../../../../../components/IconButton';
import {useMutation} from '@tanstack/react-query';
import {deleteDoc, doc} from 'firebase/firestore';
import {db} from '../../../../../../initFirebase';
import {SpringValue} from 'react-spring';

interface IBoardItem {
    item: IDiscussion;
    setCurrent: () => void;
    style: Record<string, SpringValue>;
}

export const DiscussionsItem = (props: IBoardItem) => {
    const navigate = useNavigate();

    const {currentDiscussionId, setCurrentDiscussionId} = useDiscussions();

    const {item, setCurrent, style} = props;

    const {mutate} = useMutation({
        mutationFn: async () => {
            await deleteDoc(doc(db, 'discussions', item.id));
            await deleteDoc(doc(db, 'discussionsEffects', item.id));
            await deleteDoc(doc(db, 'sections', item.id));
            await deleteDoc(doc(db, 'messages', item.id));
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
            <IconButton onClick={(e) => deleteDiscussion(e)} withTheme={true}>
                <Close />
            </IconButton>
        </Styled.DiscussionsItem>
    );
};
