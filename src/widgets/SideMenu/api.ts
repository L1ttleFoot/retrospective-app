import {BASE_URL} from '@consts/api';
import api from '@src/api/axios';
import {Discussion} from '@store/useDiscussions';

interface CreateDiscussionRequest {
    name: Discussion['name'];
    ownerId: Discussion['ownerId'];
}

export const createDiscussion = async ({name, ownerId}: CreateDiscussionRequest): Promise<Discussion> => {
    const response = await api.post(
        `${BASE_URL}/api/discussions`,
        {name, ownerId},
        {
            withCredentials: true,
        },
    );

    return response.data;
};

export const getDiscussions = async (): Promise<Discussion[]> => {
    const response = await api.get(`${BASE_URL}/api/discussions`);

    return response.data;
};

export const deleteDiscussion = async (id: Discussion['id']) => {
    const response = await api.delete(`${BASE_URL}/api/discussions/${id}`, {
        withCredentials: true,
    });

    return response.data;
};
