import React, { useEffect, useState } from 'react'
import { QuestionTitle  , QuestionDescription , QuestionComponentContainer
} from '@/styles/questionnairePanel/QuestionComponent'
import OptionalComponent from './Optional';
import InputAnswer from './InputAnswer';
import DropDown from './DropDown';
import Prioritize from './Prioritize';
import Email from './Email';
import RateQuestion from './Rate';

const QuestionComponentBodyProvider = (QuestionType,QuestionInfo) => {
  switch(QuestionType)
    {
        case 'optional':
            return <OptionalComponent QuestionInfo={QuestionInfo} />
        case 'drop_down':
            return <></>
        case 'integer_selective':
            return <RateQuestion QuestionInfo={QuestionInfo} />
        case 'integer_range':
            return <></>
        case 'sort':
            return <Prioritize QuestionInfo={QuestionInfo}/>
        case 'link':
            return <InputAnswer QuestionInfo={QuestionInfo}/>
        case 'email_field':
            return <Email QuestionInfo={QuestionInfo}/>
        case 'dropdown':
            return <DropDown QuestionInfo={QuestionInfo}/>
        case 'file':
            return <></>
        case 'numberanswer':
            return <></>
        case 'textanswer':
            return <InputAnswer QuestionInfo={QuestionInfo}/>
        case 'number' :
            return <InputAnswer QuestionInfo={QuestionInfo}/>
  }
}

const QuestionComponent = ({ QuestionInfo }) => {
  const QuestionBodyComponent = QuestionComponentBodyProvider(QuestionInfo.question_type,QuestionInfo);
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
        {/* {QuestionBodyComponent} */}
    </QuestionComponentContainer>
  )
}
export default QuestionComponent;