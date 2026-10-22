import {ReactNode} from 'react';

import {backdropRecipe} from './Backdrop.css';

type BackdropProps = {onClose: () => void; children?: ReactNode; isTransparent?: boolean};

export const Backdrop = ({onClose, children, isTransparent = false}: BackdropProps) => {
	const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		if (e.currentTarget === e.target) {
			onClose();
		}
	};

	return (
		<div className={backdropRecipe({isTransparent})} onClick={handleBackdrop}>
			{children}
		</div>
	);
};
