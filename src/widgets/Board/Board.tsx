import {useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';

import {BASE_URL} from '@/consts/api';
import {useAuth} from '@/store/useAuth';
import {useBoards} from '@/store/useBoards';

import {AddSectionsModal} from '../AddSections';
import * as Styled from './Board.styled';
import {BoardSection} from './BoardSection';
import {useBoardData} from './useBoardData';

export const Board = () => {
	const {sectionsData, isFetching} = useBoardData();

	const {isAuth} = useAuth();

	const {currentBoardId} = useBoards();

	const queryClient = useQueryClient();

	useEffect(() => {
		const eventSource = new EventSource(`${BASE_URL}/api/event/`);

		eventSource.onmessage = (event) => {
			console.log(event.type, event.data);

			const payload = JSON.parse(event.data);

			queryClient.invalidateQueries({queryKey: Object.values(payload)});
		};

		return () => eventSource.close();
	}, [queryClient]);

	if (!isAuth && !currentBoardId) {
		return <Styled.EmptyBoard>Для продолжения авторизуйтесь</Styled.EmptyBoard>;
	}

	if (isAuth && !currentBoardId) {
		return <Styled.EmptyBoard>Выберите обсуждение из списка или создайте новое</Styled.EmptyBoard>;
	}

	if (isAuth && !sectionsData.sections.length && !isFetching) {
		return (
			<Styled.EmptyBoard>
				<AddSectionsModal />
			</Styled.EmptyBoard>
		);
	}

	return (
		<Styled.Board>
			{sectionsData.sections.map((section) => (
				<BoardSection key={section.id} {...section} />
			))}
		</Styled.Board>
	);
};
