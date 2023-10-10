import { LoginErrorMessage } from '@/styles/auth/Login'
import { AddQuestionnaireModalInput, ModalButtonsContainer, ModalContentContainer } from '@/styles/folders/Popup'
import { themeContext } from '@/utilities/ThemeContext'
import { axiosInstance } from '@/utilities/axios'
import {Button, ConfigProvider, message, Modal} from 'antd'
import React, { useState } from 'react'

const AddQuestionnairePopUp = ({ AddQuestionnaireModal , FolderReload , folders , 
  SelectedFolderNumber , setQuestionnaireModalState  , SetSideBar }) => {
  const [ ErrMessage , SetErrMessage ] = useState(null);
  const [ NewQuestionnaireName , setNewQuestionnaireName ] = useState(null);
  const [ OperatingState , SetOperatingState ] = useState(false);
  const [ messageApi , messageContext ] = message.useMessage();

    const AddQuestionnaireHandler = async () => {
        SetOperatingState(true);
        if(!NewQuestionnaireName)
        {
            SetErrMessage('لطفا نام پرسشنامه را وارد کنید');
            SetOperatingState(false);
            return
        }
        try {
            await axiosInstance.post('/question-api/questionnaires/',{ name : NewQuestionnaireName , folder: folders[SelectedFolderNumber].id });
            folders.push({})
            setQuestionnaireModalState(false);
            FolderReload();
            SetOperatingState(false);
        }
        catch (err) {
            SetOperatingState(false);
            if(err?.response?.data)
                messageApi.error({
                    content : Object.values(err?.response?.data)[0]
                })
        }
    }
    const CancelPopup = () => {
        setQuestionnaireModalState(false)
    }
  return (
    <ConfigProvider theme={themeContext}>
        {messageContext}
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
                <p>عنوان نظرسنجی را وارد کنید</p>
                <AddQuestionnaireModalInput placeholder='نظرسنجی 1'
                onChange={(e) => {
                    setNewQuestionnaireName(e.target.value)
                    SetErrMessage(null);
                }} />
                { ErrMessage ? <LoginErrorMessage>{ErrMessage}</LoginErrorMessage> : ''}
            </ModalContentContainer> 
        </Modal>
    </ConfigProvider>
  )
}
export default AddQuestionnairePopUp;
