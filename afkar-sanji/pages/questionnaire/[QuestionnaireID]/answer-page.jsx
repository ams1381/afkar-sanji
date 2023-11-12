import React, {useContext} from 'react'
import ViewQuestions from './view-questions'
import { Provider } from 'react-redux'
import AnswerStore from '@/utilities/stores/AnswerStore'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'
import {PreviewPage, PreviewPageContainer, PreviewQuestionsContainer} from "@/styles/questionnairePanel/ViewQuestions";
import {AuthContext} from "@/utilities/AuthContext";

const AnswerPage = () => {
  const router = useRouter();
  const Auth = useContext(AuthContext);
  const [ AnswerSetID , setAnswerSetID ] = useState(null);
  const [ AnswerSetError , setAnswerSetError ] = useState(null);

  useEffect(() => {
    const answerSetCreator = async () => {
      try
      {
        let { data } = await axios.post(`${Auth.reqRole}/${router.query.QuestionnaireID}/answer-sets/`);
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

export default AnswerPage;