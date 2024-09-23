import * as Styled from './Board.styled';
import {BoardSection} from './BoardSection';
import {useDiscussions} from '../../../../store/useDiscussions';
import {useSections} from '../../../../store/useSections';
import {useBoardData} from './useBoardData';
import {useMessages} from '../../../../store/useMessages';
import {CreateSections} from './CreateSections';
import {getCurrentUser} from '../../../../utils/getCurrentUser';

export const Board = () => {
    useBoardData();

    const currentUser = getCurrentUser();

    const {currentDiscussionId} = useDiscussions();
    const {sectionsData} = useSections();
    const {messagesData} = useMessages();

    if (!currentUser && !currentDiscussionId) {
        return <Styled.EmptyBoard>Для продолжения авторизуйтесь</Styled.EmptyBoard>;
    }

    if (currentUser && !currentDiscussionId) {
        return (
            <Styled.EmptyBoard>Выберите обсуждение из списка или создайте новое</Styled.EmptyBoard>
        );
    }

    if (!sectionsData.length) {
        return (
            <Styled.EmptyBoard>
                <CreateSections />
            </Styled.EmptyBoard>
        );
    }

    return (
        <Styled.Board>
            {sectionsData.map((section, index) => (
                <BoardSection key={section.id} index={index} messages={messagesData} {...section} />
            ))}
        </Styled.Board>
    );
};
