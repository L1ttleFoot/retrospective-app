import {useState} from 'react';
import {Emoji} from '@ui/Emoji';
import {useModal} from '@src/shared/hooks/useModal';
import {usePopper} from 'react-popper';
import * as Styled from './EmojiPicker.styled';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createPortal} from 'react-dom';
import {Backdrop} from '@ui/Backdrop';
import {addEmoji} from '../../api';
import {TEmoji} from './EmojiPicker.types';

type EmojiPickerProps = {
    messageId?: string;
    enabledEmoji: TEmoji[];
    handleActive: (value: string) => void;
};

export const EmojiPicker = ({messageId, enabledEmoji, handleActive}: EmojiPickerProps) => {
    const client = useQueryClient();

    const {open, toggleOpen, handleClose} = useModal();

    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);

    const {styles, attributes} = usePopper(referenceElement, popperElement, {
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 10],
                },
            },
        ],
        strategy: 'fixed',
    });

    const {mutate} = useMutation({
        mutationKey: ['emoji', messageId],
        mutationFn: async (emoji: TEmoji) => {
            await addEmoji(messageId!, emoji);
            return emoji;
        },
        onSuccess: (value) => {
            client.invalidateQueries({queryKey: ['messages']});
            handleActive(value.id);
        },
    });

    const handleSelectEmoji = (emoji: TEmoji) => {
        mutate(emoji);
        handleClose();
    };

    const modalRoot = document.getElementById('modal-root');

    return (
        <>
            <Styled.OpenSelector
                onClick={toggleOpen}
                ref={setReferenceElement as React.LegacyRef<HTMLDivElement>}
            >
                +
            </Styled.OpenSelector>
            {open &&
                modalRoot &&
                createPortal(
                    <Backdrop onClose={handleClose} isTransparent>
                        <Styled.Emojis
                            ref={setPopperElement as React.LegacyRef<HTMLDivElement>}
                            style={styles.popper}
                            {...attributes.popper}
                        >
                            {enabledEmoji.map((emoji: TEmoji) => (
                                <Emoji
                                    key={emoji.id}
                                    emoji={emoji.character}
                                    onClick={() => handleSelectEmoji(emoji)}
                                />
                            ))}
                        </Styled.Emojis>
                    </Backdrop>,
                    modalRoot,
                )}
        </>
    );
};
