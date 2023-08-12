import React, { useContext } from 'react'
import Login_form from './LoginForm';
import { LoginContainer , LoginHeaderText , LoginBox } from '@/styles/auth/Login';
import Classes from '@/styles/auth/LoginStyles.module.css'
import { AuthContext } from '@/utilities/AuthContext';


const Login_container = () => {
  const LoginContext =  useContext(AuthContext);

  return (
    <LoginContainer>
      <LoginBox>
            <div className="login_content">
                <div className={Classes ["login__header"]}>
                    <LoginHeaderText data_text="Afkar-Sanji" className={LoginContext.Login_Context_value.FormType == 'OTP_SMS' ? Classes['otp_header_text'] : ''}>
                        Afkar-Sanji
                      </LoginHeaderText>
                </div>
            </div>
            <Login_form/>
        </LoginBox>
        
    </LoginContainer>
  )
}
export default Login_container;
