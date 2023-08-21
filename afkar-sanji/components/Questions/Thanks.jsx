import { QuestionComponentContainer, QuestionDescription, QuestionTitle } from '@/styles/questionnairePanel/QuestionComponent';
import React from 'react'

const ThankComponent = ({ QuestionInfo }) => {
  const regex = /(<([^>]+)>)/gi;
  return (
    <QuestionComponentContainer>
    <QuestionTitle>
            { QuestionInfo.show_number ? <span className='question_number'>
                
            </span> : '' }
            <p>{QuestionInfo.title.replace(regex,"")}</p>
        </QuestionTitle>
        <QuestionDescription>
            <p>{QuestionInfo.description ? QuestionInfo.description.replace(regex,"") :
             QuestionInfo.question_text ? QuestionInfo.question_text.replace(regex,"") : ''}</p>
        </QuestionDescription>
    </QuestionComponentContainer>
  )
}
export default ThankComponent;