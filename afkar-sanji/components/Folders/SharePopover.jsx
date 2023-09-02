import { SharePopoverContainer , SharePopoverButton } from '@/styles/folders/Popovers'
import { Icon } from '@/styles/icons'
import React from 'react'


export const SharePopOverContent = () => {
  return (
    <>
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
    
  </SharePopoverContainer>
  <SharePopoverButton  onClick={() => navigator.clipboard.writeText('لینک پرسشنامه مثلا')}>
    کپی لینک
  </SharePopoverButton>
    </>
    
  )
}
