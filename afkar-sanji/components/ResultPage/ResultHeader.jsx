import {
    AntdTabsContainer,
    antdTabsContainer, PanelHeader, QuestionnaireDirectoryContainer,
    QuestionnaireDirectoryPath, QuestionnaireEditButtonContainer, QuestionnaireEditItemsContainer,
    QuestionnaireEditItemsInnerContainer
} from '@/styles/questionnairePanel/QuestionnairePanelHeader'
import { Skeleton , Select, ConfigProvider, Tabs, Popover } from 'antd'

import { QuestionSearchContainer } from '@/styles/questionnairePanel/QuestionDesignPanel'
import Link from 'next/link'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Icon } from '@/styles/icons'
import { axiosInstance } from '@/utilities/axios'
import { useRouter } from 'next/router'
import { useLocalStorage } from '@/utilities/useLocalStorage'
import { SharePopOverContent } from '../Folders/SharePopover'
import {ChatModal} from "@/components/Questioner/ChatModal/ChatModal";

export const ResultHeader = ({ QuestionnaireQuery , RightDrawerOpen }) => {
    const router = useRouter();
    const [ SharePopover , setSharePopOver] = useState(false);
    const { setItem , getItem } = useLocalStorage();
    const [ SearchValue , setSearchValue ] = useState('');
    const [ chatModalActive , setChatModalActive ] = useState(false);
    const { refetch, data , isLoading } = useQuery(
        ["key", "ResultSearch"],
       async () => 
       await axiosInstance.get(`/result-api/${QuestionnaireQuery.data?.data?.uuid}/answer-sets/search/?search=${SearchValue}`),
        {
          enabled: false,
        }
      );
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
          setItem('tabType','question_design');
          router.push(`/questionnaire/${QuestionnaireQuery.data?.data?.uuid}/`);
          
        }
        else if(ID == 2)
        {
          setItem('tabType','questionnaire_setting');
          router.push(`/questionnaire/${QuestionnaireQuery.data?.data?.uuid}/`);
          
        }
        else if(ID == 3)
          router.push(`/questionnaire/${QuestionnaireQuery.data?.data?.uuid}/results/`);
        else if(ID == 4)
          router.push(`/questionnaire/${QuestionnaireQuery.data?.data?.uuid}/charts/`);
      }
  return (
    QuestionnaireQuery.isLoading ?  <QuestionnaireEditItemsContainer loading={'active'}>
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
        :
   <>
   <PanelHeader>
   <QuestionnaireEditItemsInnerContainer >
       { QuestionnaireQuery.data?.data && chatModalActive && <ChatModal isAdmin={false}
            Questionnaire={QuestionnaireQuery.data?.data} isActive={chatModalActive} setIsActive={setChatModalActive}/>}
       <AntdTabsContainer RightDrawerOpen={RightDrawerOpen}>
            <Tabs
                defaultActiveKey='3'
                items={TabHeadItems}
                onChange={ChangeTabHandler}
                indicatorSize={(origin) => origin - 16}
                moreIcon={<Icon name='close' />}
              />
       </AntdTabsContainer>
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
           <button className={'header-button'} onClick={() => setSharePopOver(!SharePopover)}>
               <Icon name='Share'/>
           </button>
       </Popover>}
       { getItem('roleReq') && getItem('roleReq') === 'interview-api/interviews' &&
           <button onClick={() => setChatModalActive(true)} className={'header-button'}>
           <Icon style={{width: 14}} name={'ChatIcon'}/>
       </button>}
       </QuestionnaireEditButtonContainer>
          {/* <QuestionnaireDirectoryContainer>
            <QuestionnaireDirectoryPath>
              <p style={{ marginRight : '0.5rem' }}>نتایج </p> <span style={{ color : '#00000073' }}>/</span>
              <Link style={{ marginRight : '0.5rem' , color : '#00000073'  }} href={{
                pathname : `/questionnaire/${QuestionnaireQuery.data.data.uuid}/`
              }}> {QuestionnaireQuery.data.data.name} </Link> 
              <span style={{ color : '#00000073' }}>/</span>
              <Link style={{ color : '#A3A3A3' }} href={{
                    pathname : '/'
                  }}> {QuestionnaireQuery.data.data.folder} </Link>
            </QuestionnaireDirectoryPath>
          </QuestionnaireDirectoryContainer> */}
          
        </PanelHeader>
        
        </>
  )
}
