import React, { useEffect, useState } from 'react'
import { QuestionTitle  , QuestionDescription , QuestionComponentContainer
} from '@/styles/questionnairePanel/QuestionComponent'
import OptionalComponent from './Optional';
import InputAnswer from './InputAnswer';
import DropDown from './DropDown';
import Prioritize from './Prioritize';
import Email from './Email';
import RateQuestion from './Rate';
import WelcomeComponent from './Welcome';
import ThankComponent from './Thanks';

const QuestionComponentBodyProvider = (QuestionType,QuestionInfo) => {
  switch(QuestionType)
    {
        case 'optional':
            return <OptionalComponent QuestionInfo={QuestionInfo} />
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
        case 'drop_down':
            return <DropDown QuestionInfo={QuestionInfo}/>
        case 'file':
            return <></>
        case 'numberanswer':
            return <InputAnswer InputPlaceholder='یک عدد وارد کنید' QuestionInfo={QuestionInfo}/>
        case 'textanswer':
            return <InputAnswer InputPlaceholder='sample@sample.com' QuestionInfo={QuestionInfo}/>
  }
}

const QuestionComponent = ({ QuestionInfo }) => {
  const QuestionBodyComponent = QuestionComponentBodyProvider(QuestionInfo.question_type,QuestionInfo);
  const regex = /(<([^>]+)>)/gi;

  return (
    QuestionInfo.question_type == 'welcome_page' ? <WelcomeComponent WelcomeInfo={QuestionInfo} /> 
    : QuestionInfo.question_type != 'thanks_page' ? <QuestionComponentContainer>
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
      : <ThankComponent QuestionInfo={QuestionInfo}/>
  )
}
export default QuestionComponent;