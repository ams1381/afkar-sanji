import { Icon } from '@/styles/icons'
import { QuestionComponentContainer, QuestionDescription ,
     QuestionTitle } from '@/styles/questionnairePanel/QuestionComponent'
import { Button, Image } from 'antd'
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
            </div> 
            <div className='default_thanks_button_container'>
              <button>
                <p>کپی لینک</p>
              </button>
              <button>
                <Icon name='Share' />
              </button>
            </div>
            <div className='brand_button' >
                <Button type='primary'>
                  <p>ساخته شده با <span>ماح</span></p>
                </Button>
            </div>
    </QuestionComponentContainer>
  )
}
