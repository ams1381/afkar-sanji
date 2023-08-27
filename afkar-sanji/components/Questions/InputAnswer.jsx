import { QuestionWithAnswerContainer, TextAnswerInputBox } from '@/styles/questionnairePanel/QuestionComponent';
import { ClearSearchInputButton } from '@/styles/questionnairePanel/QuestionDesignPanel';
import React, { useState } from 'react'

const InputAnswer = ({ InputPlaceholder , QuestionInfo }) => {
  const [ ShowClearButtonState , SetShowClearButtonState ] = useState(false);

  return (
    <QuestionWithAnswerContainer>
        <TextAnswerInputBox 
        type={ QuestionInfo ? (QuestionInfo.pattern.
          includes('phone_number') || QuestionInfo.pattern.includes('phone_number') || 
          QuestionInfo.pattern.includes('number_character')) ? 'number' : 'text' : 'text' } 
        onChange={e => {
          e.target.value ? SetShowClearButtonState(true) : false 
        }} placeholder={InputPlaceholder} />
       { ShowClearButtonState ? <ClearSearchInputButton /> : ''}
    </QuestionWithAnswerContainer>
  )
}
export default InputAnswer;
