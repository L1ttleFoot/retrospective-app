import {createPortal} from 'react-dom';

import {useModal} from '@/hooks/useModal';
import {Backdrop} from '@/ui/Backdrop';
import {Button} from '@/ui/Button';

import {AddSections} from './AddSections';

export const AddSectionsModal = () => {
	const {open, handleOpen, handleClose} = useModal();

	const modalRoot = document.getElementById('modal-root');

	return (
		<>
			<Button onClick={handleOpen}>Создать поля</Button>
			{open &&
				modalRoot &&
				createPortal(
					<Backdrop onClose={handleClose}>
						<AddSections handleClose={handleClose} />
					</Backdrop>,
					modalRoot,
				)}
		</>
	);
};
