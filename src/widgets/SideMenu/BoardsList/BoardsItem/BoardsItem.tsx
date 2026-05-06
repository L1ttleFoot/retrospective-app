import {SpringValue} from '@react-spring/web';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {ClipboardCheck, Copy, X} from 'lucide-react';
import {useNavigate} from 'react-router-dom';

import {useCopy} from '@/hooks/useCopy';
import {Board, useBoards} from '@/store/useBoards';
import {IconButton} from '@/ui/IconButton';
import {Spacer} from '@/ui/Spacer';
import {formatDate} from '@/utils/dateUtils';

import {deleteBoard} from '../../api';
import * as Styled from './BoardsItem.styled';

type BoardItem = {item: Board; setCurrent: () => void; style: Record<string, SpringValue>};

export const BoardsItem = (props: BoardItem) => {
	const {item, setCurrent, style} = props;

	const queryClient = useQueryClient();

	const navigate = useNavigate();

	const {currentBoardId, setCurrentBoardId} = useBoards();

	const {copy, copied} = useCopy();

	const {mutate} = useMutation({
		mutationFn: deleteBoard,
		onMutate: async (variables) => {
			const id = variables;

			const previousData = queryClient.getQueryData(['boards']) as Board[];

			queryClient.setQueryData(['boards'], (old: Board[]) =>
				old.filter((board) => board.id !== id),
			);

			return {previousData, id};
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['boards']});
		},
	});

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();

		mutate(item.id);

		if (currentBoardId === item.id) {
			setCurrentBoardId(undefined);
			navigate({pathname: '/'});
		}
	};

	return (
		<Styled.BoardsItem style={style} onClick={setCurrent} $isCurrent={item.id === currentBoardId}>
			<Styled.Info>
				<Styled.Label>{item.title}</Styled.Label>
				<Styled.Date>{formatDate(item.createdAt)}</Styled.Date>
			</Styled.Info>
			<Spacer />
			<IconButton size="verySmall" onClick={() => copy(window.location.href)} withTheme={true}>
				{copied ? <ClipboardCheck /> : <Copy />}
			</IconButton>
			<IconButton size="small" onClick={(e) => handleDelete(e)} withTheme={true}>
				<X />
			</IconButton>
		</Styled.BoardsItem>
	);
};
