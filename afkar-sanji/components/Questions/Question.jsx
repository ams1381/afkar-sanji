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
import { Link } from './Link';
import Skeleton from 'react-loading-skeleton';
import { Image } from 'antd';

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
            return <InputAnswer InputPlaceholder='sample@sample.com' QuestionInfo={QuestionInfo}/>
  }
}
const detectFileFormat = (fileName) => {
    if(!fileName)
     return
     fileName = fileName.toLowerCase();
    let pictureFormats = ['jpg', 'jpeg', 'png', 'gif'];
    let videoFormats = ['mp4', 'avi', 'mkv', 'mov', 'flv', 'wmv'];
    let zip_formats  = ['zip','rar','7z'];
    let audio_formats = ['mp3','wav','ogg','mpeg-1']
    let fileFormat = fileName.split(".")[fileName.split(".").length - 1];

    return pictureFormats.includes(fileFormat) ? 'Picture' :
           videoFormats.includes(fileFormat) ? 'Video' : zip_formats.includes(fileFormat) ?
            'Zip' : audio_formats.includes(fileFormat) ? 'Audio' : 'UNKNOWN';
}
const QuestionComponent = ({ QuestionInfo , ChildQuestion }) => {
  const QuestionBodyComponent = QuestionComponentBodyProvider(QuestionInfo.question_type,QuestionInfo);

  const regex = /(<([^>]+)>)/gi;

  return (
    QuestionInfo.question_type == 'welcome_page' ? <WelcomeComponent WelcomeInfo={QuestionInfo} /> 
    : QuestionInfo.question_type != 'thanks_page' ? <QuestionComponentContainer
    childq={ChildQuestion ? 'true' : null}>
        <div className='question_header'>
        <QuestionTitle>
            { QuestionInfo.show_number ? <span className='question_number'>
                
            </span> : '' }
            <p>{QuestionInfo.title?.replace(regex,"")}</p>
        </QuestionTitle>
       
          { QuestionInfo.media ? 
            <div style={{ margin : '1.5rem 0' }}>
                { detectFileFormat(QuestionInfo.media) == 'Picture' ? 
                <Image width='100%' src={QuestionInfo.media} placeholder={true} /> : <Video></Video>}
            </div> : ''}
     
        <QuestionDescription>
            <p>{QuestionInfo.description ? QuestionInfo.description.replace(regex,"") :
             QuestionInfo.question_text ? QuestionInfo.question_text.replace(regex,"") : ''}</p>
        </QuestionDescription>
        </div>
        {(QuestionInfo.question_type == 'group' && QuestionInfo.child_questions)? 
         QuestionInfo.child_questions.map(item => 
            <QuestionComponent QuestionInfo={item.question}/>)
        : QuestionBodyComponent}
    </QuestionComponentContainer> 
      : <ThankComponent QuestionInfo={QuestionInfo}/>
  )
}
export default QuestionComponent;