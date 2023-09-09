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

const ChartsPage = () => {
  const [ SideBarOpen , setOpen ] = useState(false);
  const router = useRouter();
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
      <Head>
        <title>Afkar Sanji | Charts</title>
      </Head>
      <ProgressBarLoading />
      <Header SetSideBar={() => setOpen(!SideBarOpen)} goToFolders={true}/>
      <PanelInnerContainer>
        <ChartsHeader QuestionnaireQuery={QuestionnaireQuery}/>
        <ChartsBody ChartQuery={ChartQuery} QuestionnaireQuery={QuestionnaireQuery}/>
    </PanelInnerContainer>
    </>
    
  )
}
export default ChartsPage;