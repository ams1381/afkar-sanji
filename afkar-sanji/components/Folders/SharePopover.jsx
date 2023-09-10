import { SharePopoverContainer , SharePopoverButton } from '@/styles/folders/Popovers'
import { Icon } from '@/styles/icons'
import React from 'react'
import { useState } from 'react'


export const SharePopOverContent = () => {
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
          <a>
            <Icon name='Instagram' />
          </a>
        </div>
        <div className='icon_container'>
          <a>
            <Icon name='Whatsapp'/>
          </a>
        </div>
        <div className='icon_container'>
          <a>
            <Icon name='Eaita'/>
          </a>
        </div>
      </div>
    <SharePopoverButton  onClick={() => {
      navigator.clipboard.writeText('لینک پرسشنامه مثلا')
      setCopiedState(true);
      }}>
       { CopiedState ? <p>کپی شد</p> : <p>کپی لینک</p> }
    </SharePopoverButton>
  </SharePopoverContainer>
  )
}
