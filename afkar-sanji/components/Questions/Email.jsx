import { Icon } from '@/styles/icons'
import { EmailInputContainer } from '@/styles/questionnairePanel/QuestionComponent'
import { ChangeInputAnswer } from '@/utilities/AnswerStore'
import { Input } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const Email = ({ QuestionInfo }) => {
  const QuestionsAnswerSet = useSelector(state => state.reducer.AnswerSet)
  const [ emailAnswer , setEmailAnswer ] = useState(null);
  const dispatcher = useDispatch();
  useEffect(() => {
    if(QuestionsAnswerSet && QuestionsAnswerSet.length)
    {
      setEmailAnswer(QuestionsAnswerSet.find(item => item.question == QuestionInfo.id).answer?.email_field)
    }
      

  },[])
  const changeEmailAnswerHandler = (e) => {

    setEmailAnswer(e.target.value);
    if(QuestionsAnswerSet && QuestionsAnswerSet.length)
      dispatcher(ChangeInputAnswer({
        QuestionID : QuestionInfo.id , InputName : 'email_field' , InputValue : emailAnswer
      }))
  }
  return (
    <EmailInputContainer>
        <Input type='email' value={emailAnswer} style={{ border : 'none' }}
         placeholder='sample@sample.com' onChange={changeEmailAnswerHandler} />
        <span>
            <Icon name='GrayEmail' style={{ width : 15 }} />
        </span>
    </EmailInputContainer>
  )
}
export default Email;
