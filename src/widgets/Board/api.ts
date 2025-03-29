import {BASE_URL} from '@consts/api';
import axios from 'axios';
import {Section} from './BoardSection/BoardSection.types';
import {SectionsForm} from './CreateSections/ModalForm/ModalForm';
import api from '@src/api/axios';
import {Discussion} from '@store/useDiscussions';

export const createSections = async ({sections}: SectionsForm) => {
    const response = await api.post(
        `${BASE_URL}/api/sections`,
        {sections},
        {
            withCredentials: true,
        },
    );

    return response.data;
};

export const getSections = async (discussionId: string): Promise<Section[]> => {
    const response = await axios.get(`${BASE_URL}/api/sections/${discussionId}`);
    return response.data;
};
