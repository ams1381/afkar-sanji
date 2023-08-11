import React from 'react'
import { FormChildDiv } from '@/styles/auth/Login';

const LoginFormBody = ({ body_message }) => {
  return (
    <FormChildDiv>
        <p>سلام</p>
        <p>{body_message}</p>
    </FormChildDiv>
  )
}
export default LoginFormBody;