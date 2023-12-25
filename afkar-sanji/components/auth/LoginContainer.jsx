import React, { useContext, useEffect, useState } from 'react'
import Login_form from './LoginForm';
import {
    LoginContainer,
    LoginBox,
    LeftLight,
    RightLight,
    TextProgress,
    TextInnerProgress, MonadaLogoContainer
} from '@/styles/auth/Login';
import Classes from '@/styles/auth/LoginStyles.module.css'
import { AuthContext } from '@/utilities/AuthContext';
import {Icon} from "@/styles/icons";

const Login_container = () => {
  const LoginContext =  useContext(AuthContext);
  const [ isLoggedIn , setIsLoggedIn ] = useState(false);
  const [ otpHalfFill , setOtpHalfFill ] = useState(false);


  useEffect(() => {
    if(LoginContext.Login_Context_value.FormType == 'OTP_SMS')
    {
      setTimeout(() => {
        setOtpHalfFill(true);
      }, 200);
    }
  },[])
    // isLoggedIn ? 'true' : null

  return (
    <LoginContainer filltext={isLoggedIn ? 'true' : null}>
      <LeftLight filltext={isLoggedIn ? 'true' : null} />
      <LoginBox filltext={isLoggedIn ? 'true' : null}>
            <div className="login_content">
                <div className={Classes ["login__header"]}>
                    <MonadaLogoContainer>
                        <Icon style={{ width : 160 , height : 160 }} name={'monada'} />
                        <TextProgress windowWidth={window.innerWidth} filltext={isLoggedIn ? 'true' : null}>
                            مرکز افکارسنجی منادا
                            <TextInnerProgress filltext={isLoggedIn ? 'true' : null}
                                               halffill={otpHalfFill ? 'active' : null}>
                                مرکز افکارسنجی منادا
                            </TextInnerProgress>
                        </TextProgress>
                    </MonadaLogoContainer>
                </div>
            </div>
            {!isLoggedIn ? <Login_form setLoggedIn={() => setIsLoggedIn(true)} /> : ''}
            
        </LoginBox>
       <RightLight filltext={isLoggedIn ? 'true' : null}/>
    </LoginContainer>
  )
}
export default Login_container;

