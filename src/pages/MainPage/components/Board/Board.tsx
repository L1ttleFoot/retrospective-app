import * as Styled from './Board.styled';
import {BoardSection} from './BoardSection';
import {useDiscussions} from '@store/useDiscussions';
import {useBoardData} from './useBoardData';
import {CreateSections} from './CreateSections';
import {getCurrentUser} from '@utils/getCurrentUser';

export const Board = () => {
    const {sectionsData} = useBoardData();

    const currentUser = getCurrentUser();

    const {currentDiscussionId} = useDiscussions();

    if (!currentUser && !currentDiscussionId) {
        return <Styled.EmptyBoard>Для продолжения авторизуйтесь</Styled.EmptyBoard>;
    }

    if (currentUser && !currentDiscussionId) {
        return (
            <Styled.EmptyBoard>Выберите обсуждение из списка или создайте новое</Styled.EmptyBoard>
        );
    }

    if (currentUser && !sectionsData.length) {
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
