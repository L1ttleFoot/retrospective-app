import {ReactElement} from 'react';
import {Navigate} from 'react-router-dom';

import {ROUTES} from '@/consts/routes';
import {useAuth} from '@/store/useAuth';

type ProtectedRoute = {element: ReactElement; allowedRoles: string[]};

export const ProtectedRoute = ({element, allowedRoles}: ProtectedRoute) => {
	const {userData} = useAuth();

	if (!userData) {
		return <Navigate to="/login" replace />;
	}

	const hasAccess = userData?.roles.some((role) => allowedRoles.includes(role.value));

	return hasAccess ? element : <Navigate to={ROUTES.FORBIDDEN} replace />;
};
