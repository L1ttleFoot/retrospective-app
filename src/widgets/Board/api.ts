import axios from 'axios';

import {BASE_URL} from '@/consts/api';

import {Section} from './BoardSection/BoardSection.types';

export const getSections = async (discussionId: string): Promise<Section[]> => {
	const response = await axios.get(`${BASE_URL}/api/sections/${discussionId}`);
	return response.data;
};
