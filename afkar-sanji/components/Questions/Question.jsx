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
import { FileQuestionComponent } from './File';
import { RangeQuestionComponent } from './Range';
import { Number } from './Number';
import { Player } from 'video-react';
import { Link } from './Link';
import Skeleton from 'react-loading-skeleton';
import { Image } from 'antd';
import { detectFileFormat } from '@/utilities/FormData';
import persianNumberMin from 'persian-number';

const QuestionComponentBodyProvider = (QuestionType,QuestionInfo) => {
  switch(QuestionType)
    {
        case 'optional':
            return <OptionalComponent QuestionInfo={QuestionInfo} />
        case 'integer_selective':
            return <RateQuestion QuestionInfo={QuestionInfo} />
        case 'integer_range':
            return <RangeQuestionComponent QuestionInfo={QuestionInfo} />
        case 'sort':
            return <Prioritize QuestionInfo={QuestionInfo}/>
        case 'link':
            return <Link QuestionInfo={QuestionInfo}/>
        case 'email_field':
            return <Email QuestionInfo={QuestionInfo}/>
        case 'drop_down':
            return <DropDown QuestionInfo={QuestionInfo}/>
        case 'file':
            return <FileQuestionComponent QuestionInfo={QuestionInfo} />
        case 'number_answer':
            return <Number QuestionInfo={QuestionInfo}/>
        case 'text_answer':
            return <InputAnswer InputPlaceholder={QuestionInfo.answer_template} QuestionInfo={QuestionInfo}/>
  }
}
const QuestionComponent = ({ QuestionInfo , ChildQuestion , mobilePreview }) => {
  const QuestionBodyComponent = QuestionComponentBodyProvider(QuestionInfo.question_type,QuestionInfo);
  const regex = /(<([^>]+)>)/gi;

  return (
    QuestionInfo.question_type == 'welcome_page' ? <WelcomeComponent WelcomeInfo={QuestionInfo} /> 
    : QuestionInfo.question_type != 'thanks_page' ? <QuestionComponentContainer className='question_component'
    childq={ChildQuestion ? 'true' : null} mobilePreview={mobilePreview}>
        <div className='question_header' >
        <QuestionTitle>
            <p>{<>{(QuestionInfo.is_required && ' * ')} {QuestionInfo.title?.replace(regex,"")} </>}</p>
            { !QuestionInfo.show_number ? <span className='question_number'>
            { '-' + (persianNumberMin.convertEnToPe(QuestionInfo.placement)) }
            </span> : '' }
        </QuestionTitle>
     
        <QuestionDescription>
            <p>{QuestionInfo.description ? QuestionInfo.description.replace(regex,"") :
             QuestionInfo.question_text ? QuestionInfo.question_text.replace(regex,"") : ''}</p>
        </QuestionDescription>

        { QuestionInfo.media ?
            (typeof QuestionInfo.media == 'object') ?
            <div className='uploaded_file_preview' style={{ margin : '1.5rem 0' }}>
                { detectFileFormat(QuestionInfo.media.name) == 'Picture' ? 
                <Image width='100%' src={URL.createObjectURL(QuestionInfo.media)}
                 placeholder={true} /> : <Player >
                 <source src={URL.createObjectURL(QuestionInfo.media)} />
               </Player>}
            </div> 
            : <div className='uploaded_file_preview' style={{ margin : '1.5rem 0' }}>
                { detectFileFormat(QuestionInfo.media) == 'Picture' ? 
                <Image width='100%' src={QuestionInfo.media}
                placeholder={true} /> : <Player>
                <source src={QuestionInfo.media} />
              </Player>}
            </div>  : ''
            }
        </div>
        {(QuestionInfo.question_type == 'group' && QuestionInfo.child_questions)? 
         QuestionInfo.child_questions.map(item => 
            <QuestionComponent QuestionInfo={item.question}/>)
        : QuestionBodyComponent}
    </QuestionComponentContainer> 
      : <ThankComponent ThanksInfo={QuestionInfo}/>
  )
}
export default QuestionComponent;