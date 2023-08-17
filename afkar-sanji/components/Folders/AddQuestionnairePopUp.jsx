import { LoginErrorMessage } from '@/styles/auth/Login'
import { AddQuestionnaireModalInput, ModalButtonsContainer, ModalContentContainer } from '@/styles/folders/Popup'
import { themeContext } from '@/utilities/ThemeContext'
import { axiosInstance } from '@/utilities/axios'
import { Button, ConfigProvider, Modal } from 'antd'
import React, { useState } from 'react'

const AddQuestionnairePopUp = ({ AddQuestionnaireModal , FolderReload , folders , 
  SelectedFolderNumber , setQuestionnaireModalState  , SetSideBar }) => {
  const [ ErrMessage , SetErrMessage ] = useState(null);
  const [ NewQuestionnaireName , setNewQuestionnaireName ] = useState(null);
  const [ OperatingState , SetOperatingState ] = useState(false);

    const AddQuestionnaireHandler = async () => {
        SetOperatingState(true);
        if(!NewQuestionnaireName)
        {
            SetErrMessage('لطفا نام پرسشنامه را وارد کنید');
            SetOperatingState(false);
            return
        }
        await axiosInstance.post('/question-api/questionnaires/',{ name : NewQuestionnaireName , folder: folders[SelectedFolderNumber].id });
        folders.push({})
        setQuestionnaireModalState(false);
        FolderReload();
        SetOperatingState(false);
    }
    const CancelPopup = () => {
        setQuestionnaireModalState(false)
    }
  return (
    <ConfigProvider theme={themeContext}>
    <Modal open={AddQuestionnaireModal} 
            preserve={false}
            destroyOnClose={true}
            onCancel={CancelPopup}
            centered={true}
            closeIcon={false}
            style={{ padding : 10 , borderRadius : 2}}
            footer={
                <ModalButtonsContainer>
                    <Button type='primary' onClick={AddQuestionnaireHandler} loading={OperatingState}>
                        تایید
                    </Button>
                    <Button onClick={() => setQuestionnaireModalState(false)}>
                        لغو
                    </Button>
                </ModalButtonsContainer>}>
            <ModalContentContainer>
                <p>عنوان نظر سنجی را وارد کنید</p>
                <AddQuestionnaireModalInput onChange={(e) => setNewQuestionnaireName(e.target.value)} />
                { ErrMessage ? <LoginErrorMessage>{ErrMessage}</LoginErrorMessage> : ''}
            </ModalContentContainer> 
        </Modal>
    </ConfigProvider>
  )
}
export default AddQuestionnairePopUp;
