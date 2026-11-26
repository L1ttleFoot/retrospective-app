import api from '@/src/api/axios';

import {Section} from './BoardSection/BoardSection.types';

export const getSections = async (
	boardId: string,
): Promise<{boardTitle: string; sections: Section[]}> => {
	const response = await api.get(`/api/boards/${boardId}/sections`);

	return response.data;
};
