import {create} from 'zustand';

export interface Messages {
    [key: string]: {
        id: string;
        areaId: string;
        areaIndex: number;
        text: string;
        votes: number;
        timestamp: number;
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
