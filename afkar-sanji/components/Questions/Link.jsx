import { EmailInputContainer } from '@/styles/questionnairePanel/QuestionComponent'
import { ChangeInputAnswer } from '@/utilities/stores/AnswerStore'
import { Input } from 'antd'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'

export const Link = ({ QuestionInfo }) => {
  const QuestionsAnswerSet = useSelector(state => state.reducer.AnswerSet);
  const [ LinkAnswer , setLinkAnswer ] = useState(null); 
  const dispatcher = useDispatch();
  useEffect(() => {
    if(QuestionsAnswerSet && QuestionsAnswerSet.length)
    {
      setLinkAnswer(QuestionsAnswerSet.find(item => item.question == QuestionInfo.id).answer?.Link)
    }
  },[QuestionInfo.id])
  const LinkAnswerHandler = (Value) => {
    const inputValue = event.target.value;
    const cleanedValue = inputValue.replace(/[^a-zA-Z@._\-]/g, '');

    setLinkAnswer(cleanedValue)  

    if(QuestionsAnswerSet && QuestionsAnswerSet.length)
    {
      dispatcher(ChangeInputAnswer({
         QuestionID : QuestionInfo.id ,
          InputName : 'link' ,
          InputValue : Value.target.value
        }))
    }
  }
  return (
    <EmailInputContainer >
        <Input type='text' value={LinkAnswer ? LinkAnswer : ''} onChange={LinkAnswerHandler}
        placeholder='www.google.com' style={{ textAlign : 'left' , direction : 'ltr' }} />
    </EmailInputContainer>
  )
}
