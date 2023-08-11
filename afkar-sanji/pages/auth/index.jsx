import React, { useContext } from 'react'
import Login_container from '@/components/auth/LoginContainer'
import { AuthContext } from '@/utilities/AuthContext';

export const LoginPageContext = React.createContext();

const Auth_Main_Page = () => {
  const Auth = useContext(AuthContext);
  Auth.Login_Context_value = {
    FormBodyMessage : 'لطفا شماره همراهت را وارد کن',
    ButtonText : 'ارسال کد تایید',
    FormType : 'PhoneNumber'
  }
  const phone_confirm_handler = () => {
    
  }
  return (
      <Login_container />
  )
}
export default Auth_Main_Page;
