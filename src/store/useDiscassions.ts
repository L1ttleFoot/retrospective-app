import {create} from 'zustand';

export interface IDiscassion {
    id: string;
    name: string;
    date: Date;
    current?: boolean;
}

interface IDiscassionsStore {
    discassionsData: IDiscassion[];
    setDiscassionsData: (data: IDiscassion[]) => void;
    currentDiscassionId?: string;
    setCurrentDiscassionId: (id?: string) => void;
}

export const useDiscassions = create<IDiscassionsStore>()((set) => ({
    discassionsData: [],
    setDiscassionsData: (data) => set(() => ({discassionsData: [...data]})),
    currentDiscassionId: undefined,
    setCurrentDiscassionId: (id) => set(() => ({currentDiscassionId: id})),
}));
