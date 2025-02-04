import {create} from 'zustand';

export interface IDiscussion {
    id: string;
    name: string;
    createdAt: number;
    sound?: boolean;
}

interface IDiscussionsStore {
    currentDiscussionId: string;
    setCurrentDiscussionId: (id?: string) => void;
}

export const useDiscussions = create<IDiscussionsStore>()((set) => ({
    currentDiscussionId: '',
    setCurrentDiscussionId: (id) => set(() => ({currentDiscussionId: id})),
}));
