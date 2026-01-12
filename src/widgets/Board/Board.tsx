import {useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';

import {BASE_URL} from '@/consts/api';
import {useAuth} from '@/store/useAuth';
import {useDiscussions} from '@/store/useDiscussions';

import * as Styled from './Board.styled';
import {BoardSection} from './BoardSection';
import {CreateSections} from './CreateSections';
import {useBoardData} from './useBoardData';

export const Board = () => {
	const {sectionsData, isFetching} = useBoardData();

	const {isAuth} = useAuth();

	const {currentDiscussionId} = useDiscussions();

	const queryClient = useQueryClient();

	useEffect(() => {
		const eventSource = new EventSource(`${BASE_URL}/api/event`);

		eventSource.onmessage = (event) => {
			console.log(event.type, event.data);

			const payload = JSON.parse(event.data);

			queryClient.invalidateQueries({queryKey: Object.values(payload)});
		};

		return () => eventSource.close();
	}, []);

	if (!isAuth && !currentDiscussionId) {
		return <Styled.EmptyBoard>Для продолжения авторизуйтесь</Styled.EmptyBoard>;
	}

	if (isAuth && !currentDiscussionId) {
		return <Styled.EmptyBoard>Выберите обсуждение из списка или создайте новое</Styled.EmptyBoard>;
	}

	if (isAuth && !sectionsData.length && !isFetching) {
		return (
			<Styled.EmptyBoard>
				<CreateSections />
			</Styled.EmptyBoard>
		);
	}

	return (
		<Styled.Board>
			{sectionsData.map((section) => (
				<BoardSection key={section.id} {...section} />
			))}
		</Styled.Board>
	);
};
