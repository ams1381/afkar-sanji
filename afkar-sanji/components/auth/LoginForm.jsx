import React, { useContext, useEffect, useRef, useState } from 'react'
import LoginFormHeader from './LoginFormHeader';
import LoginFormBody from './LoginFormBody';
import LoginFormInput from './LoginFormInput';
import StyleModules from '@/styles/auth/LoginStyles.module.css'
import {  LoginForm} from '@/styles/auth/Login';
import { LoginFormOTPInput } from './LoginFormOTPInput';
import { AuthContext } from '@/utilities/AuthContext';
import { Button , ConfigProvider , message } from 'antd';
import { themeContext } from '@/utilities/ThemeContext';
import { AuthValidator } from '@/utilities/AuthValidators';
import persianNumberMin from 'persian-number';

export const Login_form = ({ setLoggedIn }) => {
  const [ loadingState , setLoading ] = useState(false);
  const [ errMessage , setErMessage ] = useState(null);
  const [messageApi, contextHolder] = message.useMessage()
  const LoginContext =  useContext(AuthContext);
  const InputRef = useRef(null)
  
  useEffect(() => {
      window.addEventListener('keypress',(e) => {
        if(e.key == 'Enter')
          e.preventDefault();
      })
  },[])
  const authentication = async (value) => {
    setLoading(true)
    try 
    {
      let form_input = LoginContext.Login_Context_value.FormType == 'PhoneNumber' ? 
      persianNumberMin.convertPeToEn(LoginContext.PhoneNumber) : persianNumberMin.convertPeToEn(value);
      if(AuthValidator(form_input,LoginContext.Login_Context_value.FormType))
        throw AuthValidator(form_input,LoginContext.Login_Context_value.FormType)
      
      await LoginContext.Login_Function(value);
      if(LoginContext.Login_Context_value.FormType == 'OTP_SMS')
        setLoggedIn();
    }
    catch(error)
    {
      if(typeof error == 'string')
        setErMessage(error)
      if(typeof error == 'object' && error.response)
        setErMessage(error.response.data[0].split('.')[0])
        
    }
    finally
    {
      setLoading(false)
    }
  }
  return (
    <LoginForm onSubmit={authentication}>
      {contextHolder}
        <LoginFormHeader title="ورود با رمز یکبار مصرف" />
        <LoginFormBody body_message={LoginContext.Login_Context_value.FormBodyMessage} />
        <div>
          { LoginContext.Login_Context_value.FormType == 'PhoneNumber' ? 
          <LoginFormInput ErrorHandler={{message : errMessage , SetNull : setErMessage}}/> :
            <LoginFormOTPInput  ErrorHandler={{message : errMessage , SetNull : setErMessage}} authentication={authentication}  /> 
          }
          <ConfigProvider theme={themeContext}>
              <Button typeof='submit' onClick={authentication} className={StyleModules['confirm_button']} type="primary" loading={loadingState}>
                    {LoginContext.Login_Context_value.ButtonText}
                </Button>
          </ConfigProvider>
        </div>
    </LoginForm>
  )
}
export default Login_form;