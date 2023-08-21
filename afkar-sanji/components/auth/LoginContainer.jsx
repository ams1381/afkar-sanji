import React, { useContext, useEffect, useRef, useState } from 'react'
import Login_form from './LoginForm';
import { LoginContainer , LoginHeaderText , LoginBox } from '@/styles/auth/Login';
import Classes from '@/styles/auth/LoginStyles.module.css'
import { AuthContext } from '@/utilities/AuthContext';


const Login_container = () => {
  const LoginContext =  useContext(AuthContext);
  const [ isLoggedIn , setIsLoggedIn ] = useState(false);
  const HeaderText= useRef(null)

  return (
    <LoginContainer filltext={isLoggedIn ? 'true' : null}>
      <LoginBox>
            <div className="login_content">
                <div className={Classes ["login__header"]}>
                    <LoginHeaderText filltext={isLoggedIn ? 'true' : null} ref={HeaderText}
                    halfFill={LoginContext.Login_Context_value.FormType == 'OTP_SMS' ? 'active' : null}
                     data_text="AfkarSanji" >
                        AfkarSanji
                      </LoginHeaderText>
                </div>
            </div>
            {!isLoggedIn ? <Login_form setLoggedIn={() => setIsLoggedIn(true)} /> : ''}
            
        </LoginBox>
        
    </LoginContainer>
  )
}
export default Login_container;

