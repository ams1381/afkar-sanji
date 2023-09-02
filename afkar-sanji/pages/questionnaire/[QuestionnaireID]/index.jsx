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

const QuestionnairePanel = () => {
    const router = useRouter();
    const [ messageApi , messageContext ] = message.useMessage()
    const [ SideBarOpen , setOpen ] = useState(false);
    const [ QuestionnaireInfo , SetQuestionnaireInfo ] = useState(null);
    const [ SideState , SetSideState ] = useState('question_design');
    const [ QuestionnaireReloader , SetQuestionnaireReloader ] = useState(false);
  
    useEffect(() => {
      try 
      {
        const QuestionnaireRetriever = async () => {
          let  { data } =  await axiosInstance.get(`/question-api/questionnaires/${router.query.QuestionnaireID}/`);
          SetQuestionnaireInfo(data);
          // SetQuestionnaireReloader(false);
       }
       if(router.query.QuestionnaireID)
         QuestionnaireRetriever();
      }
      catch(err)
      {
        messageApi.error({
          content : err.response.data,
          duration : 6,
          style : {
            fontFamily : 'IRANSans',
            direction : 'rtl'
          }
        })
      }
    },[])
   
  return (
    <>
    <Head>
      <title> Afkar Sanji | Questionnaire</title>
    </Head>
    <Provider store={QuestionStore}>
    <ProgressBarLoading />
    {messageContext}
    <Header SetSideBar={() => setOpen(!SideBarOpen)} goToFolders={true}/>
      <QuestionnairePanelContainer>
        <PanelInnerContainer> 
          {  <QuestionnairePanelHeader SideState={SideState} ChangeSide={SetSideState} Questionnaire={QuestionnaireInfo}/>}
          {
            SideState == 'question_design' ? <QuestionDesignPanel QuestionnaireReloader={SetQuestionnaireReloader} Questionnaire={QuestionnaireInfo}/> 
            : <SettingPanel Questionnaire={QuestionnaireInfo}/>
            }
          </PanelInnerContainer>
      </QuestionnairePanelContainer>
      </Provider>
      
    </>
  )
}
export default QuestionnairePanel;