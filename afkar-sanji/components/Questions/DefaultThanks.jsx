import { QuestionComponentContainer, QuestionDescription ,
     QuestionTitle } from '@/styles/questionnairePanel/QuestionComponent'
import { Image } from 'antd'
import React from 'react'

export const DefaultThanks = () => {
  return (
    <QuestionComponentContainer style={{ boxShadow : 'none' }}>
    <QuestionTitle>
            <p>صفحه‌ی تشکر پیش فرض</p>
        </QuestionTitle>
        <div className='uploaded_file_preview' style={{ margin : '1.5rem 0' }}>
            </div> 
        <QuestionDescription>
            <p>متن ساختگی برای صفحه‌ی تشکر رابط کاربری افکار سنجی</p>
        </QuestionDescription>
    </QuestionComponentContainer>
  )
}
