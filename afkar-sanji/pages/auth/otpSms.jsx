import Login_container from '@/components/auth/LoginContainer';
import { AuthContext } from '@/utilities/AuthContext';
import { axiosInstance } from '@/utilities/axios';
import { message } from 'antd';
import { useRouter } from 'next/router';
import React, { useContext } from 'react'


const OTPSms = () => {
  const [LoginMessage, contextHolder] = message.useMessage();
  const router = useRouter();
  const Auth = useContext(AuthContext);
  Auth.Login_Context_value = {
    FormBodyMessage : 'لطفا کد ارسال شده را وارد کن',
    ButtonText : 'ثبت کد تایید',
    FormType : 'OTP_SMS'
  }

  Auth.Login_Function = async () => {
    const number_phone_res = await axiosInstance.post('/user-api/auth/verify-otp/' , { 'token' : Auth.SMSCode , 'phone_number' : Auth.PhoneNumber });
    if(number_phone_res.status == 201) 
    {
      LoginMessage.success({
        content : 'ورود با موفقیت انجام شد' ,
        duration : 4
      })
      Auth.cookie = number_phone_res.data.access;
      router.push("/folders")
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
    {contextHolder}
    <Login_container />
    </>
   
  )
}
export default OTPSms;
