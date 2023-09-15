import React from 'react'
import ViewQuestions from './ViewQuestions'
import { Provider } from 'react-redux'
import AnswerStore from '@/utilities/AnswerStore'
import Head from 'next/head'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'
import { baseURL } from '@/utilities/axios'
import QuestionStore from '@/utilities/QuestionStore'

const AnswerPage = () => {
  const router = useRouter();
  const [ AnswerSetID , setAnswerSetID ] = useState(null)
  useEffect(() => {
    const answerSetCreator = async () => {
      try
      {
        let { data } = await axios.post(`${baseURL}question-api/questionnaires/${router.query.QuestionnaireID}/answer-sets/`);
        setAnswerSetID(data.id)
      }
      catch(err)
      {

      }
    }
    answerSetCreator();
    
  },[])
  return (
    <>
    <Head>
      <title>Answer Page</title>
      </Head>
     {AnswerSetID && <Provider store={AnswerStore}>
        <ViewQuestions answerSetID={AnswerSetID} />
      </Provider>}
    </>
    
    
  )
}
export default AnswerPage;