import axios from "axios";
import { useRouter } from "next/router";
import { AuthContext } from "./AuthContext";
axios.defaults.baseURL = 'https://mostafarm7.pythonanywhere.com';
import { message } from "antd";

// const router = useRouter();

export const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    
    return response;
}, async function  (error) {
    if(!error.response)
        return
    switch(error.response.status)
    {
        case 401:
            try
            {
                let { refresh }  = await axiosInstance.post('/user-api/auth/refresh-token/');
                axiosInstance.defaults.headers['Authorization'] = refresh;
                axiosInstance.request(error.config)
            }
            catch(err)
            {
                window.location.pathname = '/auth'
            }
            break;
        case 404:
            break;
        case 500:
            console.log('50000000000000')
            break;
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
