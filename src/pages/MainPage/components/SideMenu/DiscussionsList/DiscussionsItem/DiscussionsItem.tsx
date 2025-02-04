import {Spacer} from '../../../../../../components/Spacer';
import {IDiscussion, useDiscussions} from '../../../../../../store/useDiscussions';
import {formatDate} from '../../../../../../utils/dateUtils';
import * as Styled from './DiscussionsItem.styled';
import {useNavigate} from 'react-router-dom';
import Close from '@assets/icons/close.svg?react';
import {IconButton} from '../../../../../../components/IconButton';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {SpringValue} from 'react-spring';
import {BASE_URL} from '@src/consts/api';

interface IBoardItem {
    item: IDiscussion;
    setCurrent: () => void;
    style: Record<string, SpringValue>;
}

export const DiscussionsItem = (props: IBoardItem) => {
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const {currentDiscussionId, setCurrentDiscussionId} = useDiscussions();

    const {item, setCurrent, style} = props;

    const deleteDiscussion = async (id: IDiscussion['id']) => {
        const response = await fetch(`${BASE_URL}/api/discussions/${id}`, {method: 'DELETE'});
        const discussion = await response.json();

        return discussion;
    };

    const {mutate} = useMutation({
        mutationFn: () => deleteDiscussion(item.id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['discussions']});
        },
    });

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
            <IconButton onClick={(e) => handleDelete(e)} withTheme={true}>
                <Close />
            </IconButton>
        </Styled.DiscussionsItem>
    );
};
