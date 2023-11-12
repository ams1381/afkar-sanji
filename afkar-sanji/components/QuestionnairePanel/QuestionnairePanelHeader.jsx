import React, {useContext, useEffect, useRef, useState} from 'react'
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
import {AuthContext} from "@/utilities/AuthContext";

const QuestionnairePanelHeader = ({ FolderName , isFetched , Questionnaire , SideState , ChangeSide }) => {
  const router = useRouter();
  const { getItem , setItem } = useLocalStorage();
  const Auth = useContext(AuthContext);
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
  useEffect(() => {
    if(getItem('tabType'))
    {
      ChangeSide(getItem('tabType'))
      // getItem('tabType') == 'questionnaire_setting' ? TabIndex = 2 : TabIndex = 1;
    
    }
  },[])
   
      

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
      router.push(`/questionnaire/${Questionnaire.uuid}/results/`);
    else if(ID == 4)
      router.push(`/questionnaire/${Questionnaire.uuid}/charts/`);
  }
  return (
    Questionnaire ? 
    <>
        <QuestionnaireEditItemsContainer>
            <QuestionnaireEditItemsInnerContainer>
            <Tabs
                items={TabHeadItems}
                activeKey={getItem('tabType') == 'questionnaire_setting' ?  '2' : '1'}
                centered={true}
                onChange={ChangeTabHandler}
                indicatorSize={(origin) => origin - 16}
                moreIcon={<Icon name='close' />}
              />
            </QuestionnaireEditItemsInnerContainer>
            <QuestionnaireEditButtonContainer>
              { getItem('roleReq') !== 'interview-api/interviews' && <Link onClick={(e) => {
                !Questionnaire.questions.length ? e.preventDefault() : ''
              }}
                     href={`/questionnaire/${Questionnaire.uuid}/view-questions/`} target='_blank'>
                <button
                    style={{pointerEvents: (Questionnaire.questions && Questionnaire.questions.length) ? 'all' : 'none'}}>
                  <Icon name='BlackEye'/>
                </button>
              </Link>}

              { getItem('roleReq') !== 'interview-api/interviews' && <Popover
                  content={<SharePopOverContent Questionnaire={Questionnaire}/>}
                  trigger="click"
                  open={SharePopover}
                  onOpenChange={() => setSharePopOver(false)}>
                <button onClick={() => setSharePopOver(!SharePopover)}>
                  <Icon name='Share'/>
                </button>
              </Popover>}
              { getItem('roleReq') && getItem('roleReq') === 'interview-api/interviews' && <button>
                <Icon style={{width: 14}} name={'ChatIcon'}/>
              </button>}
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
            {
                getItem('roleReq') !== 'interview-api/interviews' && <>
                  <Skeleton.Button active style={{ width : 15 , borderRadius : 2 }} />
                  <Skeleton.Button active style={{ width : 15 , borderRadius : 2 }} />
                </>
            }
            { getItem('roleReq') && getItem('roleReq') === 'interview-api/interviews' &&
                <Skeleton.Button active style={{ width : 15 , borderRadius : 2 }} />}
        </QuestionnaireEditButtonContainer>
        </QuestionnaireEditItemsContainer>
        
    
    </>
        
  )
}
export default QuestionnairePanelHeader;