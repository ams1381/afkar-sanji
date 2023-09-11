import React from 'react'
import { FormChildDiv } from '@/styles/auth/Login';

const LoginFormBody = ({ body_message }) => {
  return (
    <FormChildDiv>
        <p style={{ marginTop : 12 }}>!سلام</p>
        <p style={{ padding : '10px 0' }}>{body_message}</p>
    </FormChildDiv>
  )
}
export default LoginFormBody;