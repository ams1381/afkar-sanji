import '@/styles/globals.css'
import AuthContextProvider, { AuthContext } from '@/utilities/AuthContext'
import { axiosInstance } from '@/utilities/axios'
import { useLocalStorage } from '@/utilities/useLocalStorage'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'


export default function App({ Component, pageProps }) {
  const router = useRouter();

  const { getItem , setItem } = useLocalStorage();

    const authentication = async () => {
    if(getItem('cookie'))
    {
      axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + getItem('cookie');
      try
      {
        let { data } = await axiosInstance.get('/user-api/users/me/');
        setItem('phoneNumber',data.phone_number)
        return
      }
      catch(err)
      {
         typeof window !== 'undefined' ? router.push('/auth') : ''
          return
      }
      
    }
    else
    typeof window !== 'undefined' ? router.push('/auth') : ''
  }

    useEffect(() => {
      if(router.pathname !== '/auth' && router.pathname !== '/auth/otpSms')
          authentication();
    },[])

  return <AuthContextProvider>
      <Component {...pageProps} />
  </AuthContextProvider> 
}
