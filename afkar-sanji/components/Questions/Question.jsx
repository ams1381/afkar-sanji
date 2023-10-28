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
import { useRef } from 'react';

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
const QuestionComponent = ({ QuestionInfo , Questionnaire , ChildQuestion , slidemode , mobilepreview , errorMessage , UUID }) => {
  const QuestionBodyComponent = QuestionComponentBodyProvider(QuestionInfo.question_type,QuestionInfo);

  const regex = /(<([^>]+)>)/gi;
  
  return (
    QuestionInfo.question_type == 'welcome_page' ? <WelcomeComponent WelcomeInfo={QuestionInfo} mobilepreview={mobilepreview} /> 
    : QuestionInfo.question_type != 'thanks_page' ? <QuestionComponentContainer id={`question-${QuestionInfo.id}`}  onWheel={e => e.stopPropagation()}
    className={`question_component  ${QuestionInfo.group ? 'group_question' : ''} `}
    childq={ChildQuestion ? 'true' : null} mobilepreview={mobilepreview} slidemode={slidemode}>
        <div className='question_header' >
        <QuestionTitle>
            <p>{<>{QuestionInfo.title?.replace(regex,"")} {(QuestionInfo.is_required && ' * ')} </>}</p>
            { Questionnaire?.show_number ? <span className='question_number'>
            { '-' + (persianNumberMin.convertEnToPe(QuestionInfo.placement)) }
            </span> : '' }
        </QuestionTitle>
     
        <QuestionDescription>
            <p>{QuestionInfo.description && QuestionInfo.description != 'null' ? 
            QuestionInfo.description.replace(regex,"") :
             QuestionInfo.question_text && QuestionInfo.question_text != 'null' ?
              QuestionInfo?.question_text?.replace(regex,"") : ''}</p>
              { 
              QuestionInfo.question_type == 'number_answer' &&
              <span>لطفا عددی را بین {QuestionInfo.min} تا {QuestionInfo.max} وارد کنید</span> 
              }
        </QuestionDescription>

        { QuestionInfo.media ?
            (typeof QuestionInfo.media == 'object') ?
            <div className='uploaded_file_preview' style={{ margin : '20px 0' }}>
                { detectFileFormat(QuestionInfo.media.name) == 'Picture' ? 
                <Image width='100%' src={URL.createObjectURL(QuestionInfo.media)}
                 placeholder={true} /> : <Player >
                 <source src={URL.createObjectURL(QuestionInfo.media)} />
               </Player>}
            </div> 
            : <div className='uploaded_file_preview' style={{ margin : '20px 0' }}>
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
            <QuestionComponent QuestionInfo={item.question} Questionnaire={Questionnaire} 
            ChildQuestion='active'/>)
        : QuestionBodyComponent}
       { errorMessage ?  <p className='answer_error_message'>{errorMessage}</p> : ''}
    </QuestionComponentContainer> 
      : <ThankComponent UUID={UUID} ThanksInfo={QuestionInfo}/>
  )
}
export default QuestionComponent;