import axios from 'axios';

import {BASE_URL} from '@/consts/api';
import {Emoji, Role, User} from '@/src/shared/types/models';

type ModelMap = {user: User; role: Role; emoji: Emoji};

type ModelReturnType<T extends keyof ModelMap> = ModelMap[T];

export const getByModel = async <T extends keyof ModelMap>({
	model,
}: {
	model: T;
}): Promise<ModelReturnType<T>[]> => {
	const response = await axios.get(`${BASE_URL}/api/admin/${model}/get`, {withCredentials: true});

	return response.data;
};
