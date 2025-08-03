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
