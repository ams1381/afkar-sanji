import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import OtpClasses from '@/styles/auth/LoginStyles.module.css'
import { ClearLoginInputButton, InputBox, LoginErrorMessage, LoginInput } from '@/styles/auth/Login'
import { AuthContext } from '@/utilities/AuthContext'
import { CountdownProps , Statistic } from 'antd';
import { useRouter } from 'next/router'
import { axiosInstance } from '@/utilities/axios'
import { useLocalStorage } from '@/utilities/useLocalStorage';

export const LoginFormOTPInput = ({ErrorHandler}) => {
    const Router = useRouter();
    const [ timeOutState , ChangeTimeOutState]  = useState(false);
    const { getItem } = useLocalStorage();
    const [ timer , SetTimer ] = useState(60);
    const [InputFocusState , SetFocusState ] = useState(false);
    const CountDown = Statistic.Countdown;
    const LoginContext =  useContext(AuthContext);

    useEffect(() => {
        LoginContext.ChangeOTP(null);
        if (typeof window !== 'undefined') {
            LoginContext.changePhone(getItem('phoneNumber'));
          }
    },[])
    setTimeout(() => {
        if(timer == 0)
        {
            clearTimeout(this);
            ChangeTimeOutState(true)
            return
        }
        SetTimer(timer - 1)

    },1000);
    
    const resend_sms = async () => {
        try 
        {
            await axiosInstance.post('/user-api/auth/gateway/', { phone_number : LoginContext.PhoneNumber })
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
    }
    const input_change_handler = async (e) => {
        if(e.target.value.length > 5)
            return
        LoginContext.ChangeOTP(e.target.value);
        ErrorHandler.SetNull(null);
    }
  return (
    <>
    <InputBox className={ErrorHandler.message ? OtpClasses['input_error_occur'] : '' }
        focused={!InputFocusState ? 'true' : null}>
        <LoginInput type="number"  name="otp_code" maxLength="5" 
        
        
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
                timeOutState ? <span className={OtpClasses["resend_otp_sms"]} onClick={resend_sms}>
                <p>ارسال دوباره</p>
            </span>
                : <ClearLoginInputButton onClick={() => LoginContext.ChangeOTP(null)}>
                    <i></i>
                </ClearLoginInputButton>
            }
    </InputBox>
    {ErrorHandler.message ? <LoginErrorMessage>
                    {ErrorHandler.message}
            </LoginErrorMessage> : ''}
    <div className={OtpClasses["otp_section"]}>
        <div className={OtpClasses["otp__timer"]}>
            <CountDown 
            format='mm:ss' 
            value={!timeOutState ? (Date.now() + timer * 1000 ) : null}
            valueStyle = {{ color : 'var(--primary-color)' , fontSize : 16 }}
            onFinish={() => ChangeTimeOutState(true)}
                />
        </div>
        <div className={OtpClasses["otp__change_number"]} onClick={() => Router.push('./')}>
            <i></i>
            <p>{LoginContext.PhoneNumber ? LoginContext.PhoneNumber : ''}</p>
        </div>
    </div>
    </>
  )
}
