import {useModal} from '@/hooks/useModal';
import {Backdrop} from '@/ui/Backdrop';
import {Button} from '@/ui/Button';

import {ModalForm} from './ModalForm';

export const CreateSections = () => {
	const {open, handleOpen, handleClose} = useModal();

	return (
		<>
			<Button onClick={handleOpen}>Создать области</Button>
			{open && (
				<Backdrop onClose={handleClose}>
					<ModalForm handleClose={handleClose} />
				</Backdrop>
			)}
		</>
	);
};
