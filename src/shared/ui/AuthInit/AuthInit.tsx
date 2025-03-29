import {useAuth} from '@store/useAuth';
import {ReactNode, useEffect} from 'react';

export const AuthInit = ({children}: {children: ReactNode}) => {
    const {checkAuth} = useAuth();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return children;
};
