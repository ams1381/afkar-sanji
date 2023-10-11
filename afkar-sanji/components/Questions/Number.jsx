import { NumberInputContainer } from '@/styles/questionnairePanel/QuestionComponent'
import { ChangeInputAnswer } from '@/utilities/stores/AnswerStore'
import { digitsEnToFa, digitsFaToEn } from '@persian-tools/persian-tools'
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
    const inputValue = NumberValue.target.value ? digitsFaToEn(NumberValue.target.value) : '';
    const cleanedValue = inputValue.replace(/[^0-9]/g, '');

    setNumberAnswer(cleanedValue)
    if(QuestionsAnswerSet && QuestionsAnswerSet.length)
    {
      dispatcher(ChangeInputAnswer({
         QuestionID : QuestionInfo.id ,
         InputName : 'number_answer' ,
         InputValue : digitsFaToEn(NumberValue.target.value)
        }))
      // number_answer
    }
  }
  return (
    // <EmailInputContainer>
    <NumberInputContainer>
        <Input type='text' 
        value={NumberAnswer ? digitsEnToFa(NumberAnswer) : ''}
        onChange={NumberAnswerHandler}
         style={{ fontFamily : 'IRANSans' , direction : 'ltr' , textAlign : 'left' , borderRadius : 2 }}
        //  placeholder={!(QuestionInfo.min == 0 && QuestionInfo.max == 0) ? `از ${QuestionInfo.min ? digitsEnToFa(QuestionInfo.min) : digitsEnToFa(10000)} تا ${QuestionInfo.max ? digitsEnToFa(QuestionInfo.max) : digitsEnToFa(30000)}` : 'یک عدد وارد کنید'} 
         />
    </NumberInputContainer>
  )
}
