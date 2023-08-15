import React from 'react'
import { Button, ConfigProvider, Modal } from 'antd'
import RemoveFolderPopUpContent from './RemoveFolderPopUp';
import { RemoveModalButtonsContainer } from '@/styles/folders/Popup';
const RemovePopup = ({ onOkay , DeleteState , setDeleteState , title}) => {
  return (
    <Modal open={DeleteState} centered
            closeIcon={false}
            onCancel={() => setDeleteState(false)} footer={<RemoveModalButtonsContainer>
            <Button type='primary' onClick={onOkay} danger>
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
