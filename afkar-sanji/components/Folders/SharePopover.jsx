import { SharePopoverContainer , SharePopoverButton } from '@/styles/folders/Popovers'
import { Icon } from '@/styles/icons'
import React from 'react'
import { useState } from 'react'


export const SharePopOverContent = ({ Questionnaire }) => {
  const [ CopiedState , setCopiedState ] = useState(false);
  return (
   
    <SharePopoverContainer>
      <p>از چه راهی میخواهید هم‌رسانی کنید؟</p>
      <div className='share_icon_container'>
          <div className='icon_container'>
          <a>
            <Icon name='Linkedin' />
          </a>
        </div >
        <div className='icon_container'>
          <a href={`https://www.instagram.com/accounts/login/?next=%2CodintoLine%2F`} target='_blank'>
            <Icon name='Instagram' />
          </a>
        </div>
        <div className='icon_container'>
          <a href='https://api.whatsapp.com/send?text=dsfsdfsdf' target='_blank'>
            <Icon name='Whatsapp'/>
          </a>
        </div>
        <div className='icon_container'>
          <a href={`https://eitaa.com/share/url?url=http://mah.ariomotion.com/questionnaire/${Questionnaire.uuid}/AnswerPage/&text=لطفا در این پرسشنامه شرکت کنید`} target='_blank'>
            <Icon name='Eaita'/>
          </a>
        </div>
      </div>
    <SharePopoverButton  onClick={() => {
      navigator.clipboard.writeText(`http://mah.ariomotion.com/questionnaire/${Questionnaire.uuid}/AnswerPage/`)
      setCopiedState(true);
      }}>
       { CopiedState ? <p>کپی شد</p> : <p>کپی لینک</p> }
    </SharePopoverButton>
  </SharePopoverContainer>
  )
}
