import { Icon } from '@/styles/folders/icons';
import React from 'react'
import { FolderPopoverContainer , FolderPopoverItem } from '@/styles/folders/Popovers';

const FolderPopoverContent = () => {
  return (
    <FolderPopoverContainer>
        <FolderPopoverItem>
          <button>
              <Icon name='GrayPen'/>
            </button>
          <p>تغییر نام</p>
        </FolderPopoverItem>
        <FolderPopoverItem deleteitem>
          <button>
              <Icon name='RedTrash' />
            </button>
          <p>حذف</p>
        </FolderPopoverItem>
    </FolderPopoverContainer>
  )
}
export default FolderPopoverContent;