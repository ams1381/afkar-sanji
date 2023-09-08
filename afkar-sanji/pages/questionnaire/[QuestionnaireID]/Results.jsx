import { ResultHeader } from '@/components/ResultPage/ResultHeader';
import { Header } from '@/components/common/Header';
import Head from 'next/head';
import React from 'react'
import { useState } from 'react';
import { PanelInnerContainer } from '@/styles/questionnairePanel/QuestionnairePanelHeader';
import { useQueries } from '@tanstack/react-query';
import { axiosInstance } from '@/utilities/axios';
import { useRouter } from 'next/router';
import { ResultBody } from '@/components/ResultPage/ResultBody';
import ProgressBarLoading from '@/styles/ProgressBarLoading';



const ResultsPage = () => {
  const [ SideBarOpen , setOpen ] = useState(false);
  const router = useRouter();
  const [ QuestionnaireQuery , ResultQuery] = useQueries({
    queries: [
      {
        queryKey: ['questionnaire'],
        queryFn: async () =>
          await axiosInstance.get(`/question-api/questionnaires/${router.query.QuestionnaireID}/`)
      },

      {
        queryKey: ['result'],
        queryFn: async () =>
          await axiosInstance.get(`/result-api/${router.query.QuestionnaireID}/answer-sets/?answered_at&start_date&end_date`)
      },
    ],
  });

  return (
    <>
    <Head>
      <title>Afkar Sanji | Result Page</title>
    </Head>
    <ProgressBarLoading />
    <Header SetSideBar={() => setOpen(!SideBarOpen)} goToFolders={true}/>
    <PanelInnerContainer>
      <ResultHeader QuestionnaireQuery={QuestionnaireQuery}/>
      <ResultBody ResultQuery={ResultQuery} QuestionnaireQuery={QuestionnaireQuery}/>
    </PanelInnerContainer>
    </>
  )
}
export default ResultsPage;
