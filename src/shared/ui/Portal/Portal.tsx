import {createPortal} from 'react-dom';

type PortalProps = {children: React.ReactNode; portalId?: string};

export const Portal = ({children, portalId = 'modal-root'}: PortalProps) => {
	const root = document.getElementById(portalId);
	return root ? createPortal(children, root) : null;
};
