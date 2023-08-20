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

const QuestionnairePanel = () => {
    const router = useRouter();
    const [ SideBarOpen , setOpen ] = useState(false);
    const [ QuestionnaireInfo , SetQuestionnaireInfo ] = useState(null);
    const [ SideState , SetSideState ] = useState('question_design');
    const [ QuestionnaireReloader , SetQuestionnaireReloader ] = useState(false);
  
    useEffect(() => {
        const QuestionnaireRetriever = async () => {
           let  { data } =  await axiosInstance.get(`/question-api/questionnaires/${router.query.QuestionnaireID}/`);
           SetQuestionnaireInfo(data);
           SetQuestionnaireReloader(false);
        }
        if(router.query.QuestionnaireID)
          QuestionnaireRetriever();
    },[router.query , QuestionnaireReloader])
  return (
    <>
    <Head>
      <title> Afkar Sanji | Questionnaire</title>
    </Head>
    <Provider store={QuestionStore}>
    <ProgressBarLoading />
    <Header SetSideBar={() => setOpen(!SideBarOpen)} goToFolders={true}/>
      <QuestionnairePanelContainer>
        <PanelInnerContainer> 
          { QuestionnaireInfo ?  
          <QuestionnairePanelHeader SideState={SideState} ChangeSide={SetSideState} 
          Questionnaire={QuestionnaireInfo}/> : <Skeleton active rows={5} />}
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