import Login_container from '@/components/auth/LoginContainer';
import { AuthContext } from '@/utilities/AuthContext';
import { axiosInstance } from '@/utilities/axios';
import { useLocalStorage } from '@/utilities/useLocalStorage';
import { message } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext } from 'react'


const OTPSms = () => {
  const [LoginMessage, contextHolder] = message.useMessage();
  const { setItem } = useLocalStorage();
  const router = useRouter();
  const Auth = useContext(AuthContext);
  Auth.Login_Context_value = {
    FormBodyMessage : 'لطفا کد ارسال شده را وارد کن',
    ButtonText : 'ثبت کد تایید',
    FormType : 'OTP_SMS'
  }

  Auth.Login_Function = async () => {
    const otp_res = await axiosInstance.post('/user-api/auth/verify-otp/' , { 'token' : Auth.SMSCode , 'phone_number' : Auth.PhoneNumber });
    if(otp_res.status == 201) 
    {
      LoginMessage.success({
        content : 'ورود با موفقیت انجام شد' ,
        duration : 4
      })
      setItem('phoneNumber',Auth.PhoneNumber);
      setItem('cookie',otp_res.data.access);
      axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + otp_res.data.access;

      setTimeout(() => {
        router.push("../")
      },2000)
      
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
    <Login_container />
    </>
   
  )
}
export default OTPSms;
