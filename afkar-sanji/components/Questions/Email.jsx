import { Icon } from '@/styles/icons'
import { EmailInputContainer } from '@/styles/questionnairePanel/QuestionComponent'
import { Input } from 'antd'
import React from 'react'

const Email = () => {
  return (
    <EmailInputContainer>
        <Input type='email' placeholder='sample@sample.com' />
        <span>
            <Icon name='GrayEmail' style={{ width : 15 }} />
        </span>
    </EmailInputContainer>
  )
}
export default Email;
