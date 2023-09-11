import React, { useContext, useState } from 'react';
import OtpClasses from '@/styles/auth/LoginStyles.module.css';
import {
  LoginInput,
  InputBox,
  LoginErrorMessage,
  ClearLoginInputButton,
} from '@/styles/auth/Login';
import { AuthContext } from '@/utilities/AuthContext';
import { NumberFormat } from 'react-hichestan-numberinput';
import * as persianTools from "@persian-tools/persian-tools";
import { digitsEnToFa } from "@persian-tools/persian-tools";

const LoginFormInput = ({ ErrorHandler , authentication}) => {
  const LoginContext = useContext(AuthContext);
  const [InputFocusState, SetFocusState] = useState(false);
  const [showClearState, SetClearState] = useState(false);

  const handleInputChange = (e) => {
    if(!e.target.value)
      SetClearState(false)
    else
      SetClearState(true)
    const inputValue = e.target.value;
    const persianValue = digitsEnToFa(inputValue);
    
    LoginContext.changePhone(persianValue); // Set Persian value in the state
    ErrorHandler.SetNull(null);
    
  };

  const handleKeyPress = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode !== 8 && (charCode < 48 || charCode > 57)) {
      e.preventDefault(); // Prevent entering non-numeric characters
    }
  };

  return (
    <>
      <InputBox
        className={ErrorHandler.message ? OtpClasses['input_error_occur'] : ''}
        focused={!InputFocusState ? 'true' : null}
      >
        <LoginInput
          type="text" // Change to "text" to allow Persian digits
          name="phoneNumber"
          value={LoginContext.PhoneNumber ? LoginContext.PhoneNumber : ''}
          onKeyDown={e => e.key == 'Enter' ? authentication(LoginContext.PhoneNumber) : ''} 
          onFocus={() => SetFocusState(true)}
          onBlur={() => {
            SetFocusState(false);
          }}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress} // Handle key press to prevent non-numeric characters
          placeholder={`${digitsEnToFa('09')} ** *** ***`}
        />
        {showClearState ? (
          <ClearLoginInputButton onClick={() => LoginContext.changePhone(null)}>
            <i></i>
          </ClearLoginInputButton>
        ) : (
          ''
        )}
      </InputBox>
      {ErrorHandler.message ? (
        <LoginErrorMessage> {ErrorHandler.message} </LoginErrorMessage>
      ) : (
        ''
      )}
    </>
  );
};

export default LoginFormInput;