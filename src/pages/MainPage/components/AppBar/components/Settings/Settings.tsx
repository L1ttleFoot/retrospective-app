import {IconButton} from '@components/IconButton';
import SettingsIcon from '@assets/icons/settings.svg?react';
import {useModal} from '@hooks/useModal';
import {useState} from 'react';
import {usePopper} from 'react-popper';
import {createPortal} from 'react-dom';
import {Backdrop} from '@components/Backdrop';
import * as Styled from './Settings.styled';
import {useTheme} from '@store/useTheme';
import {ToggleButton} from '@components/ToggleButton';

export const Settings = () => {
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
    });

    const modalRoot = document.getElementById('modal-root');

    const {currentTheme, toggleTheme} = useTheme();

    return (
        <>
            <IconButton
                onClick={toggleOpen}
                size="small"
                innerRef={setReferenceElement as React.Ref<HTMLButtonElement>}
            >
                <SettingsIcon />
            </IconButton>
            {open &&
                modalRoot &&
                createPortal(
                    <Backdrop onClose={handleClose} isTransparent>
                        <Styled.Modal
                            ref={setPopperElement as React.LegacyRef<HTMLDivElement>}
                            style={styles.popper}
                            {...attributes.popper}
                        >
                            <ToggleButton
                                value={currentTheme === 'ligth'}
                                onToggle={toggleTheme}
                            ></ToggleButton>
                        </Styled.Modal>
                    </Backdrop>,
                    modalRoot,
                )}
        </>
    );
};
