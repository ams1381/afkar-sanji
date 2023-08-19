import React, { useEffect, useState } from 'react'
import { QuestionTitle  , QuestionDescription , QuestionComponentContainer
} from '@/styles/questionnairePanel/QuestionComponent'
import Optional from './optional';
import InputAnswer from './InputAnswer';
import DropDown from './DropDown';
import Prioritize from './Prioritize';

const QuestionComponentBodyGenerator = (QuestionType) => <QuestionType/>;

const QuestionComponent = ({ QuestionInfo }) => {
  // let QuestionBodyType = QuestionInfo['question_type'];
  // console.log(QuestionBodyType)
  const  QuestionBodyType = QuestionInfo.question_type.charAt(0).toUpperCase() + QuestionInfo.question_type.slice(1);
  // QuestionBodyType = QuestionBodyType.charAt(0).toUpperCase() + QuestionInfo.question_type.slice(1);
  const QuestionBodyComponent = QuestionComponentBodyGenerator(QuestionBodyType);
  // useEffect(() => {
    // SetQuestionBodyType(QuestionInfo.question_type.charAt(0).toUpperCase() + QuestionInfo.question_type.slice(1))
  // },[])
  // SetQuestionBodyType(QuestionBodyType.replace("_",""))
  const regex = /(<([^>]+)>)/gi;

  return (
    <QuestionComponentContainer>
        <div className='question_header'>
        <QuestionTitle>
            { QuestionInfo.show_number ? <span className='question_number'>
                
            </span> : '' }
            <p>{QuestionInfo.title.replace(regex,"")}</p>
        </QuestionTitle>
        <QuestionDescription>
            <p>{QuestionInfo.description ? QuestionInfo.description.replace(regex,"") :
             QuestionInfo.question_text ? QuestionInfo.question_text.replace(regex,"") : ''}</p>
        </QuestionDescription>
        </div>
        {QuestionBodyComponent}
    </QuestionComponentContainer>
  )
}
export default QuestionComponent;