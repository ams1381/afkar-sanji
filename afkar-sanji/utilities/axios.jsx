import axios from "axios";
import { AuthContext } from "./AuthContext";
import { getCookie } from "react-use-cookie";
// export const baseURL = 'http://mah-api.ariomotion.com/';
// export const baseURL = 'https://mostafarm7.pythonanywhere.com/'
// axios.defaults.baseURL = 'https://mostafarm7.pythonanywhere.com/';
axios.defaults.baseURL = '/api'
let refreshToken;

export const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data'
    }
});
export const SetRefreshToken =(RefreshToken) => {
    refreshToken = RefreshToken;
}
axiosInstance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
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

                // console.log('before change' ,error.config )
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
                // errorConfig.headers['Authorization'] = data.access;
                // errorConfig.refresh_token = data.refresh;
                // console.log(errorConfig.headers['Authorization'] == error.config.headers['Authorization'])
                // console.log('after change' ,errorConfig  )
                // axiosInstance.request(error.config)
                // console.log(errorConfig)
                // window.location.reload()
            }
            catch(err)
            {
                console.log(err)
                // window.location.pathname = '/auth';
            }
            break;
        case 403:
            window.location.pathname = '/403'
            break;
        // case 404:
        //     window.location.pathname = '/404'
        //     break;
        // case 500:
        //     window.location.pathname = '/500'
        //     break;
    }
    return Promise.reject(error);
});
