import {create} from 'zustand';

type userDataType = {email?: string | null; userUid?: string | null};

interface LoginStore {
    userData?: userDataType;
    setUserData: (userData: userDataType) => void;
    resetUser: () => void;
}

export const useLogin = create<LoginStore>()((set) => ({
    userData: undefined,
    setUserData: (userData) => set(() => ({userData})),
    resetUser: () => set(() => ({userData: undefined})),
}));
