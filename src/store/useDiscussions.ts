import {create} from 'zustand';

export interface IDiscussion {
    id: string;
    name: string;
    createdAt: number;
}

interface IDiscussionsStore {
    discussionsData: IDiscussion[];
    setDiscussionsData: (data: IDiscussion[]) => void;
    currentDiscussionId?: string;
    setCurrentDiscussionId: (id?: string) => void;
    isDiscussionsLoading: boolean;
    setIsDiscussionsLoading: (isLoading: boolean) => void;
}

export const useDiscussions = create<IDiscussionsStore>()((set) => ({
    discussionsData: [],
    setDiscussionsData: (data) => set(() => ({discussionsData: [...data]})),
    currentDiscussionId: undefined,
    setCurrentDiscussionId: (id) => set(() => ({currentDiscussionId: id})),
    isDiscussionsLoading: false,
    setIsDiscussionsLoading: (isLoading: boolean) => set(() => ({isDiscussionsLoading: isLoading})),
}));
