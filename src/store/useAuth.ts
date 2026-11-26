import {create} from 'zustand';

import api, {authClient} from '@/src/api/axios';

import {User} from '../shared/types/models';

type UserDataType = User & {token: string; isGuest: boolean};

type AuthStore = {
	userData?: UserDataType;
	isAuth: boolean;
	isReady: boolean;
	setUserData: (userData: UserDataType) => void;
	logout: () => Promise<void>;
	checkAuth: () => Promise<void>;
};

export const useAuth = create<AuthStore>()((set) => ({
	userData: undefined,
	isAuth: false,
	isReady: false,
	setUserData: (userData) => set(() => ({userData, isAuth: !!userData})),
	logout: async () => {
		try {
			await authClient.post('/api/auth/logout');
		} catch (error) {
			console.error('Failed to logout', error);
		} finally {
			set(() => ({userData: undefined, isAuth: false}));
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
}));
