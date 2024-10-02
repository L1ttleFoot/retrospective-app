import {useState} from 'react';
import {Emoji} from '../../../../../../components/Emoji';
import {useModal} from '../../../../../../hooks/useModal';
import {usePopper} from 'react-popper';
import * as Styled from './EmojiPicker.styled';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '../../../../../../initFirebase';
import {useDiscussions} from '../../../../../../store/useDiscussions';
import {createPortal} from 'react-dom';
import {Backdrop} from '../../../../../../components/Backdrop';

type EmojiPickerProps = {
    id?: string;
    enabledEmoji: string[];
    handleActive: (value: string) => void;
};

export const EmojiPicker = ({id, enabledEmoji, handleActive}: EmojiPickerProps) => {
    const client = useQueryClient();
    const {currentDiscussionId} = useDiscussions();

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
        mutationKey: ['emoji', id, currentDiscussionId],
        mutationFn: async (emoji: string) => {
            await updateDoc(doc(db, 'messages', currentDiscussionId!), {
                [`${id}.emoji.${emoji}`]: 1,
            });

            return emoji;
        },
        onSuccess: (data) => {
            handleActive(data);
            client.invalidateQueries({queryKey: ['messages']});
        },
    });

    const handleSelectEmoji = (emoji: string) => {
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
                            {enabledEmoji.map((emoji: string) => (
                                <Emoji
                                    key={emoji}
                                    emoji={emoji}
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
