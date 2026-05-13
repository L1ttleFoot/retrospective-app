import {BASE_URL} from '@/consts/api';
import api from '@/src/api/axios';
import {Board} from '@/store/useBoards';

type CreateBoardRequest = {title: Board['title']; ownerId: Board['ownerId']};

export const createBoard = async ({title, ownerId}: CreateBoardRequest): Promise<Board> => {
	const response = await api.post(
		`${BASE_URL}/api/boards`,
		{title, ownerId},
		{withCredentials: true},
	);

	return response.data;
};

export const getBoards = async (): Promise<{boards: Board[]}> => {
	const response = await api.get(`${BASE_URL}/api/boards`, {withCredentials: true});

	return response.data;
};

export const deleteBoard = async (id: Board['id']) => {
	const response = await api.delete(`${BASE_URL}/api/boards/${id}`, {withCredentials: true});

	return response.data;
};
