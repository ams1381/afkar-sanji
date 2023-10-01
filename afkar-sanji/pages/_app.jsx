import '@/styles/globals.css'
import AuthContextProvider, { AuthContext } from '@/utilities/AuthContext'
import { axiosInstance } from '@/utilities/axios'
import { useLocalStorage } from '@/utilities/useLocalStorage'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { QueryClientProvider , QueryClient} from '@tanstack/react-query'
import axios from 'axios'
import { beforeUnloadHandler } from './questionnaire/[QuestionnaireID]'
import { setCookie } from 'react-use-cookie'

const queryClient = new QueryClient()

export default function App({ Component, pageProps , cookies }) {
  const router = useRouter();
  // const AuthContext = useContext();
  const [ readyToRender , setReadyToRender ] = useState(false);
  // const [ phoneNum, setPhoneNumber ] = useCookie('numberPhone', null);
   
    const authentication = async () => {
      if (!pageProps.cookies || !pageProps.cookies.access_token) {
        router.push({
          pathname: '/auth',
          query: { 
            returnUrl: router.asPath ,
           },
        });
        return;
      }
      axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + pageProps?.cookies?.access_token;
      try
      {
        let { data } = await axiosInstance.get('/user-api/users/me/');
        setReadyToRender(true)
        return
      }
      catch(err)
      {
         router.push('/auth');
        return
      }
      
    }
    useEffect(() => {
      if(router.pathname !== '/auth' 
      && router.pathname !== '/404' &&
      router.pathname !== '/403' &&
      router.pathname != '/505' 
      && router.pathname !== '/auth/otpSms'
       && !router.pathname.includes('AnswerPage'))
          authentication();
      else
        setReadyToRender(true)
    },[])

      if (typeof window !== 'undefined') 
          window.removeEventListener('beforeunload',beforeUnloadHandler)
    
  return  <AuthContextProvider>
    <QueryClientProvider client={queryClient}>
      { readyToRender && <Component {...pageProps} /> }
      </QueryClientProvider>
  </AuthContextProvider> 
}
