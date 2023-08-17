import { Icon } from '@/styles/icons';
import React, { useState } from 'react'
import { FolderPopoverContainer , FolderPopoverItem } from '@/styles/folders/Popovers';
import { axiosInstance } from '@/utilities/axios';
import { Button, ConfigProvider, Modal } from 'antd'
import RemoveFolderPopUpContent from '../Folders/RemoveFolderPopUp';
import RemovePopup from '../Folders/RemovePopup';

const FolderPopoverContent = ({ FolderReload , RenameInput , RenameFolderState , SelectedFolderNumber , closeEditPopover, Folders , SelectFolder }) => {
  const [ deleteFolderState , setDeleteFolderState ] = useState(false);
  const deleteFolder = async () => {
    await axiosInstance.delete(`/user-api/folders/${Folders[SelectedFolderNumber].id}/`);
    SelectFolder(0);
    FolderReload();
    closeEditPopover(); 
    setDeleteFolderState(false);
  }
  const RemoveFolderStateHandler = () => {
    setDeleteFolderState(true)
    closeEditPopover();
  }
  return (
    <FolderPopoverContainer>
        <FolderPopoverItem>
          <button onClick={() => {
            RenameFolderState(true);
            setTimeout(()=> {
              RenameInput.current.select();
            },100)
            }}>
              <Icon name='GrayPen'/>
              <p>تغییر نام</p>
            </button>
        </FolderPopoverItem>
        <FolderPopoverItem deleteitem={'true'}>
          <RemovePopup 
          title='این پوشه حذف شود؟'
          onOkay={deleteFolder} DeleteState={deleteFolderState} setDeleteState={setDeleteFolderState}>
          </RemovePopup>
          <button onClick={RemoveFolderStateHandler}>
              <Icon name='RedTrash' />
              <p>حذف</p>
            </button>
        </FolderPopoverItem>
    </FolderPopoverContainer>
  )
}
export default FolderPopoverContent;