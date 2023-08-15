import { Icon } from '@/styles/folders/icons';
import React, { useState } from 'react'
import { FolderPopoverContainer , FolderPopoverItem } from '@/styles/folders/Popovers';
import { axiosInstance } from '@/utilities/axios';
import { Button, ConfigProvider, Modal } from 'antd'
import RemoveFolderPopUpContent from './RemoveFolderPopUp';
import RemovePopup from './RemovePopup';

const FolderPopoverContent = ({ FolderReload , SelectedFolderNumber , closeEditPopover, Folders , SelectFolder }) => {
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
  const renameFolder = async () => {

  }
  return (
    <FolderPopoverContainer>
        <FolderPopoverItem>
          <button>
              <Icon name='GrayPen'/>
              <p>تغییر نام</p>
            </button>
        </FolderPopoverItem>
        <FolderPopoverItem deleteitem={'true'}>
          {/* <Modal open={deleteFolderState} centered
            closeIcon={false}
            onCancel={() => setDeleteFolderState(false)} footer={<>
            <Button type='primary' danger>
                حذف
            </Button>
            <Button danger>
              لغو
            </Button>
            </>}>
            <RemoveFolderPopUpContent></RemoveFolderPopUpContent>
          </Modal> */}
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