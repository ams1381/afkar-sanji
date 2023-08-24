import { EmailInputContainer } from '@/styles/questionnairePanel/QuestionComponent'
import { Input } from 'antd'
import React from 'react'

export const Number = ({ QuestionInfo }) => {
  return (
    <EmailInputContainer>
        <Input type='number' style={{ fontFamily : 'IRANSans' }}
         placeholder={!(QuestionInfo.min == 0 && QuestionInfo.max == 0) ? `از ${QuestionInfo.min} تا ${QuestionInfo.max}` : 'یک عدد وارد کنید'} />
    </EmailInputContainer>
  )
}
