import { Icon } from '@/styles/icons'
import { QuestionComponentContainer, QuestionDescription ,
     QuestionTitle } from '@/styles/questionnairePanel/QuestionComponent'
import { Button, Image, Popover } from 'antd'
import DefaultImage from '../../public/Images/DefaultThanks.png'
import React, { useState } from 'react'
import { SharePopOverContent } from '../Folders/SharePopover'

export const DefaultThanks = ({ mobilepreview , QuestionnaireInfo  }) => {
  const [ copiedState , setCopiedState ] = useState(false);
  const [ sharePopoverState , setSharePopoverState ] = useState(false);

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
              <button onClick={() => {
                navigator.clipboard.writeText(`http://mah.ariomotion.com/questionnaire/${QuestionnaireInfo.uuid}/AnswerPage/`)
                setCopiedState(true);
                }}>
             { copiedState ? <p>کپی شد</p> : <p>کپی لینک</p>}
              </button>
              <button onClick={() => setSharePopoverState(!sharePopoverState)}>
                <Popover open={sharePopoverState}
                onOpenChange={() => setSharePopoverState(false)}
                content={<SharePopOverContent Questionnaire={QuestionnaireInfo} />}
                />
                <Icon name='Share' />
              </button>
            </div>
           
    </QuestionComponentContainer>
  )
}
