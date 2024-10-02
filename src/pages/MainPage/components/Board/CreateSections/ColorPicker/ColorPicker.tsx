import {useState} from 'react';
import {usePopper} from 'react-popper';
import * as Styled from './ColorPicker.styled';
import {colorsList} from './ColorPicker.consts';
import {Backdrop} from '../../../../../../components/Backdrop';
import {ISection} from '../../../../../../store/useSections';
import {useModal} from '../../../../../../hooks/useModal';

type ColorPickerProps = {
    currentColor: string;
    index: number;
    setColor: (index: number, section: ISection, color: string) => void;
} & ISection;

export const ColorPicker = ({currentColor, setColor, index, ...rest}: ColorPickerProps) => {
    const {open, toggleOpen, handleClose} = useModal();

    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const {styles, attributes} = usePopper(referenceElement, popperElement);

    return (
        <>
            <Styled.ColorPicker
                onClick={toggleOpen}
                ref={setReferenceElement as React.LegacyRef<HTMLDivElement>}
                color={currentColor}
            />

            {open && (
                <Backdrop onClose={handleClose} isTransparent>
                    <Styled.Colors
                        ref={setPopperElement as React.LegacyRef<HTMLDivElement>}
                        style={styles.popper}
                        {...attributes.popper}
                    >
                        {Object.values(colorsList).map((color) => (
                            <Styled.Color
                                color={color}
                                currentColor={currentColor}
                                onClick={() => setColor(index, {...rest}, color)}
                            />
                        ))}
                    </Styled.Colors>
                </Backdrop>
            )}
        </>
    );
};
