import React from 'react'
import Login_form from './LoginForm';
import { LoginContainer , LoginHeaderText , LoginBox } from '@/styles/auth/Login';
import Classes from '@/styles/auth/LoginStyles.module.css'
const Login_container = () => {
  return (
    <LoginContainer>
        <LoginBox>
            <div className="login_content">
                <div className={Classes ["login__header"]}>
                    <LoginHeaderText data_text="Afkar-Sanji">Afkar-Sanji</LoginHeaderText>
                </div>
            </div>
            <Login_form/>
        </LoginBox>
    </LoginContainer>
  )
}
export default Login_container;
