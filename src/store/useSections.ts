import {create} from 'zustand';

export interface ISection {
    id: string;
    title: string;
    color: string;
}

interface SectionsStore {
    sectionsData: ISection[];
    setSectionsData: (data: ISection[]) => void;
}

export const useSections = create<SectionsStore>()((set) => ({
    sectionsData: [],
    setSectionsData: (data) => set(() => ({sectionsData: [...data]})),
}));
