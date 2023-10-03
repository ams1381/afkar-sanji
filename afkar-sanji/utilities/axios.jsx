import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useLocalStorage } from "./useLocalStorage";
import { getCookie } from "react-use-cookie";
// export const baseURL = 'http://mah-api.ariomotion.com/';
// export const baseURL = 'https://mostafarm7.pythonanywhere.com/'
// axios.defaults.baseURL = 'https://mostafarm7.pythonanywhere.com/';
axios.defaults.baseURL = '/api'
let refreshToken;
const { getItem , setItem } = useLocalStorage();

export const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});
export const SetRefreshToken =(RefreshToken) => {
    refreshToken = RefreshToken;
}
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
                // console.log(getCookie('refresh_token'))
                // const originalConfig = error.config;
                // let { data } = await axios.post('/user-api/auth/refresh-token/', { refresh : getItem('refresh')},{
                //   'Authorization' : axiosInstance.defaults.headers['Authorization']
                // })
                // let { data }  = await axiosInstance.post('/user-api/auth/refresh-token/', { refresh : getItem('refresh')} );
                // setItem('cookie',data.access);
                // setItem('refresh',data.refresh)
                // axiosInstance.defaults.headers['Authorization'] = data.access;
                // axiosInstance.request(error.config)
                // return Promise.reject(error);
            }
            catch(err)
            {
                console.log(err)
                return Promise.reject(error);
                // window.location.pathname = '/auth'
            }
            break;
        case 403:
            window.location.pathname = '/403'
            break;
        case 404:
            window.location.pathname = '/404'
            break;
        case 500:
            // window.location.pathname = '/500'
            break;
    }
    return Promise.reject(error);
});
