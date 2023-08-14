import React, { useContext, useEffect, useState } from 'react'
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

export const Login_form = () => {
  const [ loadingState , setLoading ] = useState(false);
  const [ errMessage , setErMessage ] = useState(null);
  const [messageApi, contextHolder] = message.useMessage()
  const LoginContext =  useContext(AuthContext);
  
  useEffect(() => {
    if(typeof window !== 'undefined') 
      LoginContext.changePhone(localStorage.getItem('phoneNumber'))
  },[])
  const authentication = async (e) => {
    setLoading(true)
    try 
    {
      let form_input = LoginContext.Login_Context_value.FormType == 'PhoneNumber' ? LoginContext.PhoneNumber : LoginContext.SMSCode;
      if(AuthValidator(form_input,LoginContext.Login_Context_value.FormType))
        throw AuthValidator(form_input,LoginContext.Login_Context_value.FormType)
      
      await LoginContext.Login_Function(e);
    }
    catch(error)
    {
      console.log(error)
      if(typeof error == 'string')
        setErMessage(error)
      if(typeof error == 'object')
        setErMessage(error.response.data[0])
      // if(typeof error != 'string' && Array.isArray(error.response.data))
      //   setErMessage(error.response.data[0])
      // else
      //   setErMessage(error)
    }
    finally
    {
      setLoading(false)
    }
  }
  return (
    <LoginForm>
      {contextHolder}
        <LoginFormHeader title="ورود با رمز یکبار مصرف" />
        <LoginFormBody body_message={LoginContext.Login_Context_value.FormBodyMessage} />
        <div>
          { LoginContext.Login_Context_value.FormType == 'PhoneNumber' ? 
          <LoginFormInput ErrorHandler={{message : errMessage , SetNull : setErMessage}}/> :
            <LoginFormOTPInput ErrorHandler={{message : errMessage , SetNull : setErMessage}} /> 
          }
          <ConfigProvider theme={themeContext}>
              <Button onClick={authentication} className={StyleModules['confirm_button']} type="primary" loading={loadingState}>
                    {LoginContext.Login_Context_value.ButtonText}
                </Button>
          </ConfigProvider>
        </div>
    </LoginForm>
  )
}
export default Login_form;