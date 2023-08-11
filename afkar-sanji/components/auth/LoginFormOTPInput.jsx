import React, { useContext } from 'react'
import OtpClasses from '@/styles/auth/LoginStyles.module.css'
import { InputBox, LoginErrorMessage, LoginInput } from '@/styles/auth/Login'
import { AuthContext } from '@/utilities/AuthContext'

export const LoginFormOTPInput = () => {
    const Auth = useContext(AuthContext);
  return (
    <>
    <InputBox>
            <LoginInput type="text"  name="otp_code" maxLength="5" required pattern="[0-9]{5}"
                placeholder="_ _ _ _ _"  />
                <span className={OtpClasses["resend_otp_sms"]}>
                    <p>ارسال دوباره</p>
            </span>
            <LoginErrorMessage />
        </InputBox>
        <div className={OtpClasses["otp_section"]}>
            <div className={OtpClasses["otp__timer"]}>
                <p>2:00</p>
            </div>
            <div className={OtpClasses["otp__change_number"]}>
                <i></i>
                {/* <p>{Auth.phoneNum ? Auth.phoneNum : ''}</p> */}
            </div>
        </div>
    </>
  )
}
