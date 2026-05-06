import {useModal} from '@/hooks/useModal';
import {Backdrop} from '@/ui/Backdrop';
import {Button} from '@/ui/Button';
import {Portal} from '@/ui/Portal';

import {AddSections} from './AddSections';

export const AddSectionsModal = () => {
	const {open, handleOpen, handleClose} = useModal();

	return (
		<>
			<Button onClick={handleOpen}>Создать поля</Button>
			{open && (
				<Portal>
					<Backdrop onClose={handleClose}>
						<AddSections handleClose={handleClose} />
					</Backdrop>
					,
				</Portal>
			)}
		</>
	);
};
