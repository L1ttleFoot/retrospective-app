import {create} from 'zustand';

export interface Area {
    id: string;
    title: string;
    color: string;
}

interface AreasStore {
    areasData: Area[];
    setAreasData: (data: Area[]) => void;
}

export const useAreas = create<AreasStore>()((set) => ({
    areasData: [],
    setAreasData: (data) => set(() => ({areasData: [...data]})),
}));
