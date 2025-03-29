import {create} from 'zustand';

export interface Discussion {
    id: string;
    name: string;
    createdAt: Date;
    ownerId: string;
}

interface DiscussionsStore {
    currentDiscussionId: string;
    setCurrentDiscussionId: (id?: string) => void;
}

export const useDiscussions = create<DiscussionsStore>()((set) => ({
    currentDiscussionId: '',
    setCurrentDiscussionId: (id) => set(() => ({currentDiscussionId: id})),
}));
