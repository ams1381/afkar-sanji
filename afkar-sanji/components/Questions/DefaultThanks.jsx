import { Icon } from '@/styles/icons'
import { QuestionComponentContainer, QuestionDescription ,
     QuestionTitle } from '@/styles/questionnairePanel/QuestionComponent'
import { Button, Image } from 'antd'
import DefaultImage from '../../public/Images/DefaultThanks.png'
import React from 'react'

export const DefaultThanks = ({ mobilepreview }) => {
  return (
    <QuestionComponentContainer style={{ boxShadow : 'none' }} mobilepreview={mobilepreview}>
    <QuestionTitle>
            <p>صفحه‌ی تشکر پیش فرض</p>
        </QuestionTitle>
        <div className='thank_description'>
            <p>متن ساختگی برای صفحه‌ی تشکر رابط کاربری افکار سنجی</p>
        </div>
        <div className='uploaded_file_preview' style={{ margin : '1.5rem 0' }}>
            <Image width='100%' src={DefaultImage.src} />
            </div> 
            <div className='default_thanks_button_container'>
              <button>
                <p>کپی لینک</p>
              </button>
              <button>
                <Icon name='Share' />
              </button>
            </div>
           
    </QuestionComponentContainer>
  )
}
