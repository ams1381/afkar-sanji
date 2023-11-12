import { FolderPopoverContainer, FolderPopoverItem } from '@/styles/folders/Popovers';
import React, {useContext, useState} from 'react'
import RemovePopup from '../common/RemovePopup';
import { Icon } from '@/styles/icons';
import Link from 'next/link';
import { axiosInstance } from '@/utilities/axios';
import { useRouter } from 'next/router';
import {AuthContext} from "@/utilities/AuthContext";

export const QuestionnairePopover = ({ Questionnaire , RenameInput  , RenameChangeState , SetQuestionnairePopoverState }) => {
  const router = useRouter();
  const Auth = useContext(AuthContext);
  const [ DeleteQuestionnaireState , SetDeleteQuestionnaireState ] = useState(false);
  const [ RemovePopupState , SetRemovePopupState ] = useState(false);
    const RemoveQuestionnaireStateHandler = () => {
      SetQuestionnairePopoverState(false);
      SetDeleteQuestionnaireState(true);
    }
    const DeleteQuestionnaireHandler = async () => {
      await axiosInstance.delete(`/question-api/questionnaires/${Questionnaire.uuid}/`)
      SetDeleteQuestionnaireState(false);
      typeof window !== 'undefined' ? router.push('../') : ''
    }
  return (
    <FolderPopoverContainer >
        <FolderPopoverItem>
          <button onClick={() => {
            SetQuestionnairePopoverState(false)
            RenameChangeState(true);
            setTimeout(()=> {
              RenameInput.current.select();
              RenameInput.current.focus();
            },100)
            }}>
              <Icon name='GrayPen'/>
              <p>تغییر نام</p>
            </button>
        </FolderPopoverItem>
        <FolderPopoverItem deleteitem={'true'}>
          <RemovePopup 
          title='این پرسشنامه حذف شود؟'
          onOkay={DeleteQuestionnaireHandler} 
          DeleteState={DeleteQuestionnaireState} setDeleteState={SetDeleteQuestionnaireState}>
          </RemovePopup>
          <button onClick={RemoveQuestionnaireStateHandler}>
              <Icon name='RedTrash' />
              <p>حذف</p>
            </button>
        </FolderPopoverItem>
    </FolderPopoverContainer>
  )
}
