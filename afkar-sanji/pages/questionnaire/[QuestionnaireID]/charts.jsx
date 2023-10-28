import Head from 'next/head';
import React from 'react'
import { useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Header } from '@/components/common/Header';
import { PanelInnerContainer } from '@/styles/questionnairePanel/QuestionnairePanelHeader';
import { ChartsHeader } from '@/components/Charts/ChartsHeader';
import ProgressBarLoading from '@/styles/ProgressBarLoading';
import ChartsBody from '@/components/Charts/ChartBody';
import { axiosInstance } from '@/utilities/axios';
import { CommonDrawer } from '@/components/common/CommonDrawer';
import { PageBox } from '@/styles/common';

const ChartsPage = ({ cookies }) => {
  const [ SideBarOpen , setOpen ] = useState(false);
  const router = useRouter();
  const [ RightDrawerOpen , setRightDrawerOpen ] = useState(false);
  const [ QuestionnaireQuery , ChartQuery ] = useQueries({
    queries: [
      {
        queryKey: ['questionnaire'],
        queryFn: async () =>
          await axiosInstance.get(`/question-api/questionnaires/${router.query.QuestionnaireID}/`)
      },

      {
        queryKey: ['charts'],
        queryFn: async () =>
          await axiosInstance.get(`/result-api/${router.query.QuestionnaireID}/plots/`)
      },
    ],
  });
  return (
    <>
        <style global jsx>{`
            html,
            body {
              overflow: hidden;
            }
    `}</style>
      <Head>
        <title>Afkar Sanji | Charts</title>
      </Head>
      <ProgressBarLoading />
      <PageBox>
        <CommonDrawer RightDrawerOpen={RightDrawerOpen} setRightDrawerOpen={setRightDrawerOpen} />
        <main style={{ width : RightDrawerOpen ? '84%' : '100%', transition : '0.3s' }}>
        <Header SetSideBar={() => setOpen(!SideBarOpen)} cookies={cookies}
        goToFolders={true} loadingHeader={QuestionnaireQuery?.isLoading}
        Questionnaire={QuestionnaireQuery?.data?.data}/>
        <PanelInnerContainer>
          <ChartsHeader QuestionnaireQuery={QuestionnaireQuery}/>
          <ChartsBody ChartQuery={ChartQuery} QuestionnaireQuery={QuestionnaireQuery}/>
      </PanelInnerContainer>
      </main>
    </PageBox>
    </>
    
  )
}
export default ChartsPage;
export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = req.headers.cookie;
  const urlDest = req.url;


  if (cookies) {
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
  }
}