import {create} from 'zustand';

export interface IDiscussion {
    id: string;
    name: string;
    date: number;
    current?: boolean;
}

interface IDiscussionsStore {
    discussionsData: IDiscussion[];
    setDiscussionsData: (data: IDiscussion[]) => void;
    currentDiscussionId?: string;
    setCurrentDiscussionId: (id?: string) => void;
}

export const useDiscussions = create<IDiscussionsStore>()((set) => ({
    discussionsData: [],
    setDiscussionsData: (data) => set(() => ({discussionsData: [...data]})),
    currentDiscussionId: undefined,
    setCurrentDiscussionId: (id) => set(() => ({currentDiscussionId: id})),
}));
