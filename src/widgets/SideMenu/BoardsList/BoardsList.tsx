import {useTransition} from '@react-spring/web';
import {createSearchParams, useNavigate} from 'react-router-dom';

import {Board, useBoards} from '@/store/useBoards';

import {BoardsItem} from './BoardsItem';
import * as Styled from './BoardsList.styled';
import {useBoardData} from './useBoardsData';

export const BoardsList = () => {
	const {boardsData} = useBoardData();

	const navigate = useNavigate();

	const {currentBoardId, setCurrentBoardId} = useBoards();

	const setCurrent = (id: string) => {
		if (currentBoardId === id) return;

		setCurrentBoardId(id.toString());

		navigate({pathname: '/', search: createSearchParams({id: id ?? ''}).toString()});
	};

	const transitions = useTransition(boardsData ?? [], {
		key: (item: Board) => item.id,
		from: {x: '-20rem', opacity: 0},
		enter: {x: '0rem', opacity: 1},
		leave: {x: '-20rem', opacity: 0},
		config: {duration: 300},
	});

	return (
		<Styled.BoardsList>
			{transitions((style, item) => (
				<BoardsItem
					key={item.id}
					setCurrent={() => setCurrent(item.id)}
					style={style}
					item={item}
				/>
			))}
		</Styled.BoardsList>
	);
};
