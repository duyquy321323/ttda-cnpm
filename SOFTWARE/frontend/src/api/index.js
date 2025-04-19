/* eslint-disable no-restricted-globals */
import axios from 'axios';
import userService from "../services/userService"
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

// Add a request interceptor
api.interceptors.request.use((config) => {
    // Do something before request is sent
    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // Nếu BE trả về 401
    if (error.response?.status === 401) {
        userService.logout().then(() => {
            location.href = '/login';
        })
    }

    const originalRequest = error.config;

    if (error.response?.status === 410 && !originalRequest._retry) {
        originalRequest._retry = true;

        return userService.refresh_token()
            .then((res) => {

                return api(originalRequest);
            })
            .catch((err) => {
                userService.logout().then(() => {
                    location.href = '/login';
                })

                return Promise.reject(err);
            })

    }


    if (error.response?.status !== 410) {
        toast.error(error.response?.data?.message || error?.message);
    }
    return Promise.reject(error);
});


export default api;