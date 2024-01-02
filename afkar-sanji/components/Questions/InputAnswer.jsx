import { QuestionWithAnswerContainer, TextAnswerInputBox } from '@/styles/questionnairePanel/QuestionComponent';
import { ClearSearchInputButton } from '@/styles/questionnairePanel/QuestionDesignPanel';
import { ChangeInputAnswer } from '@/utilities/stores/AnswerStore';
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
      
  },[QuestionInfo.id])

  const ChangeInputHandler = (e) => {
    if(QuestionInfo.pattern.includes('english_letters'))
    {
      const inputValue = event.target.value;
      const cleanedValue = inputValue.replace(/[^a-zA-Z\s]/g, '');

      setTextAnswer(cleanedValue)      
    }
    else if(QuestionInfo.pattern.includes('number_character'))
    {
      const inputValue = event.target.value;
      const cleanedValue = inputValue.replace(/[^0-9]/g, '');
      setTextAnswer(cleanedValue) 
    }
    else if(QuestionInfo.pattern.includes('mobile_number') || QuestionInfo.pattern.includes('phone_number'))
    {
      const inputValue = event.target.value;
      const cleanedValue = inputValue.replace(/[^0-9]/g, '');
      setTextAnswer(cleanedValue)

    }
    else if(QuestionInfo.pattern.includes('persian_letters')) {
      const inputValue = event.target.value;
      const cleanedValue = inputValue.replace(/[^\u0600-\u06FF\u0660-\u0669]/g, '');
      setTextAnswer(cleanedValue)
    }
    else 
    {
      e.target.value ? SetShowClearButtonState(true) : false ;
      setTextAnswer(e.target.value)
    }
      

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
        style={{ textAlign : QuestionInfo.pattern == 'english_letters' ? 'left' : 'right' ,
          direction : QuestionInfo.pattern !== 'english_letters' ? 'rtl' : 'ltr' }}
        type={ QuestionInfo ? (QuestionInfo.pattern.includes('phone_number') || 
        QuestionInfo.pattern.includes('phone_number') || 
          QuestionInfo.pattern.includes('number_character')) ? 'number' : 'text' : 'text' } 
        onChange={ChangeInputHandler} placeholder={InputPlaceholder} />
       { ShowClearButtonState ? <ClearSearchInputButton /> : ''}
    </QuestionWithAnswerContainer>
  )
}
export default InputAnswer;
