import {create} from 'zustand';

export interface IDiscussion {
    id: string;
    name: string;
    createdAt: number;
}

interface IDiscussionsStore {
    currentDiscussionId?: string;
    setCurrentDiscussionId: (id?: string) => void;
}

export const useDiscussions = create<IDiscussionsStore>()((set) => ({
    currentDiscussionId: undefined,
    setCurrentDiscussionId: (id) => set(() => ({currentDiscussionId: id})),
}));
