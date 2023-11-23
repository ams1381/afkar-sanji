import React, {useContext, useEffect, useRef, useState} from 'react'
import OtpClasses from '@/styles/auth/LoginStyles.module.css'
import { ClearLoginInputButton, InputBox, LoginErrorMessage, LoginInput } from '@/styles/auth/Login'
import { AuthContext } from '@/utilities/AuthContext'
import {  Button, Statistic, message } from 'antd';
import { useRouter } from 'next/router'
import { axiosInstance } from '@/utilities/axios'
import { useLocalStorage } from '@/utilities/useLocalStorage';
import { digitsEnToFa } from "@persian-tools/persian-tools";
import * as persianTools from "@persian-tools/persian-tools";
import { getCookie } from 'react-use-cookie';

export const LoginFormOTPInput = ({ErrorHandler , authentication}) => {
    const Router = useRouter();
    const [ timeOutState , ChangeTimeOutState]  = useState(false);
    const { getItem } = useLocalStorage();
    const [messageApi, contextHolder] = message.useMessage()
    const [ timer , SetTimer ] = useState(60);
    const [InputFocusState , SetFocusState ] = useState(false);
    const [ showClearState , SetClearState ] = useState(false);
    const CountDown = Statistic.Countdown;
    const [timeRemaining, setTimeRemaining] = useState(60);
    const [ resendLoading , SetResendLoading ] = useState(false);
    const LoginContext =  useContext(AuthContext);
    const InputRef = useRef();

    useEffect(() => {
        LoginContext.ChangeOTP(null);
        if (typeof window !== 'undefined') {
            LoginContext.changePhone(getCookie('numberPhone'));
          }
    },[])
    useEffect(() => {
        if (!timeOutState && timer > 0) {
          const interval = setInterval(() => {
            SetTimer(prevTimer => prevTimer - 1);
          }, 1000);
    
          return () => clearInterval(interval);
        } else if (timer === 0) {
          ChangeTimeOutState(true);
        }
      }, [timeOutState, timer]);
    
    const resend_sms = async () => {
        axiosInstance.defaults.headers['Content-Type'] = 'application/json';
        try 
        {
            SetResendLoading(true)
            await axiosInstance.post('/user-api/auth/gateway/', {
                 phone_number : persianTools.digitsFaToEn(LoginContext.PhoneNumber)
            })
            ChangeTimeOutState(false);
            SetTimer(60)
        }
        catch(error)
        {
            messageApi.error({
                content : error.response.data,
                duration : 4
        })
        }
        finally
        {
            SetResendLoading(false)
        }
    }
    const input_change_handler = async (e) => {
        const inputValue = e.target.value;
        const persianValue = digitsEnToFa(inputValue);
      
        // Allow only Persian numeric characters
        const validValue = persianValue.replace(/[^۰-۹]/g, '');
      
        if (validValue.length > 5) {
          return;
        }
      
        LoginContext.ChangeOTP(validValue);
        ErrorHandler.SetNull(null);
        
        if (!validValue) {
          SetClearState(false);
        } else {
          SetClearState(true);
        }
      
        if (validValue.length === 5) {
          authentication(validValue);
        }
      };
      const convertToPersianNumbers = (number) => {
        return digitsEnToFa(number.toString());
      };
  return (
    <>
    <InputBox  className={ErrorHandler.message ? OtpClasses['input_error_occur'] : '' }
        focused={!InputFocusState ? 'true' : null}>
        <LoginInput type="text" autoFocus={true} name="otp_code" maxLength="5"
        disabled={timeOutState}
        
        required pattern="[0-9]{5}"
        value={LoginContext.SMSCode ? LoginContext.SMSCode : ''}
            placeholder="_ _ _ _ _" 
            onChange={input_change_handler}
            onFocus={() => SetFocusState(true)}
            onBlur={() => {
            SetFocusState(false)
            }}
            className={OtpClasses['otp_input']} 
            />
            {
                timeOutState ? <span className='resend_button_container'><Button loading={resendLoading} className={OtpClasses["resend_otp_sms"]} onClick={resend_sms}>
                <p>ارسال دوباره</p>
            </Button></span>
                : showClearState ?  <ClearLoginInputButton onClick={() => LoginContext.ChangeOTP(null)}>
                    <i></i>
                </ClearLoginInputButton> : ''
            }
    </InputBox>
    {ErrorHandler.message ? <LoginErrorMessage>
                    {ErrorHandler.message}
            </LoginErrorMessage> : ''}
    <div className={OtpClasses["otp_section"]}>
        <div className={OtpClasses["otp__timer"]}>
        {!timeOutState ? (
            <span>
            {
               (timer == 60) ? 
               <>{digitsEnToFa(0)}{digitsEnToFa(1)}:{digitsEnToFa(0)}{digitsEnToFa(0)}</> : (timer != 60) &&
              Math.floor(timer / 60) < 1 ? digitsEnToFa(0) + '' + digitsEnToFa(Math.floor(timer / 60)) : ''
              }{(timer != 60) && ':'}
            {(timer != 60) && (timer % 60) >= 10 ? digitsEnToFa(timer % 60) : (timer != 60) ? digitsEnToFa(0) +  digitsEnToFa((timer % 60)) : ''}
            </span>
          ) : (
            ''
          )}
        </div>
        <div className={OtpClasses["otp__change_number"]} onClick={() => {
            typeof window !== 'undefined' ? Router.push('./') : ''
            }}>
            <i></i>
            <p>{LoginContext.PhoneNumber ? LoginContext.PhoneNumber : ''}</p>
        </div>
    </div>
    </>
  )
}