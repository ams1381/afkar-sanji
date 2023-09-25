import React, { useState } from 'react'
import { Button, ConfigProvider, Modal } from 'antd'
import RemoveFolderPopUpContent from '../Folders/RemoveFolderPopUp';
import { RemoveModalButtonsContainer } from '@/styles/folders/Popup';
const RemovePopup = ({ onOkay , DeleteState , setDeleteState , title}) => {
  const [ Loading , SetLoading ] = useState(false);
  const { confirm } = Modal;

  return (
    <Modal open={DeleteState} centered
            closeIcon={false}
            // onCancel={() => setDeleteState(false)} 
            footer={<RemoveModalButtonsContainer>
            <Button type='primary' onClick={async () => {
                SetLoading(true)
                onOkay();
                setTimeout(() => {
                  SetLoading(false)
                },2000)
                
            }} danger loading={Loading}>
                حذف
            </Button>
            <Button danger onClick={() => setDeleteState(false)}>
              لغو
            </Button>
            </RemoveModalButtonsContainer>}>
            <RemoveFolderPopUpContent title={title}></RemoveFolderPopUpContent>
          </Modal>
  )
}
export default RemovePopup;
