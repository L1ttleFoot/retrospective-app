import {Button} from '../../../../../components/Button';

import {Backdrop} from '../../../../../components/Backdrop';
import {useModal} from '../../../../../hooks/useModal';
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
