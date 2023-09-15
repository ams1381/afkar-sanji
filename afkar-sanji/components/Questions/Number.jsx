import { NumberInputContainer } from '@/styles/questionnairePanel/QuestionComponent'
import { ChangeInputAnswer } from '@/utilities/AnswerStore'
import { Input, InputNumber } from 'antd'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector  , useDispatch} from 'react-redux'

export const Number = ({ QuestionInfo }) => {
  const dispatcher = useDispatch();
  const QuestionsAnswerSet = useSelector(state => state.reducer.AnswerSet);
  const [ NumberAnswer , setNumberAnswer ] = useState(null);

  useEffect(() => {
    
    if(QuestionsAnswerSet && QuestionsAnswerSet.length)
    {
      if(QuestionsAnswerSet.find(item => item.question == QuestionInfo.id).answer?.number_answer)
        setNumberAnswer(QuestionsAnswerSet.find(item => item.question == QuestionInfo.id).answer?.number_answer);
      else
        setNumberAnswer(null)
    }
  },[QuestionInfo.id])
  const NumberAnswerHandler = (NumberValue) => {
    setNumberAnswer(NumberValue)
    if(QuestionsAnswerSet && QuestionsAnswerSet.length)
    {
      dispatcher(ChangeInputAnswer({
         QuestionID : QuestionInfo.id ,
         InputName : 'number_answer' ,
         InputValue : NumberValue
        }))
      // number_answer
    }
  }
  return (
    // <EmailInputContainer>
    <NumberInputContainer>
        <InputNumber type='number' value={NumberAnswer}
        onChange={NumberAnswerHandler}
         style={{ fontFamily : 'IRANSans' , direction : 'ltr' , textAlign : 'left' }}
         placeholder={!(QuestionInfo.min == 0 && QuestionInfo.max == 0) ? `از ${QuestionInfo.min ? QuestionInfo.min : 'فلان'} تا ${QuestionInfo.max ? QuestionInfo.max : 'بیسار'}` : 'یک عدد وارد کنید'} />
    </NumberInputContainer>
  )
}
