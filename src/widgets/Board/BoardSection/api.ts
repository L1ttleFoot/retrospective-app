import {BASE_URL} from '@consts/api';
import axios from 'axios';
import {Message, Section} from './BoardSection.types';
import api from '@src/api/axios';

type createMessageProps = {
    text: Message['text'];
    sectionId: Message['sectionId'];
    authorId?: Message['authorId'] | null;
};

type updateMessageProps = {
    messageId: Message['id'];
    sectionId: Section['id'];
    sourceSectionId: Section['id'];
};

export const createMessage = async ({
    text,
    sectionId,
    authorId,
}: createMessageProps): Promise<Message> => {
    const response = await api.post(
        `${BASE_URL}/api/messages`,
        {text, sectionId, authorId},
        {
            withCredentials: true,
        },
    );

    return response.data;
};

export const getMessages = async (sectionId: Section['id']): Promise<Message[]> => {
    const response = await axios.get(`${BASE_URL}/api/messages/${sectionId}`);

    return response.data;
};

export const updateMessage = async ({
    messageId,
    sectionId,
}: updateMessageProps): Promise<Message[]> => {
    const response = await axios.post(`${BASE_URL}/api/messages/${messageId}/update`, {sectionId});

    return response.data;
};

export const deleteMessage = async (messageId: Message['id']) => {
    const response = await axios.delete(`${BASE_URL}/api/messages/${messageId}`);

    const message = response.data;

    return message;
};

export const addEmoji = async (
    messageId: Message['id'],
    emoji: {id: string; character: string},
) => {
    const response = await axios.post(`${BASE_URL}/api/messages/${messageId}/emojies`, {emoji});

    return response.data;
};
