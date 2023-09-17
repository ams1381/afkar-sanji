import { Header } from '@/components/common/Header';
import { axiosInstance } from '@/utilities/axios';
import Head from 'next/head';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import QuestionnairePanelHeader from '@/components/QuestionnairePanel/QuestionnairePanelHeader';
import { Skeleton } from 'antd';
import { QuestionnairePanelContainer , PanelInnerContainer} from '@/styles/questionnairePanel/QuestionnairePanelHeader';
import { Icon } from '@/styles/icons';
import SettingPanel from '@/components/QuestionnairePanel/SettingPanel';
import QuestionDesignPanel from '@/components/QuestionnairePanel/QuestionDesignPanel';
import ProgressBarLoading from '@/styles/ProgressBarLoading';
import { Provider } from 'react-redux';
import QuestionStore from '@/utilities/QuestionStore';
import { message } from 'antd';
import { useQuery } from '@tanstack/react-query';

const QuestionnairePanel = () => {
    const router = useRouter();
    const [ messageApi , messageContext ] = message.useMessage()
    const [ SideBarOpen , setOpen ] = useState(false);
    const [ SideState , SetSideState ] = useState('question_design');
    const [ QuestionnaireReloader , SetQuestionnaireReloader ] = useState(false);
    const { data , isLoading , refetch , error , isFetched} = useQuery(['QuestionnaireRetrieve'],
    async () => await axiosInstance.get(`/question-api/questionnaires/${router?.query?.QuestionnaireID}/`))

    if(error && error?.response)
    {
      if(error?.response.status == 404)
        messageApi.error({
                content : 'یافت نشد',
                duration : 6,
                style : {
                  fontFamily : 'IRANSans',
                  direction : 'rtl'
                }
              })
        else
          messageApi.error({
            content : error.response.data,
            duration : 6,
            style : {
              fontFamily : 'IRANSans',
              direction : 'rtl'
            }
          })
    }

  return (
    <>
     <style global jsx>{`
            html,
            body {
              overflow: hidden;
            }
    `}</style>
    <Head>
      <title> Afkar Sanji | Questionnaire</title>
    </Head>
    <Provider store={QuestionStore}>
    <ProgressBarLoading />
    {messageContext}
    <Header SetSideBar={() => setOpen(!SideBarOpen)} goToFolders={true} loadingHeader={isLoading}
    Questionnaire={data?.data}/>
      <QuestionnairePanelContainer>
        <PanelInnerContainer> 
          {  <QuestionnairePanelHeader SideState={SideState} isFetched={isFetched}
           ChangeSide={SetSideState} Questionnaire={data?.data}/>}
          {
            SideState == 'question_design' ? <QuestionDesignPanel QuestionnaireReloader={refetch} Questionnaire={data?.data}/> 
            : data?.data && <SettingPanel Questionnaire={data?.data}/>
            }
          </PanelInnerContainer>
      </QuestionnairePanelContainer>
      </Provider>
      
    </>
  )
}
export default QuestionnairePanel;