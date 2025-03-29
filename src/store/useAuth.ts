import {BASE_URL} from '@consts/api';
import api from '@src/api/axios';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

type UserDataType = {
    id: string;
    username: string;
    token: string;
    roles: {id: number; value: string}[];
};

interface AuthStore {
    userData?: UserDataType;
    isAuth: boolean;
    setUserData: (userData: UserDataType) => void;
    logout: () => void;
    checkAuth: () => void;
}

export const useAuth = create<AuthStore>()(
    persist(
        (set) => ({
            userData: undefined,
            isAuth: false,
            setUserData: (userData) => set(() => ({userData, isAuth: !!userData})),
            logout: async () => {
                try {
                    await api.get(`${BASE_URL}/api/logout`, {withCredentials: true});
                    localStorage.removeItem('auth-starage');
                    set(() => ({userData: undefined, isAuth: false}));
                } catch (error) {
                    console.error('Failed to logout', error);
                }
            },
            checkAuth: async () => {
                try {
                    const response = await api.get(`${BASE_URL}/api/refresh`, {
                        withCredentials: true,
                    });
                    set(() => ({userData: response.data, isAuth: true}));
                } catch (error) {
                    console.error('Failed to refresh auth', error);
                    set(() => ({userData: undefined, isAuth: false}));
                }
            },
        }),
        {
            name: 'auth-storage',
        },
    ),
);
