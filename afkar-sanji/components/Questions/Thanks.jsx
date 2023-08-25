import { QuestionComponentContainer, QuestionDescription, QuestionTitle } from '@/styles/questionnairePanel/QuestionComponent';
import { detectFileFormat } from '@/utilities/FormData';
import { Image } from 'antd';
import React from 'react'
import { Player } from 'video-react';

const ThankComponent = ({ ThanksInfo }) => {
  const regex = /(<([^>]+)>)/gi;
  return (
    <QuestionComponentContainer>
    <QuestionTitle>
            { ThanksInfo.show_number ? <span className='question_number'>
            </span> : '' }
            <p>{ThanksInfo.title.replace(regex,"")}</p>
        </QuestionTitle>
        { ThanksInfo.media ?
            (typeof ThanksInfo.media == 'object') ?
            <div className='uploaded_file_preview' style={{ margin : '1.5rem 0' }}>
                { detectFileFormat(ThanksInfo.media.name) == 'Picture' ? 
                <Image width='100%' src={URL.createObjectURL(ThanksInfo.media)}
                 placeholder={true} /> : <Player >
                 <source src={URL.createObjectURL(ThanksInfo.media)} />
               </Player>}
            </div> 
            : <div className='uploaded_file_preview' style={{ margin : '1.5rem 0' }}>
                { detectFileFormat(ThanksInfo.media) == 'Picture' ? 
                <Image width='100%' src={ThanksInfo.media}
                placeholder={true} /> : <Player>
                <source src={ThanksInfo.media} />
              </Player>}
            </div>  : ''
            }
        <QuestionDescription>
            <p>{ThanksInfo.description ? ThanksInfo.description.replace(regex,"") :
             ThanksInfo.question_text ? ThanksInfo.question_text.replace(regex,"") : ''}</p>
        </QuestionDescription>
    </QuestionComponentContainer>
  )
}
export default ThankComponent;