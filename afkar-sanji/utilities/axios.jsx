import axios from "axios";
import { useRouter } from "next/router";
import { AuthContext } from "./AuthContext";
axios.defaults.baseURL = 'https://mostafarm7.pythonanywhere.com';

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
    console.log(error)
    switch(error.response.status)
    {
        case 401:
            if(AuthContext.Cookie)
            {
                let { refresh }  = await axiosInstance.post('/user-api/auth/refresh-token/');
                AuthContext.Cookie = refresh
                axiosInstance.request(error.config)
            }
            else
            {
                return
            }
            // axiosInstance.request(error.config)
            break;
        case 404:
            break;
        case 500:
            break;
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});