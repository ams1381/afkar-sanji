import { Icon } from '@/styles/icons'
import { PanelHeader, QuestionnaireDirectoryContainer, 
  QuestionnaireDirectoryPath,  QuestionnaireEditButtonContainer ,
  QuestionnaireEditItemsInnerContainer} from '@/styles/questionnairePanel/QuestionnairePanelHeader'
import { useLocalStorage } from '@/utilities/useLocalStorage'
import { Popover, Skeleton, Tabs } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { SharePopOverContent } from '../Folders/SharePopover'
import { useState } from 'react'
import {ChatModal} from "@/components/Questioner/ChatModal/ChatModal";

export const ChartsHeader = ({ QuestionnaireQuery }) => {
  const router = useRouter();
  const { setItem , getItem } = useLocalStorage();
  const [ chatModalActive , setChatModalActive ] = useState(false);
  const [ SharePopover , setSharePopOver] = useState(false);
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
    const ChangeTabHandler = (ID) => {
      if(ID == 1)
        {
          router.push(`/questionnaire/${QuestionnaireQuery.data?.data?.uuid}/`);
          setItem('tabType','question_design');
        }
        else if(ID == 2)
        {
          router.push(`/questionnaire/${QuestionnaireQuery.data?.data?.uuid}/`);
          setItem('tabType','questionnaire_setting');
        }
      else if(ID == 3)
        router.push(`/questionnaire/${QuestionnaireQuery.data?.data?.uuid}/results/`);
      else if(ID == 4)
        router.push(`/questionnaire/${QuestionnaireQuery.data?.data?.uuid}/charts/`);
    }
    return (
        QuestionnaireQuery.isLoading ? <>
             <PanelHeader>
                <QuestionnaireDirectoryContainer loading='active'>
                <QuestionnaireDirectoryPath>
                    <Skeleton.Input active  style={{ borderRadius : 2 }} />
                </QuestionnaireDirectoryPath>
                    <div>
                    <Skeleton.Input active style={{ borderRadius : 2 }}/>
                    </div>
                </QuestionnaireDirectoryContainer>
            </PanelHeader> 
            </>:
       <>
           { QuestionnaireQuery.data?.data && chatModalActive && <ChatModal isAdmin={false}
                Questionnaire={Questionnaire} isActive={chatModalActive} setIsActive={setChatModalActive}/>}
       <PanelHeader>
       <QuestionnaireEditItemsInnerContainer>
            <Tabs
                defaultActiveKey='4'
                items={TabHeadItems}
                onChange={ChangeTabHandler}
                indicatorSize={(origin) => origin - 16}
                moreIcon={<Icon name='close' />}
              />
            </QuestionnaireEditItemsInnerContainer>
            <QuestionnaireEditButtonContainer>
                { getItem('roleReq') !== 'interview-api/interviews' && <Link onClick={(e) => {
                    !QuestionnaireQuery.data?.data.questions.length ? e.preventDefault() : ''
                }}
                     href={`/questionnaire/${QuestionnaireQuery.data?.data?.uuid}/view-questions/`} target='_blank'>
                    <button
                        style={{pointerEvents: (QuestionnaireQuery.data?.data?.questions && QuestionnaireQuery.data?.data?.questions.length) ? 'all' : 'none'}}>
                        <Icon name='BlackEye'/>
                    </button>
                </Link>}

                { getItem('roleReq') !== 'interview-api/interviews' && <Popover
                    content={<SharePopOverContent Questionnaire={QuestionnaireQuery.data?.data}/>}
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
              {/* <QuestionnaireDirectoryContainer>
                <QuestionnaireDirectoryPath>
                  <p style={{ marginRight : '0.5rem' }}>نمودار </p> /
                  <Link style={{ marginRight : '0.5rem' , color : '#00000073' }} href={{
                    pathname : `/questionnaire/${QuestionnaireQuery.data?.data?.uuid}/`
                  }}> {QuestionnaireQuery.data?.data?.name} </Link> 
                  /
                  <Link style={{ color : '#A3A3A3' }} href={{
                    pathname : '/'
                  }}> {QuestionnaireQuery.data?.data?.folder} </Link>
                </QuestionnaireDirectoryPath>
              </QuestionnaireDirectoryContainer> */}
              
            </PanelHeader>
            </> 
      )
}
