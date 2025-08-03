import {ReactNode, useEffect} from 'react';

import {useAuth} from '@/store/useAuth';

export const AuthInit = ({children}: {children: ReactNode}) => {
	const {checkAuth} = useAuth();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	return children;
};
