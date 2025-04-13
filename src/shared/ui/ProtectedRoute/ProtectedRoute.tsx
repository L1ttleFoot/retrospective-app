import {ROUTES} from '@consts/routes';
import {useAuth} from '@store/useAuth';
import {ReactElement, useEffect} from 'react';
import {Navigate} from 'react-router-dom';

interface ProtectedRoute {
    element: ReactElement;
    allowedRoles: string[];
}

export const ProtectedRoute = ({element, allowedRoles}: ProtectedRoute) => {
    const {userData} = useAuth();

    if (!userData) {
        return <Navigate to="/login" replace />;
    }

    const hasAccess = userData && userData.roles.map((role) => allowedRoles.includes(role.value))[0];

    return hasAccess ? element : <Navigate to={ROUTES.FORBIDDEN} replace />;
};
