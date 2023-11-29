import { Header } from '@/components/common/Header';
import { axiosInstance } from '@/utilities/axios';
import Head from 'next/head';
import { useRouter } from 'next/router'
import React, {useContext, useEffect, useState} from 'react'
import QuestionnairePanelHeader from '@/components/QuestionnairePanel/QuestionnairePanelHeader';
import { Skeleton } from 'antd';
import { QuestionnairePanelContainer , PanelInnerContainer} from '@/styles/questionnairePanel/QuestionnairePanelHeader';
import { Icon } from '@/styles/icons';
import SettingPanel from '@/components/QuestionnairePanel/QuestionnaireSetting/SettingPanel';
import QuestionDesignPanel from '@/components/QuestionnairePanel/QuestionDesignPanel';
import ProgressBarLoading from '@/styles/ProgressBarLoading';
import { Provider } from 'react-redux';
import QuestionStore from '@/utilities/stores/QuestionStore';
import { message } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { CommonDrawer } from '@/components/common/CommonDrawer';
import { PageBox } from '@/styles/common';
import {AuthContext} from "@/utilities/AuthContext";
import {useLocalStorage} from "@/utilities/useLocalStorage";
import {ChatModal} from "@/components/Questioner/ChatModal/ChatModal";
import {SettingSekelton} from "@/components/QuestionnairePanel/QuestionnaireSetting/SettingSkeleton";

export const beforeUnloadHandler = function (e) {
    e.preventDefault();
    e.returnValue = '';
  };
const QuestionnairePanel = ({ cookies }) => {
    const router = useRouter();
    const authContext = useContext(AuthContext);
    const { getItem } = useLocalStorage();
    const [ messageApi , messageContext ] = message.useMessage()
    const [ SideBarOpen , setOpen ] = useState(false);
    const [ SideState , SetSideState ] = useState('question_design');
    const [ QuestionnaireReloader , SetQuestionnaireReloader ] = useState(false);
    const [ RightDrawerOpen , setRightDrawerOpen ] = useState(false);
    const [ chatModalActive , setChatModalActive ] = useState(false);
    const RegionQuery = useQuery(['RegionQuery'],async () => await axiosInstance.get(`/user-api/nested-countries/`),{
        refetchOnWindowFocus : false
    })
    // axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + cookies?.access_token;
    const { data , isLoading , refetch , error , isFetched} = useQuery(['QuestionnaireRetrieve'],
    async () => await axiosInstance.get(`/${getItem('roleReq') ? getItem('roleReq') : 'question-api/questionnaires'}/${router?.query?.QuestionnaireID}/`),{
      refetchOnWindowFocus : false
    })

    if(error && error?.response)
    {
      if(error?.response.status == 404)
          router.push('/404')
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
    if(typeof window != 'undefined')
    window.addEventListener('beforeunload',beforeUnloadHandler)
    // useEffect(() => {
    //   refetch();
    // },[SideState])
  return (
    <>
     <style global jsx>{`
            html,
            body {
              overflow: hidden;
            }
            .ant-select-item-empty
            {
              text-align: right;
              padding: 10px;
              color: var(--Neutral-Gray6);
            }
            .ant-cascader-menus
            {
              direction: rtl;
            }
            .ant-cascader-menu-item-expand-icon
            {
              transform: rotate(180deg);
            }
            .ant-select-dropdown.css-dev-only-do-not-override-byeoj0, .ant-select-dropdown.css-17a39f8
            {
              width: 400px !important;
            }
            @media screen and (max-width : 768px)
            {
              html,
              body {
                overflow: scroll;
              }
            }
    `}</style>
    <Head>
      <title> Afkar Sanji | Questionnaire</title>
    </Head>
    <Provider store={QuestionStore}>
    <ProgressBarLoading />
    {messageContext}
    <PageBox>
      <Header SetSideBar={() => setOpen(!SideBarOpen)} cookies={cookies}
      goToFolders={true} loadingHeader={isLoading}
      Questionnaire={data?.data}/>
        <CommonDrawer RightDrawerOpen={RightDrawerOpen} setRightDrawerOpen={setRightDrawerOpen} />
        <main style={{ width : RightDrawerOpen ? '84%' : '100%', transition : '0.3s' }}>
        <QuestionnairePanelContainer>
          <PanelInnerContainer> 
            {  <QuestionnairePanelHeader SideState={SideState} isFetched={isFetched}
                 RightDrawerOpen={RightDrawerOpen}
                 setChatModalActive={setChatModalActive} chatModalActive={chatModalActive}
            ChangeSide={SetSideState} Questionnaire={data?.data}/>}
            {
              SideState == 'question_design' ? <QuestionDesignPanel QuestionnaireReloader={refetch}
              Questionnaire={data?.data} RightDrawerOpen={RightDrawerOpen}  />
              : (data?.data && !RegionQuery.isLoading )? <SettingPanel setChatModalActive={setChatModalActive} Questionnaire={data?.data} regions={RegionQuery.data?.data}  ChangeSide={SetSideState}
              refetch={refetch}/> : <SettingSekelton />
              }
            </PanelInnerContainer>
        </QuestionnairePanelContainer>
        </main>
      </PageBox>
      </Provider>

    </>
  )
}
export default QuestionnairePanel;

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = req.headers.cookie;
  const urlDest = req.url;

  if (cookies) {
    // Parse the cookies
    const parsedCookies = cookies.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
  
    return {
      props: {
        cookies: parsedCookies,
      },
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: "/auth?returnUrl=" + urlDest
    }
  };
}  