import {create} from 'zustand';
import {persist} from 'zustand/middleware';

import api from '@/src/api/axios';

import {Role} from '../shared/types/models';

type UserDataType = {id: string; username: string; token: string; roles: Role[]; isGuest: boolean};

type AuthStore = {
	userData?: UserDataType;
	isAuth: boolean;
	isReady: boolean;
	setUserData: (userData: UserDataType) => void;
	logout: () => Promise<void>;
	checkAuth: () => Promise<void>;
};

export const useAuth = create<AuthStore>()(
	persist(
		(set) => ({
			userData: undefined,
			isAuth: false,
			isReady: false,
			setUserData: (userData) => set(() => ({userData, isAuth: !!userData})),
			logout: async () => {
				try {
					await api.post('/api/auth/logout', {withCredentials: true});
				} catch (error) {
					console.error('Failed to logout', error);
				} finally {
					set(() => ({userData: undefined, isAuth: false}));
					useAuth.persist.clearStorage();
				}
			},
			checkAuth: async () => {
				try {
					const response = await api.get('/api/auth/refresh', {withCredentials: true});
					set(() => ({userData: response.data, isAuth: true}));
				} catch (error) {
					console.error('Failed to refresh auth', error);
					set(() => ({userData: undefined, isAuth: false}));
				} finally {
					set({isReady: true});
				}
			},
		}),
		{name: 'auth-storage'},
	),
);
