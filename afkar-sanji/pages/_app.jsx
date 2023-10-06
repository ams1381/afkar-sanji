import '@/styles/globals.css';
import AuthContextProvider, { AuthContext } from '@/utilities/AuthContext';
import { axiosInstance } from '@/utilities/axios';
import { message } from 'antd';
import { useLocalStorage } from '@/utilities/useLocalStorage'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { QueryClientProvider , QueryClient} from '@tanstack/react-query'
import axios from 'axios'
import { beforeUnloadHandler } from './questionnaire/[QuestionnaireID]'
import { setCookie } from 'react-use-cookie'
import { ThreeDots } from 'react-loader-spinner'

const queryClient = new QueryClient()

export default function App({ Component, pageProps , cookies }) {
  const router = useRouter();
  const [ MessageApi , MessageContext ] = message.useMessage();
  const [ readyToRender , setReadyToRender ] = useState(false);
  const [ UserData , setUserData ]= useState(null);
  // const [ phoneNum, setPhoneNumber ] = useCookie('numberPhone', null);
   
    const authentication = async () => {
      if (!pageProps.cookies || !pageProps.cookies.access_token) {
        window.location.pathname = '/auth'
        return;
      }
      axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + pageProps?.cookies?.access_token;
      try
      {
        let { data } = await axiosInstance.get('/user-api/users/me/');
        setUserData(data)
        setReadyToRender(true)
        return
      }
      catch(err)
      {
        if(err?.response?.status ==  401)
          router.push('/auth');
        else if(err?.response?.status == 500)
          window.location.pathname = '/500'
        return
      }
      
    }
    useEffect(() => {
      // ['/auth', ].includes(router.pathname)
      if(router.pathname !== '/auth'
      && router.pathname !== '/404' &&
      router.pathname !== '/403' &&
      router.pathname != '/505'
      && router.pathname !== '/auth/otpSms'
       && !router.pathname.includes('answer-page'))
          authentication();
      else
        setReadyToRender(true)
    },[])

      if (typeof window !== 'undefined') 
          window.removeEventListener('beforeunload',beforeUnloadHandler)
    
  return  <AuthContextProvider>
    <QueryClientProvider client={queryClient}>
      { readyToRender ? <Component {...pageProps} userData={UserData} /> :
      <div style={{ display : 'flex' , alignItems : 'center' , justifyContent : 'center' , height : '100vh' }}>
      <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#5360ED"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
          />
      </div>}
      </QueryClientProvider>
  </AuthContextProvider> 
}
