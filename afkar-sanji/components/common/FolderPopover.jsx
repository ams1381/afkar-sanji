import { Icon } from '@/styles/icons';
import React, { useState } from 'react'
import { FolderPopoverContainer , FolderPopoverItem } from '@/styles/folders/Popovers';
import { axiosInstance } from '@/utilities/axios';
import { Button, ConfigProvider, Modal, message } from 'antd'
import RemoveFolderPopUpContent from '../Folders/RemoveFolderPopUp';
import RemovePopup from './RemovePopup';
import { handleInputWidth } from '@/utilities/RenameFunctions';
import { useLocalStorage } from '@/utilities/useLocalStorage';

const FolderPopoverContent = ({ FolderReload , RenameInput , RenameFolderState , SelectedFolderNumber , closeEditPopover,
   Folders , SelectFolder }) => {
  const [ deleteFolderState , setDeleteFolderState ] = useState(false);
  const { setItem } = useLocalStorage();
  const [ MessageApi , MessageContext ] = message.useMessage();
  const deleteFolder = async () => {
    try
    {
      await axiosInstance.delete(`/user-api/folders/${Folders[SelectedFolderNumber].id}/`);
      setItem('SelectedFolder',0)
      SelectFolder(0);
      FolderReload();
      closeEditPopover(); 
      // handleInputWidth();
      setDeleteFolderState(false);
    }
    catch(err)
    {
      // handleInputWidth();
      MessageApi.error({
        content : Object.values(err.response.data)[0],
        duration : 4,
        style : {
          fontFamily : 'IRANSans'
        }
      })
    }
   
  }
  const RemoveFolderStateHandler = () => {
    setDeleteFolderState(true)
    closeEditPopover();
  }
  return (
    <FolderPopoverContainer>
      {MessageContext}
        <FolderPopoverItem>
          <button onClick={() => {
            RenameFolderState(true);
            setTimeout(()=> {
              RenameInput.current.select();
              RenameInput.current.focus();
            },100)
            closeEditPopover()
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