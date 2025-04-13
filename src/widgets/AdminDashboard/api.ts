import {BASE_URL} from '@consts/api';
import {Role, User, Emoji} from '@src/shared/types/models';
import axios from 'axios';

type ModelName = 'user' | 'role' | 'emoji';

type ModelMap = {
    user: User;
    role: Role;
    emoji: Emoji;
};

type ModelReturnType<T extends keyof ModelMap> = ModelMap[T];

export const getByModel = async <T extends ModelName>({model}: {model: T}): Promise<ModelReturnType<T>[]> => {
    const response = await axios.get(`${BASE_URL}/api/admin/${model}/get`, {
        withCredentials: true,
    });

    return response.data;
};
