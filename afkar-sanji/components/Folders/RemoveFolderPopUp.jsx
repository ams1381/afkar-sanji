import { RemoveFolderModalContainer , RemoveFolderModalHeader ,
    RemoveModalTextContent , RemoveModalIcon } from '@/styles/folders/Popup'
import { Icon } from '@/styles/folders/icons'
import React from 'react'

const RemoveFolderPopUpContent = ({title}) => {
  return (
    <RemoveFolderModalContainer>
        <RemoveFolderModalHeader>
            <RemoveModalIcon>
                <Icon name='Warning'/>
            </RemoveModalIcon>
            <RemoveModalTextContent>
                <p>{title}</p>
                <p>در صورت حذف امکان بازیابی آن وجود ندارد</p>
            </RemoveModalTextContent>
            
            
        </RemoveFolderModalHeader>
       
    </RemoveFolderModalContainer>
  )
}
export default RemoveFolderPopUpContent;