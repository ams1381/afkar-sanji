import Login_container from '@/components/auth/LoginContainer';
import ProgressBarLoading from '@/styles/ProgressBarLoading';
import { AuthContext } from '@/utilities/AuthContext';
import { axiosInstance } from '@/utilities/axios';
import { useLocalStorage } from '@/utilities/useLocalStorage';
import { message } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import persianNumberMin from 'persian-number';
import React, { useContext } from 'react'
import {getCookie, setCookie} from 'react-use-cookie';

const OTPSms = ({ cookies }) => {
  if(!getCookie('numberPhone'))
    window.location.pathname = '/auth'
  const [LoginMessage, contextHolder] = message.useMessage();
  delete axiosInstance.defaults.headers['Authorization'];

  const { setItem , removeItem } = useLocalStorage();
  const router = useRouter();
  const Auth = useContext(AuthContext);
  Auth.Login_Context_value = {
    FormBodyMessage : 'لطفا کد ارسال شده را وارد کن',
    ButtonText : 'ثبت کد تایید',
    FormType : 'OTP_SMS'
  }

  Auth.Login_Function = async (value) => {
    const otp_res = await axiosInstance.post('/user-api/auth/verify-otp/' , {
       'token' : persianNumberMin.convertPeToEn(value) ,
       'phone_number' : persianNumberMin.convertPeToEn(Auth.PhoneNumber) }
       );
    let MeRes = await axiosInstance.get('/user-api/users/me/',{
      headers : {
        Authorization : 'Bearer ' + otp_res.data.access
      }
    });
    if(otp_res.status === 201 && MeRes.status === 200)
    {
      LoginMessage.success({
        content : 'ورود با موفقیت انجام شد' ,
        duration : 10,
        style : {
          fontFamily : 'IRANSans',
          display : 'flex',
          alignItems : 'center',
          justifyContent : 'center'
        }
      })

      setTimeout(() => {
        setCookie('role','regular-user');
        setItem('roleReq','question-api/questionnaires')
        Auth.setIsAdmin(MeRes?.data?.is_staff);
        if(MeRes?.data?.resume)
          Auth.setHasResume(true)
        if(MeRes?.data?.ask_for_interview_role)
          Auth.setAskForInterviewRole(true)
        if(MeRes?.data?.has_wallet)
          Auth.setHasWallet(true)
          Auth.setUserRole(MeRes?.data.role)
          setItem('role',MeRes?.data.role)

        const returnUrl = router.query.returnUrl || '/';
        typeof window !== 'undefined' ? router.push(returnUrl)  : ''
      },3000)
    }
    else
    {
      LoginMessage.error({
        content : 'مشکلی پیش آمده' ,
        duration : 4
      });
    }
   }

  return (
    <>
    <Head>
        <title>Afkar Sanji</title>
    </Head>
    {contextHolder}
    <ProgressBarLoading />
    <Login_container />
    </>
   
  )
}

export default OTPSms;

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = req.headers.cookie;
  // Check if cookies are present
  if (cookies) {
    // Parse the cookies
    const parsedCookies = cookies.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});

    return {
      props: {
        cookies: parsedCookies,
      },
    };
  }


  return {
    props: {
      cookies: null,
    },
  };
}