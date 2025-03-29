import axios from 'axios';
import {BASE_URL} from '@consts/api';
import {useAuth} from '@store/useAuth';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const storedData = JSON.parse(localStorage.getItem('auth-storage') || '{}');
    const token = storedData?.state?.userData?.token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

async function refreshAuthToken() {
    try {
        const response = await api.get(`${BASE_URL}/api/refresh`, {withCredentials: true});
        const {setUserData} = useAuth.getState();
        setUserData(response.data);
        return response.data;
    } catch (error) {
        console.error('Refresh token failed:', error);
        throw error;
    }
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newUserData = await refreshAuthToken();
                originalRequest.headers.Authorization = `Bearer ${newUserData.token}`;
                return api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    },
);

export default api;
