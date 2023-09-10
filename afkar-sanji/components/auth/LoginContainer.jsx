import React, { useContext, useEffect, useRef, useState } from 'react'
import Login_form from './LoginForm';
import { LoginContainer , LoginHeaderText , LoginBox, LeftLight, RightLight } from '@/styles/auth/Login';
import Classes from '@/styles/auth/LoginStyles.module.css'
import { AuthContext } from '@/utilities/AuthContext';


const Login_container = () => {
  const LoginContext =  useContext(AuthContext);
  const [ isLoggedIn , setIsLoggedIn ] = useState(false);
  const [ otpHalfFill , setOtpHalfFill ] = useState(false);
  const HeaderText= useRef(null)

  useEffect(() => {
    if(LoginContext.Login_Context_value.FormType == 'OTP_SMS')
    {
      setTimeout(() => {
        setOtpHalfFill(true);
      }, 200);
    }

    
  },[])
    
  return (
    <LoginContainer filltext={isLoggedIn ? 'true' : null}>
      <LeftLight filltext={isLoggedIn ? 'true' : null} />
      <LoginBox>
            <div className="login_content">
                <div className={Classes ["login__header"]}>
                    <LoginHeaderText filltext={isLoggedIn ? 'true' : null} ref={HeaderText}
                    halffill={otpHalfFill ? 'active' : null}
                     data_text="AfkarSanji" >
                        AfkarSanji
                      </LoginHeaderText>
                </div>
            </div>
            {!isLoggedIn ? <Login_form setLoggedIn={() => setIsLoggedIn(true)} /> : ''}
            
        </LoginBox>
       <RightLight filltext={isLoggedIn ? 'true' : null}/>
    </LoginContainer>
  )
}
export default Login_container;

