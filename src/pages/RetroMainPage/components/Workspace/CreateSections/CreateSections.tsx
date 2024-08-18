import {Button} from '../../../../../components/Button';
import {ModalForm} from './Modal';
import {Backdrop} from '../../../../../components/Backdrop';
import {useModal} from '../../../../../hooks/useModal';

export const CreateSections = () => {
    const {open, handleOpen, handleClose} = useModal();

    return (
        <>
            <Button onClick={handleOpen}>Создать области</Button>
            {open && (
                <Backdrop onClose={handleClose}>
                    <ModalForm hanldeClose={handleClose} />
                </Backdrop>
            )}
        </>
    );
};
