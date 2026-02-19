import {Placement, autoUpdate, flip, offset, shift, useFloating} from '@floating-ui/react-dom';

import {useModal} from '@/hooks/useModal';
import {Backdrop} from '@/ui/Backdrop';

import {colorsList} from './ColorPicker.consts';
import * as Styled from './ColorPicker.styled';

type ColorPickerProps = {
	currentColor: string;
	index: number;
	setColor: (index: number, color: string) => void;
};

export const ColorPicker = ({currentColor, setColor, index}: ColorPickerProps) => {
	const {open, toggleOpen, handleClose} = useModal();

	const {refs, strategy, x, y} = useFloating({
		placement: 'bottom-start' as Placement,
		middleware: [offset({mainAxis: 8, crossAxis: -10}), flip(), shift({padding: 8})],

		whileElementsMounted: autoUpdate,
	});

	return (
		<>
			<Styled.ColorPicker onClick={toggleOpen} ref={refs.setReference} color={currentColor} />

			{open && (
				<Backdrop onClose={handleClose} isTransparent>
					<Styled.Colors
						ref={refs.setFloating}
						style={{position: strategy, top: y ?? 0, left: x ?? 0, zIndex: 9999}}
					>
						{Object.values(colorsList).map((color) => (
							<Styled.Color
								key={color}
								color={color}
								$currentColor={currentColor}
								onClick={() => setColor(index, color)}
							/>
						))}
					</Styled.Colors>
				</Backdrop>
			)}
		</>
	);
};
