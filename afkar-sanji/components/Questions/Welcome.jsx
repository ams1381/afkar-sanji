import { WelcomeComponentContainer , QuestionComponentContainer } from '@/styles/questionnairePanel/QuestionComponent';
import { detectFileFormat } from '@/utilities/FormData';
import { Button, Image } from 'antd'
import React from 'react'
import { Player } from 'video-react';

const WelcomeComponent = ({ WelcomeInfo , SetCurrentIndex , mobilepreview , swiperMode}) => {
  const regex = /(<([^>]+)>)/gi;
  return (
    <QuestionComponentContainer mobilepreview={mobilepreview}>
      <WelcomeComponentContainer>
          <p className='welcome_title'>{WelcomeInfo.title ? WelcomeInfo.title.replace(regex,"") : ''}</p>
          <p className='welcome_description'>{WelcomeInfo.description ? WelcomeInfo.description.replace(regex,"") : ''}</p>
          { WelcomeInfo.media ?
            (typeof WelcomeInfo.media == 'object') ?
            <div className='uploaded_file_preview' style={{ margin : '1.5rem 0' }}>
                { detectFileFormat(WelcomeInfo.media.name) == 'Picture' ? 
                <Image width='100%' src={URL.createObjectURL(WelcomeInfo.media)}
                 placeholder={true} /> : <Player >
                 <source src={URL.createObjectURL(WelcomeInfo.media)} />
               </Player>}
            </div> 
            : <div className='uploaded_file_preview' style={{ margin : '1.5rem 0' }}>
                { detectFileFormat(WelcomeInfo.media) == 'Picture' ? 
                <Image width='100%' src={WelcomeInfo.media}
                placeholder={true} /> : <Player>
                <source src={WelcomeInfo.media} />
              </Player>}
            </div>  : ''
            }
          <Button type='primary' onClick={SetCurrentIndex ? swiperMode ? SetCurrentIndex : () => SetCurrentIndex(0) : null}>
            {WelcomeInfo.button_text ? WelcomeInfo.button_text.replace(regex,"") : ''}
            </Button>
      </WelcomeComponentContainer>
    </QuestionComponentContainer>
  )
}
export default WelcomeComponent;