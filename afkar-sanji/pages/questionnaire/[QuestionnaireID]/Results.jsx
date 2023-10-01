import { ResultHeader } from '@/components/ResultPage/ResultHeader';
import { Header } from '@/components/common/Header';
import Head from 'next/head';
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { PanelInnerContainer } from '@/styles/questionnairePanel/QuestionnairePanelHeader';
import { useQueries, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/utilities/axios';
import { useRouter } from 'next/router';
import { ResultBody } from '@/components/ResultPage/ResultBody';
import ProgressBarLoading from '@/styles/ProgressBarLoading';

const ResultsPage = ({ cookies }) => {
  const [ SideBarOpen , setOpen ] = useState(false);
  const router = useRouter();
  const [ CurrentPage , SetCurrentPage ] = useState(1);
  const CurrentRef = useRef(1);
  const [ StartDate , setStartDate ] = useState('');
  const [ EndDate , setEndDate ] = useState('')
  const [ SearchValue , setSearchValue ] = useState(null);
  const [ QuestionnaireQuery , ResultQuery ] = useQueries({
    queries: [
      {
        queryKey: ['questionnaire'],
        queryFn: async () => await axiosInstance.get(`/question-api/questionnaires/${router.query.QuestionnaireID}/`),
      },
      {
        queryKey: ['result'],
        queryFn: async () =>
          await axiosInstance.get(`/result-api/${router.query.QuestionnaireID}/answer-sets/?answered_at=&end_date=${EndDate}&page=${CurrentPage}&start_date=${StartDate}`) ,
      },
    ],
  });
  const SearchQuery = useQuery(['ResultSearch'],
    async () => await axiosInstance.get(`/result-api/${router.query.QuestionnaireID}/answer-sets/search/?search=${SearchValue}`),{
    enabled : SearchValue ? true : false
  })
  // ResultQuery.

  useEffect(() => {
    if(CurrentPage != CurrentRef.current)
    {
      ResultQuery.refetch();
      CurrentRef.current = CurrentPage;
    }
  },[CurrentPage])
  useEffect(() => {
    ResultQuery.refetch();
  },[StartDate , EndDate])
  return (
    <>
    <Head>
      <title>Afkar Sanji | Result Page</title>
    </Head>
    <ProgressBarLoading />
    <Header SetSideBar={() => setOpen(!SideBarOpen)} cookies={cookies}
     goToFolders={true} loadingHeader={QuestionnaireQuery.isLoading}
    Questionnaire={QuestionnaireQuery.data?.data}/>
    <PanelInnerContainer>
      <ResultHeader QuestionnaireQuery={QuestionnaireQuery}/>
      <ResultBody ResultQuery={SearchValue ? SearchQuery : ResultQuery}
       SetCurrentPage={SetCurrentPage} queryStatus={SearchValue ? 'Search' : 'Result'}
      QuestionnaireQuery={QuestionnaireQuery} setEndDate={setEndDate} setSearchValue={setSearchValue}
       setStartDate={setStartDate}/>
    </PanelInnerContainer>
    </>
  )
}
export default ResultsPage;
export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = req.headers.cookie;

  // Check if cookies are present
  if (cookies) {
    // Parse the cookies
    const parsedCookies = cookies.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});

    return {
      props: {
        // Pass the cookies as props to the component
        cookies: parsedCookies,
      },
    };
  }

  // Handle the case where cookies are undefined

  return {
    props: {
      cookies: null,
    },
  };
}