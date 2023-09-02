import { QuestionWithAnswerContainer, TextAnswerInputBox } from '@/styles/questionnairePanel/QuestionComponent';
import { ClearSearchInputButton } from '@/styles/questionnairePanel/QuestionDesignPanel';
import { ChangeInputAnswer } from '@/utilities/AnswerStore';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch , useSelector} from 'react-redux';

const InputAnswer = ({ InputPlaceholder , QuestionInfo }) => {
  const [ ShowClearButtonState , SetShowClearButtonState ] = useState(false);
  const QuestionsAnswerSet = useSelector(state => state.reducer.AnswerSet)
  const [ textAnswer , setTextAnswer ] = useState(null);
  const dispatcher = useDispatch();

  useEffect(() => {
    if(QuestionsAnswerSet && QuestionsAnswerSet.length)
    {
      setTextAnswer(QuestionsAnswerSet.find(item => item.question == QuestionInfo.id).answer?.text_answer)
    
    }
      
  },[])

  const ChangeInputHandler = (e) => {
      e.target.value ? SetShowClearButtonState(true) : false ;
      setTextAnswer(e.target.value)

    if(QuestionsAnswerSet && QuestionsAnswerSet.length)
      dispatcher(ChangeInputAnswer({
          QuestionID : QuestionInfo.id ,
          InputName : 'text_answer' ,
          InputValue : e.target.value 
    }))
  }
  return (
    <QuestionWithAnswerContainer>
        <TextAnswerInputBox value={textAnswer}
        type={ QuestionInfo ? (QuestionInfo.pattern.includes('phone_number') || 
        QuestionInfo.pattern.includes('phone_number') || 
          QuestionInfo.pattern.includes('number_character')) ? 'number' : 'text' : 'text' } 
        onChange={ChangeInputHandler} placeholder={InputPlaceholder} />
       { ShowClearButtonState ? <ClearSearchInputButton /> : ''}
    </QuestionWithAnswerContainer>
  )
}
export default InputAnswer;
