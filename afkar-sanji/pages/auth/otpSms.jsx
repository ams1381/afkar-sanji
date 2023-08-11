import Login_container from '@/components/auth/LoginContainer';
import { AuthContext } from '@/utilities/AuthContext';
import React, { useContext } from 'react'


const OTPSms = () => {
  const Auth = useContext(AuthContext);
  Auth.Login_Context_value = {
    FormBodyMessage : 'لطفا کد ارسال شده را وارد کن',
    ButtonText : 'ثبت کد تایید',
    FormType : 'OTP_SMS'
  }
  return (
    <Login_container />
  )
}
export default OTPSms;
