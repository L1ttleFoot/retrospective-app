import * as Styled from './Board.styled';
import {BoardSection} from './BoardSection';
import {useDiscussions} from '../../../../store/useDiscussions';
import {useBoardData} from './useBoardData';
import {CreateSections} from './CreateSections';
import {getCurrentUser} from '../../../../utils/getCurrentUser';

import {ClapButton} from './ClapButton';

export const Board = () => {
    const {sectionsData, messagesData, soundEffect, mutateDiscussionsEffects} = useBoardData();

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
            {sectionsData.map((section, index) => (
                <BoardSection key={section.id} index={index} messages={messagesData} {...section} />
            ))}
            <ClapButton soundEffect={soundEffect} mutateFn={mutateDiscussionsEffects} />
        </Styled.Board>
    );
};
