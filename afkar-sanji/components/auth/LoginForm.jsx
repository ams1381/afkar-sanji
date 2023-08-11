import React, { useContext, useState } from 'react'
import LoginFormHeader from './LoginFormHeader';
import LoginFormBody from './LoginFormBody';
import LoginFormInput from './LoginFormInput';
import StyleModules from '@/styles/auth/LoginStyles.module.css'
import {  LoginForm} from '@/styles/auth/Login';
import { LoginFormOTPInput } from './LoginFormOTPInput';
import { AuthContext } from '@/utilities/AuthContext';
import { Button , ConfigProvider , Space} from 'antd';
import { ButtonThemeContext, themeContext } from '@/utilities/ThemeContext';


export const Login_form = () => {
  const [ loadingState , setLoading ] = useState(false)
  const LoginContext =  useContext(AuthContext);

  return (
    <LoginForm>
                <LoginFormHeader title="ورود با رمز یکبار مصرف" />
                <LoginFormBody body_message={LoginContext.Login_Context_value.FormBodyMessage} />
                <div>
                  { LoginContext.Login_Context_value.FormType == 'PhoneNumber' ? <LoginFormInput /> : <LoginFormOTPInput /> }
                  <ConfigProvider theme={themeContext}>
                      <Button className={StyleModules['confirm_button']} type="primary" loading={loadingState}>
                            {LoginContext.Login_Context_value.ButtonText}
                        </Button>
                  </ConfigProvider>
                    
                </div>
            </LoginForm>
  )
}
export default Login_form;