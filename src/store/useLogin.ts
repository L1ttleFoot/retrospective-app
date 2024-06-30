import {create} from 'zustand';

interface LoginStore {
    login?: string;
    isLoggedIn: boolean;
    setLogin: (login: string) => void;
    resetUser: () => void;
}

export const useLogin = create<LoginStore>()((set) => ({
    login: undefined,
    isLoggedIn: false,
    setLogin: (login) => set(() => ({login: login, isLoggedIn: true})),
    resetUser: () => set(() => ({login: undefined, isLoggedIn: false})),
}));
