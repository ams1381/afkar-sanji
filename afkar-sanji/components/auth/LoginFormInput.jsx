import React, { useContext, useState } from 'react'
import OtpClasses from '@/styles/auth/LoginStyles.module.css'
import { LoginInput , InputBox, LoginErrorMessage , ClearLoginInputButton} from '@/styles/auth/Login';
import { AuthContext } from '@/utilities/AuthContext';

const LoginFormInput = ({ErrorHandler}) => {
  const LoginContext =  useContext(AuthContext);
  const [InputFocus , SetFocus ] = useState(false);
  const [ showClear , SetClear ] = useState(false);

  return (
    <>
    <InputBox className={ErrorHandler.message ? OtpClasses['input_error_occur'] : ''}
            focused={!InputFocus ? 'true' : null}>
            <LoginInput type="number"
             name="phoneNumber"
             value={LoginContext.PhoneNumber ? LoginContext.PhoneNumber : ''}
             onFocus={() => SetFocus(true)}
             onBlur={() => {
              SetFocus(false)
             }}
             onChange={(e) =>  {
              SetClear(true);
              LoginContext.changePhone(e.target.value);
              ErrorHandler.SetNull(null);
             }}
             placeholder="09** *** ***" /> 
             {
              showClear ? <ClearLoginInputButton onClick={() => LoginContext.changePhone(null)}>
              <i></i>
            </ClearLoginInputButton> : ''
             }
                
            
            
        </InputBox>
    {ErrorHandler.message ? <LoginErrorMessage>
                     {ErrorHandler.message}
              </LoginErrorMessage> : ''}
    </>
    

  )
}
export default LoginFormInput;