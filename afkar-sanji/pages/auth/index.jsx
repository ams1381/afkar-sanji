import React, { useContext } from 'react'
import Login_container from '@/components/auth/LoginContainer'
import { AuthContext } from '@/utilities/AuthContext';
import { axiosInstance } from '@/utilities/axios';
import { useRouter } from 'next/router';
import { message } from 'antd';

export const LoginPageContext = React.createContext();

const Auth_Main_Page = () => {
  const [LoginMessage, contextHolder] = message.useMessage()
  const router = useRouter();
  const Auth = useContext(AuthContext);
  Auth.Login_Context_value = {
    FormBodyMessage : 'لطفا شماره همراهت را وارد کن',
    ButtonText : 'ارسال کد تایید',
    FormType : 'PhoneNumber'
  }
  Auth.Login_Function = async () => {
    const number_phone_res = await axiosInstance.post('/user-api/auth/gateway/' , { phone_number : Auth.PhoneNumber });
    if(number_phone_res.status == 201)
    {
      localStorage.setItem('phoneNumber',Auth.PhoneNumber)
      router.push('auth/otpSms/') 
    }
    else 
    {
      LoginMessage.error({
      content : 'مشکلی پیش آمده' ,
      duration : 4
    });
    }
   }
  // const phone_confirm_handler = async () => {
  //  await axiosInstance.post('/user-api/auth/gateway/')
  // }
  return (
    <>
      {contextHolder}
      <Login_container />
    </>
      
  )
}
export default Auth_Main_Page;
