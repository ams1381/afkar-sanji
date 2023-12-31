import { LoginErrorMessage } from '@/styles/auth/Login'
import { AddQuestionnaireModalInput, ModalButtonsContainer, ModalContentContainer } from '@/styles/folders/Popup'
import { themeContext } from '@/utilities/ThemeContext'
import { axiosInstance } from '@/utilities/axios'
import {Button, ConfigProvider, message, Modal} from 'antd'
import React, {useContext, useEffect, useRef, useState} from 'react'
import {AuthContext} from "@/utilities/AuthContext";
import {useLocalStorage} from "@/utilities/useLocalStorage";

const AddQuestionnairePopUp = ({ AddQuestionnaireModal , FolderReload , folders , 
  SelectedFolderNumber , setQuestionnaireModalState  , SetSideBar }) => {
  const [ ErrMessage , SetErrMessage ] = useState(null);
  const { getItem } = useLocalStorage();
  const [ NewQuestionnaireName , setNewQuestionnaireName ] = useState(null);
  const [ OperatingState , SetOperatingState ] = useState(false);
  const [ messageApi , messageContext ] = message.useMessage();
  const Auth = useContext(AuthContext);
  const InputRef = useRef()
    const AddQuestionnaireHandler = async () => {
        SetOperatingState(true);
        if(!NewQuestionnaireName)
        {
            !getItem('roleReq') === 'interview-api/interviews' ?
                SetErrMessage('لطفا نام پرسشنامه را وارد کنید') :
                SetErrMessage('لطفا نام پروژه را وارد کنید')
            SetOperatingState(false);
            return
        }
        try {
            await axiosInstance.post(`/${Auth.reqRole}/`,{
                name : NewQuestionnaireName ,
                folder: folders[SelectedFolderNumber].id ,
            });
            folders.push({})
            setQuestionnaireModalState(false);
            FolderReload();
            SetOperatingState(false);
        }
        catch (err) {
            SetOperatingState(false);
            if(err?.response?.status === 500) {
                messageApi.error({
                    content : 'مشکل سمت سرور'
                })
            }
            else if(err?.response?.data)
                messageApi.error({
                    content : Object.values(err?.response?.data)[0]
                })
        }
    }
    const CancelPopup = () => {
        setQuestionnaireModalState(false)
    }
    useEffect(() => {
        setTimeout(() => {
            if(InputRef.current)
                InputRef.current.focus();
        },300)

    }, [InputRef , AddQuestionnaireModal]);
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
                { getItem('roleReq') === 'interview-api/interviews' ? <p>عنوان پروژه را وارد کنید</p> : <p>عنوان نظرسنجی را وارد کنید</p>}
                <AddQuestionnaireModalInput ref={InputRef} autoFocus={true}
                    placeholder={getItem('roleReq') === 'interview-api/interviews' ? 'پروژه ۱' : 'نظرسنجی ۱'}
            onKeyDown={e => e.key == 'Enter' ? AddQuestionnaireHandler() : ''}
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
