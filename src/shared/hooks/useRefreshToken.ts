import axios from 'axios';

import {BASE_URL} from '@/consts/api';
import {useAuth} from '@/store/useAuth';

export const useRefreshToken = () => {
	const {setUserData} = useAuth();

	const refresh = async () => {
		const response = await axios.get(`${BASE_URL}/api/refresh`, {withCredentials: true});
		setUserData(response.data);
		return response.data.accessToken;
	};

	return refresh;
};
