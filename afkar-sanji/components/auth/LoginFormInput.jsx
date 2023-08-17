import React, { useContext, useState } from 'react'
import OtpClasses from '@/styles/auth/LoginStyles.module.css'
import { LoginInput , InputBox, LoginErrorMessage , ClearLoginInputButton} from '@/styles/auth/Login';
import { AuthContext } from '@/utilities/AuthContext';

const LoginFormInput = ({ErrorHandler}) => {
  const LoginContext =  useContext(AuthContext);
  const [InputFocusState , SetFocusState ] = useState(false);
  const [ showClearState , SetClearState ] = useState(false);
  
  return (
    <>
    <InputBox className={ErrorHandler.message ? OtpClasses['input_error_occur'] : ''}
        focused={!InputFocusState ? 'true' : null}>
        <LoginInput type="number"
          name="phoneNumber"
          value={LoginContext.PhoneNumber ? LoginContext.PhoneNumber : ''}
          onFocus={() => SetFocusState(true)}
          onBlur={() => {
          SetFocusState(false)
          }}
          onChange={(e) =>  {
            !(e.target.value) ? SetClearState(false) : SetClearState(true)
            LoginContext.changePhone(e.target.value);
            ErrorHandler.SetNull(null);
          }}
          placeholder="09** *** ***" /> 
          {
          showClearState ? <ClearLoginInputButton onClick={() => LoginContext.changePhone(null)}>
          <i></i>
        </ClearLoginInputButton> : ''
          }
        </InputBox>
    {ErrorHandler.message ? <LoginErrorMessage> {ErrorHandler.message} </LoginErrorMessage> : ''}
    </>
  )
}
export default LoginFormInput;