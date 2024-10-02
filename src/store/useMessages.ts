import {create} from 'zustand';

export interface Messages {
    [key: string]: {
        id: string;
        sectionId: string;
        sectionIndex: number;
        text: string;
        votes: number;
        timestamp: number;
        color: string;
        emoji: Record<string, number>;
    }[];
}

interface MessagesStore {
    messagesData: Messages;
    setMessagesData: (data: Messages) => void;
}

export const useMessages = create<MessagesStore>()((set) => ({
    messagesData: {},
    setMessagesData: (data) => set(() => ({messagesData: data})),
}));
