import {BASE_URL} from '@/consts/api';
import api from '@/src/api/axios';
import {Reaction, Role, User} from '@/src/shared/types/models';

type ModelMap = {user: User; role: Role; reaction: Reaction};

type ModelReturnType<T extends keyof ModelMap> = ModelMap[T];

export const getByModel = async <T extends keyof ModelMap>({
	model,
}: {
	model: T;
}): Promise<ModelReturnType<T>[]> => {
	const response = await api.get(`${BASE_URL}/api/admin/${model}/get`, {withCredentials: true});

	return response.data;
};

export const createReaction = async (data: {id: string; value: string}) => {
	await api.post(`${BASE_URL}/api/admin/reaction/create`, data, {withCredentials: true});
};
