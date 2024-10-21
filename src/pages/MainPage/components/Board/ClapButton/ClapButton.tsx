import {useEffect} from 'react';
import * as Styled from './ClapButton.styled';
import {IconButton} from '@components/IconButton';
import Clap from '@assets/icons/clapping.svg?react';
import {useDiscussions} from '@store/useDiscussions';
import applause from '../../../../../audio/applause.wav';

type ClapButtonProps = {
    soundEffect: {sound?: boolean};
    mutateFn: ({id, sound}: {id: string; sound?: boolean | null}) => void;
};

export const ClapButton = ({mutateFn, soundEffect}: ClapButtonProps) => {
    const {currentDiscussionId} = useDiscussions();

    const onClick = () => {
        mutateFn({id: currentDiscussionId ?? ''});
    };

    useEffect(() => {
        if (soundEffect.sound === null) return;

        const clap = new Audio(applause);
        clap.play().catch((error) => {
            console.error('Ошибка воспроизведения:', error);
        });

        return mutateFn({id: currentDiscussionId ?? '', sound: null});
    }, [soundEffect.sound]);

    return (
        <Styled.ClapButton>
            <IconButton size="medium" onClick={onClick}>
                <Clap />
            </IconButton>
        </Styled.ClapButton>
    );
};
