import '@/styles/globals.css';
import AuthContextProvider, { AuthContext } from '@/utilities/AuthContext';
import { axiosInstance } from '@/utilities/axios';
import { message } from 'antd';
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { QueryClientProvider , QueryClient} from '@tanstack/react-query'
import { beforeUnloadHandler } from './questionnaire/[QuestionnaireID]'
import { setCookie } from 'react-use-cookie'
import { ThreeDots } from 'react-loader-spinner'
import ProgressBarLoading from "@/styles/ProgressBarLoading";
import {useLocalStorage} from "@/utilities/useLocalStorage";

export const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [ MessageApi , MessageContext ] = message.useMessage();
  const [ readyToRender , setReadyToRender ] = useState(false);
  const [ refreshedPage , setRefreshPage ] = useState(false);
  const [ UserData , setUserData ]= useState(null);
  // const [ phoneNum, setPhoneNumber ] = useCookie('numberPhone', null);
  axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + pageProps?.cookies?.access_token;
  axiosInstance.defaults.refresh_token = pageProps?.cookies?.refresh_token;

    const authentication = async () => {
      if (!pageProps.cookies || !pageProps.cookies.access_token) {
        window.location.pathname = '/auth'
        return;
      }
      try
      {
        let { data } = await axiosInstance.get('/user-api/users/me/');

        setUserData(data)
        setReadyToRender(true)
        setRefreshPage(true)
        return
      }
      catch(err)
      {
        if(err?.response?.status ==  500)
          MessageApi.error({
            content : 'مشکل سمت سرور'
          })
        else
        {
          setTimeout(() => {
            if(pageProps?.cookies?.access_token != axiosInstance.defaults.headers['Authorization'])
            {
              setReadyToRender(true)
            }
          },1000)
        }
        // return
      }
    }
    // console.log(readyToRender)
    useEffect(() => {
      setRefreshPage(false)
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
      <ProgressBarLoading />
      { readyToRender ? <>
      { refreshedPage && <RoleSetter setRefreshPage={setRefreshPage} UserData={UserData}/>}
      <Component {...pageProps} userData={UserData} />
      </>:
      <div style={{ display : 'flex' , alignItems : 'center' , justifyContent : 'center' , height : '100vh' }}>
        {MessageContext}
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
const RoleSetter = ({ UserData , setRefreshPage }) => {
  const { getItem , setItem } = useLocalStorage();

  const Auth = useContext(AuthContext);

  // Resume Identifier
  if(UserData.resume)
    Auth.setHasResume(true);
  else
    Auth.setHasResume(false);
  Auth.setIsAdmin(UserData.is_staff);
  if(getItem('roleReq'))
    Auth.setReqRole(getItem('roleReq'))
  else
    Auth.setReqRole('question-api/questionnaires')

  if(UserData.ask_for_interview_role)
    Auth.setAskForInterviewRole(true)

  // Auth.role = (UserData.role)
  setItem('role',UserData.role)
  // console.log(Auth)
  setRefreshPage(false)

  return <></>
}