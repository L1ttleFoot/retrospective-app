import axios from 'axios';

import {BASE_URL} from '@/consts/api';

import {Section} from './BoardSection/BoardSection.types';

export const getSections = async (boardId: string): Promise<{sections: Section[]}> => {
	const response = await axios.get(`${BASE_URL}/api/sections/${boardId}`);

	return response.data;
};
