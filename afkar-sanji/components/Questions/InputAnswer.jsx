import { QuestionWithAnswerContainer, TextAnswerInputBox } from '@/styles/questionnairePanel/QuestionComponent';
import { ClearSearchInputButton } from '@/styles/questionnairePanel/QuestionDesignPanel';
import React, { useState } from 'react'

const InputAnswer = ({ InputPlaceholder }) => {
  const [ ShowClearButtonState , SetShowClearButtonState ] = useState(false);
  return (
    <QuestionWithAnswerContainer>
        <TextAnswerInputBox onChange={e => {
          e.target.value ? SetShowClearButtonState(true) : false 
        }} placeholder={InputPlaceholder} />
       { ShowClearButtonState ? <ClearSearchInputButton /> : ''}
    </QuestionWithAnswerContainer>
  )
}
export default InputAnswer;
