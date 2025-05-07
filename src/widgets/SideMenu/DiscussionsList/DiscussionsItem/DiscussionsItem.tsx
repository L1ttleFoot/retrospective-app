import {Spacer} from '@ui/Spacer';
import {formatDate} from '@utils/dateUtils';
import * as Styled from './DiscussionsItem.styled';
import {useNavigate} from 'react-router-dom';
import {IconButton} from '@ui/IconButton';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {SpringValue} from 'react-spring';
import {Discussion, useDiscussions} from '@store/useDiscussions';
import {deleteDiscussion} from '../../api';
import {X} from 'lucide-react';

interface BoardItem {
    item: Discussion;
    setCurrent: () => void;
    style: Record<string, SpringValue>;
}

export const DiscussionsItem = (props: BoardItem) => {
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const {currentDiscussionId, setCurrentDiscussionId} = useDiscussions();

    const {item, setCurrent, style} = props;

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
            <IconButton size="small" onClick={(e) => handleDelete(e)} withTheme={true}>
                <X />
            </IconButton>
        </Styled.DiscussionsItem>
    );
};
