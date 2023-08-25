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

const QuestionnairePanelHeader = ({ FolderName , Questionnaire , SideState , ChangeSide }) => {
  const router = useRouter();
  const [ QuestionnaireName , SetQuestionnaireName ]= useState(Questionnaire.name);
  const [ RenameState , SetRenameState ] = useState(false);
  const [ QuestionnairePopoverState , SetQuestionnairePopoverState ] = useState(false);
  const QuestionnaireNameInputRef = useRef(null);

  useEffect(() => {
    QuestionnaireNameInputRef.current ? QuestionnaireNameInputRef.current.style.width = ((QuestionnaireNameInputRef.current.value.length * 8)+ 18) + 'px' : ''
  },[])

  const QuestionnaireNameChangeHandler = (e) => {
    SetQuestionnaireName(e.target.value);
    QuestionnaireNameInputRef.current ? QuestionnaireNameInputRef.current.style.width = ((QuestionnaireNameInputRef.current.value.length * 7)+ 7) + 'px' : ''
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
                  {RenameState ? <Icon name='GrayCheck' /> : <Icon name='menu' />}
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
              <button>
                <Link href={`/questionnaire/${Questionnaire.uuid}/ViewQuestions/`} target='_blank'>
                     <Icon name='BlackEye' />
                </Link>
              </button>
              <button>
                <Icon name='Share' />
              </button>
            </QuestionnaireEditButtonContainer>
        </QuestionnaireEditItemsContainer>
        
    </> : <Skeleton active />
        
  )
}
export default QuestionnairePanelHeader;