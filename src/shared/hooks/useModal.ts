import {useState} from 'react';

export const useModal = () => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const toggleOpen = () => {
		setOpen((prev) => !prev);
	};

	return {open, handleOpen, handleClose, toggleOpen};
};
