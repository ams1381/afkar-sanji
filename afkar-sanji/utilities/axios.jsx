import axios from "axios";
import { getCookie } from "react-use-cookie";

export const baseurl = 'https://mah.codintofuture.ir'
axios.defaults.baseURL = '/api'
getCookie('role')

export const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(function (config) {
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

        case 400:
            console.log('sgsdgsdgd',error.config)
            break;
        case 401:
            try
            {
                if(error.response.data.code === 'user_inactive') {
                    window.location.pathname = '/auth'
                    return
                }
                let { data } = await axios.post('/user-api/auth/refresh-token/', { refresh : axiosInstance.defaults.refresh_token })
                // console.log(data)
                // let errorConfig = error.config;
                error.config.headers['Authorization'] = 'Bearer ' + data.access;
                // Update the refresh token in the error config
                error.config.refresh_token = data.refresh;
                // Update the default headers for future requests
                axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + data.access;
                // Update the refresh token in the Axios instance
                axiosInstance.refresh_token = data.refresh;
            }
            catch(err)
            {
                window.location.pathname = '/auth';
            }
            break;
        case 403:
            window.location.pathname = '/403'
            break;
    }
    return Promise.reject(error);
});
