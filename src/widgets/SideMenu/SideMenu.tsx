import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {useAuth} from '@/store/useAuth';
import {useBoards} from '@/store/useBoards';

import {BoardsList} from './BoardsList';
import {CreateBoard} from './CreateBoard';
import * as Styled from './SideMenu.styled';

export const SideMenu = ({open}: {open: boolean}) => {
	const {isAuth} = useAuth();

	const {search} = useLocation();
	const {setCurrentBoardId} = useBoards();

	const params = Object.fromEntries(new URLSearchParams(search));

	useEffect(() => {
		setCurrentBoardId(params.id);
	}, [params.id, setCurrentBoardId]);

	return (
		<Styled.Selector $open={open}>
			{isAuth && (
				<>
					<CreateBoard />
					<BoardsList />
				</>
			)}
		</Styled.Selector>
	);
};
