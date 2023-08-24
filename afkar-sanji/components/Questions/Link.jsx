import { EmailInputContainer } from '@/styles/questionnairePanel/QuestionComponent'
import { Input } from 'antd'
import React from 'react'

export const Link = () => {
  return (
    <EmailInputContainer>
        <Input type='email' placeholder='www.google.com' />
    </EmailInputContainer>
  )
}
