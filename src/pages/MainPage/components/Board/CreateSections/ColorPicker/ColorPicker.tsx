import {useState} from 'react';
import {usePopper} from 'react-popper';
import * as Styled from './ColorPicker.styled';
import {colorsList} from './ColorPicker.consts';
import {Backdrop} from '../../../../../../components/Backdrop';
import {ISection} from '../../../../../../store/useSections';

type ColorPickerProps = {
    currentColor: string;
    index: number;
    setColor: (index: number, section: ISection, color: string) => void;
} & ISection;

export const ColorPicker = ({currentColor, setColor, index, ...rest}: ColorPickerProps) => {
    const [visible, setVisible] = useState(false);

    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const {styles, attributes} = usePopper(referenceElement, popperElement, {
        modifiers: [{name: 'arrow', options: {element: arrowElement}}],
    });

    const toggleVisible = () => {
        setVisible((prev) => !prev);
    };

    const closeVisible = () => {
        setVisible(false);
    };

    return (
        <>
            <Styled.ColorPicker
                onClick={toggleVisible}
                ref={setReferenceElement as React.LegacyRef<HTMLDivElement>}
                color={currentColor}
            />

            {visible && (
                <Backdrop onClose={closeVisible} isTransparent>
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
                        <div
                            ref={setArrowElement as React.LegacyRef<HTMLDivElement>}
                            style={styles.arrow}
                        />
                    </Styled.Colors>
                </Backdrop>
            )}
        </>
    );
};
