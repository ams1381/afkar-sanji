import React, { useEffect, useRef, useState } from 'react'
import { QuestionnairePanelContainer , PanelInnerContainer , SeeResultButton ,
  QuestionnaireDirectoryContainer , QuestionnaireDirectoryPath , PanelHeader ,
  QuestionnaireEditItemsInnerContainer , QuestionnaireEditItem , QuestionnaireEditItemsContainer , QuestionnaireEditButtonContainer
} from '@/styles/questionnairePanel/QuestionnairePanelHeader';
import { Icon } from '@/styles/icons';
import { FolderPopoverToggle, QuestionnaireNameInput } from '@/styles/folders/Questionnaire';
import { Popover, Skeleton, Tabs } from 'antd';
import { QuestionnairePopover } from './QuestionnairePopover';
import { axiosInstance } from '@/utilities/axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { handleInputWidth } from '@/utilities/RenameFunctions';
import { SharePopOverContent } from '../Folders/SharePopover';
import { useLocalStorage } from '@/utilities/useLocalStorage';

const QuestionnairePanelHeader = ({ FolderName , isFetched , Questionnaire , SideState , ChangeSide }) => {
  const router = useRouter();
  const { getItem , setItem } = useLocalStorage();
  const [ QuestionnaireName , SetQuestionnaireName ]= useState(Questionnaire ? Questionnaire.name : null);
  const [ RenameState , SetRenameState ] = useState(false);
  const [ SharePopover , setSharePopOver] = useState(false);
  const [ QuestionnairePopoverState , SetQuestionnairePopoverState ] = useState(false);
  const QuestionnaireNameInputRef = useRef(null);
  let TabIndex = 0;
  const TabHeadItems = [
    {
      key: '4',
      label: <div className='header_tab_item'> 
          <p>نمودار </p>
      </div>,
    },
    {
      key: '3',
      label: <div className='header_tab_item'>
        <Icon name='TabArrow' />
      <p>نتایج</p> 
      </div>,
    },
    {
      key: '2',
      label: <div className='header_tab_item'>
        <Icon name='TabArrow' />
      <p>تنظیمات پرسشنامه </p>
      </div>,
    },
    {
      key: '1',
      label: <div className='header_tab_item'>
        <Icon name='TabArrow' />
        <p>طراحی سوال</p>
      </div>,
    },
  ]
   if(getItem('tabType'))
    {
      ChangeSide(getItem('tabType'))
      // getItem('tabType') == 'questionnaire_setting' ? TabIndex = 2 : TabIndex = 1;
    
    }
      
  // console.log(getItem('tabType'))

  if(isFetched)
    handleInputWidth(QuestionnaireNameInputRef,QuestionnaireName)
  useEffect(() => {
    handleInputWidth(QuestionnaireNameInputRef,QuestionnaireName);
  },[QuestionnaireNameInputRef.current])
  useEffect(() => {
    Questionnaire ? SetQuestionnaireName(Questionnaire.name) : ''
  },[Questionnaire])
  const QuestionnaireNameChangeHandler = (e) => {
    SetQuestionnaireName(e.target.value);
    handleInputWidth(QuestionnaireNameInputRef,QuestionnaireName);
  }
  const QuestionnaireRenameConfirmHandler = async () => {
    if(!QuestionnaireName)
      return
   await axiosInstance.patch(`/question-api/questionnaires/${Questionnaire.uuid}/`,{ name : QuestionnaireName });
   SetRenameState(false);
  }
  const ChangeTabHandler = (ID) => {
    if(ID == 1)
    {
      setItem('tabType','question_design');
      ChangeSide('question_design')
    }
    else if(ID == 2)
    {
      setItem('tabType','questionnaire_setting');
      ChangeSide('questionnaire_setting');
    }
    else if(ID == 3)
      router.push(`/questionnaire/${Questionnaire.uuid}/Results/`);
    else if(ID == 4)
      router.push(`/questionnaire/${Questionnaire.uuid}/Charts/`);
  }
  return (
    Questionnaire ? 
    <>
    {/* <PanelHeader> */}
          {/* <QuestionnaireDirectoryContainer>
            <QuestionnaireDirectoryPath>
              <QuestionnaireNameInput style={{ marginRight : 10 , fontSize : 14 , color : '#000000D9' }} 
              ref={QuestionnaireNameInputRef} questionnairePanel='active'
               value={QuestionnaireName} onKeyDown={e => e.key == 'Enter' ? QuestionnaireRenameConfirmHandler() : ''}
               onChange={QuestionnaireNameChangeHandler} disabled={!RenameState} /> 
               <span style={{ color : '#00000073' }}>/</span>
              <Link style={{ color : '#A3A3A3' }} href={{
                pathname : '/'
              }}> {Questionnaire.folder} </Link>
            </QuestionnaireDirectoryPath>
              <div>
                <Popover content={<QuestionnairePopover RenameInput={QuestionnaireNameInputRef}
                Questionnaire={Questionnaire}
                trigger='click'
                RenameChangeState={SetRenameState} SetQuestionnairePopoverState={SetQuestionnairePopoverState} />}
                open={QuestionnairePopoverState}
                onOpenChange={() => SetQuestionnairePopoverState(false)}>
                </Popover>
                <FolderPopoverToggle style={{ marginRight : RenameState ? 10 : 8 }}
                onClick={RenameState ? QuestionnaireRenameConfirmHandler : 
                  () => SetQuestionnairePopoverState(!QuestionnairePopoverState)}>
                  {RenameState ? <Icon name='GrayCheck' /> : <Icon name='Menu' />}
                </FolderPopoverToggle>
                {RenameState && <FolderPopoverToggle style={{ marginRight : 8 }}
                onClick={() => {
                  SetQuestionnaireName(Questionnaire?.name)
                  handleInputWidth(QuestionnaireNameInputRef,Questionnaire?.name)
                  SetRenameState(false);
              }}><Icon name='BlackClose' style={{ width : 15}} /></FolderPopoverToggle>}
              </div>
          </QuestionnaireDirectoryContainer> */}
          {/* <div className='see_result_container'>
            <Link href={`/questionnaire/${Questionnaire.uuid}/Results/`}>
            <SeeResultButton>
              <p>مشاهده نتایج</p>
              <Icon name='SeeResult' />
            </SeeResultButton>
            </Link>
          </div> */}
        {/* </PanelHeader> */}
        <QuestionnaireEditItemsContainer>
            <QuestionnaireEditItemsInnerContainer>
            <Tabs
                defaultActiveKey={getItem('tabType') == 'questionnaire_setting' ?  '2' : '1'}
                items={TabHeadItems}
                centered={true}
                onChange={ChangeTabHandler}
                indicatorSize={(origin) => origin - 16}
                moreIcon={<Icon name='close' />}
              />
            </QuestionnaireEditItemsInnerContainer>
            <QuestionnaireEditButtonContainer>
            <Link onClick={(e) => { !Questionnaire.questions.length ? e.preventDefault() : '' }}
            href={`/questionnaire/${Questionnaire.uuid}/ViewQuestions/`}  target='_blank'>
              <button style={{ pointerEvents :(Questionnaire.questions &&  Questionnaire.questions.length) ? 'all' : 'none' }}>
                     <Icon name='BlackEye' />
              </button>
              </Link>
              <Popover
            content={<SharePopOverContent Questionnaire={Questionnaire?.uuid} />}
            trigger="click"
            open={SharePopover}
            onOpenChange={() => setSharePopOver(false)}>
              <button onClick={() => setSharePopOver(!SharePopover)}>
                  <Icon name='Share' />
              </button>
            </Popover>
            </QuestionnaireEditButtonContainer>
        </QuestionnaireEditItemsContainer>
     
    </> : <> 
        <QuestionnaireEditItemsContainer loading={'active'}>
          <QuestionnaireEditItemsInnerContainer loading={'active'}>
              <Skeleton.Button active style={{ borderRadius : 2 }} Button />
             <Skeleton.Button active style={{ borderRadius : 2 }} Button />
             <Skeleton.Button active style={{ borderRadius : 2 }} Button />
             <Skeleton.Button active style={{ borderRadius : 2 }} Button />
          </QuestionnaireEditItemsInnerContainer>
          
          <QuestionnaireEditButtonContainer isloading={'active'}>
            <Skeleton.Button active style={{ width : 15 , borderRadius : 2 }} />
            <Skeleton.Button active style={{ width : 15 , borderRadius : 2 }} />
        </QuestionnaireEditButtonContainer>
        </QuestionnaireEditItemsContainer>
        
    
    </>
        
  )
}
export default QuestionnairePanelHeader;