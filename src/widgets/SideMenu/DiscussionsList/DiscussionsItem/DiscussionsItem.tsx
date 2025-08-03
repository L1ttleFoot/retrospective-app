import {useMutation, useQueryClient} from '@tanstack/react-query';
import {X} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {SpringValue} from 'react-spring';

import {Discussion, useDiscussions} from '@/store/useDiscussions';
import {IconButton} from '@/ui/IconButton';
import {Spacer} from '@/ui/Spacer';
import {formatDate} from '@/utils/dateUtils';

import {deleteDiscussion} from '../../api';
import * as Styled from './DiscussionsItem.styled';

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
		mutationFn: deleteDiscussion,
		onMutate: async (variables) => {
			const id = variables;

			const previousData = queryClient.getQueryData(['discussions']) as Discussion[];

			queryClient.setQueryData(['discussions'], (old: Discussion[]) =>
				old.filter((discussion) => discussion.id !== id),
			);

			return {previousData, id};
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['discussions']});
		},
	});

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();

		mutate(item.id);

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
