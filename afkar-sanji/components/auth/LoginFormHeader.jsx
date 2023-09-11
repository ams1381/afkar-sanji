import React from 'react'
import { FormChildDiv } from '@/styles/auth/Login';

export const LoginFormHeader = ({ Title }) => {
  return (
    <FormChildDiv>
            <div style={{ color : 'var(--Neutral-Gray9)' , padding : '10px 0' , marginTop : 20}}>
                <p>ورود یا عضویت</p>
            </div>
      </FormChildDiv>
  )
}
export default LoginFormHeader;
