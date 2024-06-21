import axios, { AxiosRequestHeaders } from "axios";
import { getToken, saveToken } from "../resources/storage";

const apiUrl = process.env.EXPO_PUBLIC_BASE_URL
console.log(process.env.EXPO_PUBLIC_BASE_URL, 'process.env.EXPO_PUBLIC_BASE_URL')
const api = axios.create({
    baseURL: apiUrl,
    headers: {
        accept: "*/*",
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    async (config) => {
        const result = await getToken("accessToken")
        config.headers = { ...config.headers } as AxiosRequestHeaders;
        if (result) {
            config.headers["Authorization"] = `Bearer ${result}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const getNewAccessToken = async () => {
    const refreshToken = await getToken("refreshToken")
    try {
        const response = await axios(`${apiUrl}/users/refresh`, {
            method: "post",
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        });
        await saveToken("accessToken", response.data?.accessToken);
        await saveToken("refreshToken", response.data?.refreshToken);
        const newAccessToken = response.data.accessToken;
        return newAccessToken;
    } catch (error) {
        console.error('Failed to refresh access token:', error);
        throw error;
    }
};

// api.interceptors.response.use(
//     response => response,
//     async error => {
//         const originalRequest = error.config;
//         if (error.response && error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 console.log('refreshing')
//                 const newAccessToken = await getNewAccessToken();
//                 axios.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
//                 originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
//                 return api(originalRequest);
//             } catch (refreshError) {
//                 console.error('Token refresh error:', refreshError);
//                 return Promise.reject(refreshError);
//             }
//         }
//         return Promise.reject(error);
//     }
// );

export default api