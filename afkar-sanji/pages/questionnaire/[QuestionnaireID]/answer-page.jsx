import React from 'react'
import ViewQuestions from './view-questions'
import { Provider } from 'react-redux'
import AnswerStore from '@/utilities/stores/AnswerStore'
import Head from 'next/head'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'
import { baseURL } from '@/utilities/axios'
import QuestionStore from '@/utilities/stores/QuestionStore'
import {PreviewPage, PreviewPageContainer, PreviewQuestionsContainer} from "@/styles/questionnairePanel/ViewQuestions";

const AnswerPage = () => {
  const router = useRouter();
  const [ AnswerSetID , setAnswerSetID ] = useState(null);
  const [ AnswerSetError , setAnswerSetError ] = useState(null);
  // console.log(data)
  useEffect(() => {
    const answerSetCreator = async () => {
      try
      {
        let { data } = await axios.post(`question-api/questionnaires/${router.query.QuestionnaireID}/answer-sets/`);
        setAnswerSetID(data.id)
      }
      catch(err)
      {
        if(err.response?.status == 400)
          setAnswerSetError('پرسشنامه فعال نیست یا زمان پاسخ دادن به آن فرا نرسیده')
        else if(err.response?.status  == 500)
          setAnswerSetError('مشکل سمت سرور')
      }
    }
    if(router.query.QuestionnaireID)
      answerSetCreator();
    
  },[router.query.QuestionnaireID])
  return (
    <>
    <Head>
      <title>Answer Page</title>
      </Head>
     {AnswerSetID ? <Provider store={AnswerStore}>
       <ViewQuestions answerSetID={AnswerSetID}/>
      </Provider> : <PreviewPage>
         <PreviewPageContainer style={{ justifyContent : 'center' }}>
         <PreviewQuestionsContainer style={{ textAlign : 'center' }}>
         <p>{AnswerSetError}</p>
       </PreviewQuestionsContainer>
       </PreviewPageContainer>
       </PreviewPage>}
    </>
    
    
  )
}
// export const getServerSideProps = async (context) => {
//   const { QuestionnaireID } = context.query;
//   try {
//     const { data } = await axios.post(`${baseURL}question-api/questionnaires/${QuestionnaireID}/answer-sets/`);
//     return {
//       props: { data },
//     };
//   } catch (error) {
//     console.error('Error creating answer set:', error);
//     return {
//       props: { data: null },
//     };
//   }
// }
export default AnswerPage;