import '@/styles/globals.css'
import AuthContextProvider, { AuthContext } from '@/utilities/AuthContext'
import { axiosInstance } from '@/utilities/axios'
import { useLocalStorage } from '@/utilities/useLocalStorage'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'


export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [ readyToRender , setReadyToRender ] = useState(false);

  const { getItem , setItem } = useLocalStorage();
    const authentication = async () => {
    if(getItem('cookie'))
    {
      axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + getItem('cookie');
      try
      {
        let { data } = await axiosInstance.get('/user-api/users/me/');
        setItem('phoneNumber',data.phone_number)
        setReadyToRender(true)
        // return
      }
      catch(err)
      {
         router.push('/auth');
          return
      }
      
    }
    else
      router.push('/auth');
  }

    useEffect(() => {
      if(router.pathname !== '/auth' && router.pathname !== '/auth/otpSms')
          authentication();
      else
        setReadyToRender(true)
    },[])

  return <AuthContextProvider>
      { readyToRender && <Component {...pageProps} /> }
  </AuthContextProvider> 
}
