import * as Styled from './Board.styled';
import {BoardSection} from './BoardSection';
import {useDiscussions} from '../../../../store/useDiscussions';
import {useBoardData} from './useBoardData';
import {CreateSections} from './CreateSections';
import {getCurrentUser} from '../../../../utils/getCurrentUser';
import applause from '../../../../audio/applause.wav';
import {IconButton} from '../../../../components/IconButton';
import Clap from '../../../../assets/clapping';
import {useEffect} from 'react';

export const Board = () => {
    const {sectionsData, messagesData, soundEffect, mutateDiscussionsEffects} = useBoardData();

    const currentUser = getCurrentUser();

    const {currentDiscussionId} = useDiscussions();

    const onClick = () => {
        mutateDiscussionsEffects({id: currentDiscussionId ?? ''});
    };

    useEffect(() => {
        const clap = new Audio(applause);
        clap.play().catch((error) => {
            console.error('Ошибка воспроизведения:', error);
        });

        return;
    }, [soundEffect.sound]);

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
            <IconButton size="medium" onClick={onClick}>
                <Clap />
            </IconButton>
        </Styled.Board>
    );
};
