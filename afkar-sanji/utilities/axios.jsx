import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useLocalStorage } from "./useLocalStorage";
// export const baseURL = 'http://mah-api.ariomotion.com/';
// export const baseURL = 'https://mostafarm7.pythonanywhere.com/'
// axios.defaults.baseURL = 'https://mostafarm7.pythonanywhere.com/';
axios.defaults.baseURL = '/api'

const { getItem , setItem } = useLocalStorage();

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

axiosInstance.interceptors.response.use(function (response) {
    return response;
}, async function  (error) {
    if(!error.response)
        return
    switch(error.response.status)
    {
        case 401:
            try
            {
                let { data }  = await axiosInstance.post('/user-api/auth/refresh-token/', { refresh : getItem('refresh')} );
                setItem('cookie',data.access);
                setItem('refresh',data.refresh)
                axiosInstance.defaults.headers['Authorization'] = data.access;
                // axiosInstance.request(error.config)
            }
            catch(err)
            {
                console.log(err)
                window.location.pathname = '/auth'
            }
            break;
        case 403:
            window.location.pathname = '/auth'
            break;
        case 404:
            break;
        case 500:
            console.log('50000000000000')
            break;
    }
    return Promise.reject(error);
});
