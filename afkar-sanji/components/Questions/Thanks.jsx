import { QuestionDescription, QuestionTitle } from '@/styles/questionnairePanel/QuestionComponent';
import React from 'react'

const ThankComponent = ({ QuestionInfo }) => {
  return (
    <>
    <QuestionTitle>
            { QuestionInfo.show_number ? <span className='question_number'>
                
            </span> : '' }
            <p>{QuestionInfo.title.replace(regex,"")}</p>
        </QuestionTitle>
        <QuestionDescription>
            <p>{QuestionInfo.description ? QuestionInfo.description.replace(regex,"") :
             QuestionInfo.question_text ? QuestionInfo.question_text.replace(regex,"") : ''}</p>
        </QuestionDescription>
    </>
  )
}
export default ThankComponent;