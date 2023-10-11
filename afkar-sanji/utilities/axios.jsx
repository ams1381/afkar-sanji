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
    // Do something before reis sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
function extractTokensFromCookie(cookieString) {
    const cookiePairs = cookieString.split(';');
    let csrfToken = null;
    let tokenString = null;

    for (const pair of cookiePairs) {
        const trimmedPair = pair.trim();
        if (trimmedPair.startsWith('csrftoken=')) {
            csrfToken = trimmedPair.split('=')[1];
        } else if (trimmedPair.startsWith('token=')) {
            tokenString = trimmedPair.split('=')[1];
        }
    }
    console.log(csrfToken, tokenString)
    return { csrfToken, tokenString };
}

function parseTokenString(tokenString) {
    // Assuming tokenString is Base64 encoded, decode it
    const decodedTokenString = atob(tokenString);

    // Assuming tokenString contains JSON with access and refresh tokens
    const tokens = JSON.parse(decodedTokenString);

    return tokens;
}
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
                await axios.post('/user-api/auth/refresh-token/', { refresh : axiosInstance.defaults.refresh_token })
                window.location.reload()
            }
            catch(err)
            {
                window.location.pathname = '/auth';
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
