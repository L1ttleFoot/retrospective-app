import {ReactNode, useEffect} from 'react';

import {useAuth} from '@/store/useAuth';

import {LoadingSpiner} from '../LoadingSpiner';

export const AuthInit = ({children}: {children: ReactNode}) => {
	const checkAuth = useAuth((s) => s.checkAuth);
	const isReady = useAuth((s) => s.isReady);

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (!isReady) return <LoadingSpiner />;

	return children;
};
