import SettingsIcon from '@assets/icons/settings.svg?react';
import {Placement, autoUpdate, flip, offset, shift, useFloating} from '@floating-ui/react-dom';
import {createPortal} from 'react-dom';

import {useModal} from '@/src/shared/hooks/useModal';
import {useTheme} from '@/store/useTheme';
import {Backdrop} from '@/ui/Backdrop';
import {IconButton} from '@/ui/IconButton';
import {ToggleButton} from '@/ui/ToggleButton';

import * as Styled from './Settings.styled';

export const Settings = () => {
	const {open, toggleOpen, handleClose} = useModal();

	const {refs, strategy, x, y} = useFloating<HTMLButtonElement>({
		placement: 'bottom-end' as Placement,
		middleware: [offset(10), flip({padding: 10}), shift({padding: 10})],

		whileElementsMounted: autoUpdate,
	});

	const modalRoot = document.getElementById('modal-root');

	const {currentTheme, toggleTheme} = useTheme();

	return (
		<>
			<IconButton onClick={toggleOpen} size="small" innerRef={refs.setReference}>
				<SettingsIcon />
			</IconButton>
			{open &&
				modalRoot &&
				createPortal(
					<Backdrop onClose={handleClose} isTransparent>
						<Styled.Modal
							ref={refs.setFloating}
							style={{position: strategy, top: y ?? 0, left: x ?? 0}}
						>
							<ToggleButton value={currentTheme === 'light'} onToggle={toggleTheme}></ToggleButton>
						</Styled.Modal>
					</Backdrop>,
					modalRoot,
				)}
		</>
	);
};
