import { SharePopoverContainer , SharePopoverButton } from '@/styles/folders/Popovers'
import { Icon } from '@/styles/icons'
import React from 'react'


export const SharePopOverContent = () => {
  return (
    <>
    <SharePopoverContainer>
    <div>
      <a>
        <Icon name='Linkedin' />
      </a>
    </div>
    <div>
      <a>
        <Icon name='Instagram' />
      </a>
    </div>
    <div>
       <a>
        <Icon name='Whatsapp'/>
      </a>
    </div>
    <div>
      <a>
        <Icon name='Eaita'/>
      </a>
    </div>
  </SharePopoverContainer>
  <SharePopoverButton>
    Share
  </SharePopoverButton>
    </>
    
  )
}
