import React, { useContext } from 'react'
import { LoginInput , InputBox, LoginErrorMessage , ClearLoginInputButton} from '@/styles/auth/Login';
import { AuthContext } from '@/utilities/AuthContext';

const LoginFormInput = () => {
  const LoginContext =  useContext(AuthContext);

  console.log(LoginContext.PhoneNumber)
  return (
    <InputBox>
            <LoginInput type="number"
             name="phoneNumber"
             value={LoginContext.PhoneNumber ? LoginContext.PhoneNumber : ''}
             onChange={(e) => LoginContext.changePhone(e.target.value)}
             placeholder="09** *** ***" /> 
            <ClearLoginInputButton>
                <i></i>
            </ClearLoginInputButton>
            <LoginErrorMessage />
        </InputBox>
  )
}
export default LoginFormInput;