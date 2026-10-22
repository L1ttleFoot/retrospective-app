import {Placement, autoUpdate, flip, offset, shift, useFloating} from '@floating-ui/react-dom';
import {SettingsIcon} from 'lucide-react';

import {useModal} from '@/src/shared/hooks/useModal';
import {useTheme} from '@/store/useTheme';
import {Backdrop} from '@/ui/Backdrop';
import {IconButton} from '@/ui/IconButton';
import {Portal} from '@/ui/Portal';
import {ToggleButton} from '@/ui/ToggleButton';

import * as Styled from './Settings.styled';

export const Settings = () => {
	const {open, toggleOpen, handleClose} = useModal();

	const {refs, strategy, x, y} = useFloating<HTMLButtonElement>({
		placement: 'bottom-end' as Placement,
		middleware: [offset(10), flip({padding: 10}), shift({padding: 10})],

		whileElementsMounted: autoUpdate,
	});

	const {currentTheme, toggleTheme} = useTheme();

	return (
		<>
			<IconButton onClick={toggleOpen} size="small" ref={refs.setReference}>
				<SettingsIcon />
			</IconButton>

			{open && (
				<Portal portalId="modal-root">
					<Backdrop onClose={handleClose} isTransparent>
						<Styled.Modal
							ref={refs.setFloating}
							style={{position: strategy, top: y ?? 0, left: x ?? 0}}
						>
							<ToggleButton value={currentTheme === 'dark'} onToggle={toggleTheme}></ToggleButton>
						</Styled.Modal>
					</Backdrop>
				</Portal>
			)}
		</>
	);
};
