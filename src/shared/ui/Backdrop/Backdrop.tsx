import {ReactNode} from 'react';

import * as Styled from './Backdrop.styled';

type BackdropProps = {onClose: () => void; children: ReactNode; isTransparent?: boolean};

export const Backdrop = ({onClose, children, isTransparent = false}: BackdropProps) => {
	const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		if (e.currentTarget === e.target) {
			onClose();
		}
	};

	return (
		<Styled.Backdrop onClick={handleBackdrop} $isTransparent={isTransparent}>
			{children}
		</Styled.Backdrop>
	);
};
