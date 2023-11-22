import { SharePopoverContainer , SharePopoverButton } from '@/styles/folders/Popovers'
import { Icon } from '@/styles/icons'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {baseurl} from "@/utilities/axios";


export const SharePopOverContent = ({ Questionnaire , UUID }) => {
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
          <a href={`https://eitaa.com/share/url?url=${baseurl}/questionnaire/${Questionnaire ? Questionnaire.uuid : UUID}/AnswerPage/&text=لطفا در این پرسشنامه شرکت کنید`} target='_blank'>
            <Icon name='Eaita'/>
          </a>
        </div>
      </div>
    <SharePopoverButton  onClick={() => {
      navigator.clipboard.writeText(`${baseurl}/questionnaire/${Questionnaire ? Questionnaire.uuid : UUID}/answer-page/`)
      setCopiedState(true);
      setTimeout(() => {
        setCopiedState(false);
      }, 3000); 
      }}>
       { CopiedState ? <p>کپی شد</p> : <p>کپی لینک</p> }
    </SharePopoverButton>
  </SharePopoverContainer>
  )
}
