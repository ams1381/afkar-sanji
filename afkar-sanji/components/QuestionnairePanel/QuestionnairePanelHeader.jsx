import React, { useEffect, useRef, useState } from 'react'
import { QuestionnairePanelContainer , PanelInnerContainer , SeeResultButton ,
  QuestionnaireDirectoryContainer , QuestionnaireDirectoryPath , PanelHeader ,
  QuestionnaireEditItemsInnerContainer , QuestionnaireEditItem , QuestionnaireEditItemsContainer , QuestionnaireEditButtonContainer
} from '@/styles/questionnairePanel/QuestionnairePanelHeader';
import { Icon } from '@/styles/icons';
import { FolderPopoverToggle, QuestionnaireNameInput } from '@/styles/folders/Questionnaire';
import { Popover, Skeleton } from 'antd';
import { QuestionnairePopover } from './QuestionnairePopover';
import { axiosInstance } from '@/utilities/axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { handleInputWidth } from '@/utilities/RenameFunctions';

const QuestionnairePanelHeader = ({ FolderName , Questionnaire , SideState , ChangeSide }) => {
  const router = useRouter();
  const [ QuestionnaireName , SetQuestionnaireName ]= useState(Questionnaire.name);
  const [ RenameState , SetRenameState ] = useState(false);
  const [ QuestionnairePopoverState , SetQuestionnairePopoverState ] = useState(false);
  const QuestionnaireNameInputRef = useRef(null);

  useEffect(() => {
    handleInputWidth(QuestionnaireNameInputRef,QuestionnaireName);
  },[QuestionnaireNameInputRef.current])

  const QuestionnaireNameChangeHandler = (e) => {
    SetQuestionnaireName(e.target.value);
    handleInputWidth(QuestionnaireNameInputRef,QuestionnaireName);
  }
  const QuestionnaireRenameConfirmHandler = async () => {
   await axiosInstance.patch(`/question-api/questionnaires/${Questionnaire.uuid}/`,{ name : QuestionnaireName });
   SetRenameState(false);
  }
  return (
    Questionnaire ? 
    <>
    <PanelHeader>
          <QuestionnaireDirectoryContainer>
            <QuestionnaireDirectoryPath>
              <QuestionnaireNameInput style={{ marginRight : 10 , fontSize : 14}} ref={QuestionnaireNameInputRef}
               value={QuestionnaireName} onChange={QuestionnaireNameChangeHandler} disabled={!RenameState} /> /
              <Link href={{
                pathname : '/'
              }}> {Questionnaire.folder} </Link>
            </QuestionnaireDirectoryPath>
              <div>
                <Popover content={<QuestionnairePopover RenameInput={QuestionnaireNameInputRef}
                Questionnaire={Questionnaire}
                RenameChangeState={SetRenameState} SetQuestionnairePopoverState={SetQuestionnairePopoverState} />}
                open={QuestionnairePopoverState}
                onOpenChange={() => SetQuestionnairePopoverState(false)}
                >
                <FolderPopoverToggle
                onClick={RenameState ? QuestionnaireRenameConfirmHandler : 
                  () => SetQuestionnairePopoverState(!QuestionnairePopoverState)}>
                  {RenameState ? <Icon name='GrayCheck' /> : <Icon name='Menu' />}
                </FolderPopoverToggle>
                </Popover>
              </div>
          </QuestionnaireDirectoryContainer>
          <div>
            <SeeResultButton>
              <p>مشاهده نتایج</p>
              <Icon name='SeeResult' />
            </SeeResultButton>
          </div>
        </PanelHeader>
        <QuestionnaireEditItemsContainer>
            <QuestionnaireEditItemsInnerContainer>
                <QuestionnaireEditItem selected={SideState == 'question_design' ? true : null} 
                onClick={() => ChangeSide('question_design')}>
                    <p>طراحی سوال</p>
                </QuestionnaireEditItem>
                <QuestionnaireEditItem selected={SideState == 'questionnaire_setting' ? true : null} 
                onClick={() => ChangeSide('questionnaire_setting')}>
                    <p>تنظیمات </p>
                </QuestionnaireEditItem>
            </QuestionnaireEditItemsInnerContainer>
            <QuestionnaireEditButtonContainer>
            <Link href={`/questionnaire/${Questionnaire.uuid}/ViewQuestions/`} target='_blank'>
              <button style={{ pointerEvents :(Questionnaire.questions &&  Questionnaire.questions.length) ? 'all' : 'none' }}>
                     <Icon name='BlackEye' />
              </button>
              </Link>
              <button>
                <Icon name='Share' />
              </button>
            </QuestionnaireEditButtonContainer>
        </QuestionnaireEditItemsContainer>
        
    </> : <Skeleton active />
        
  )
}
export default QuestionnairePanelHeader;