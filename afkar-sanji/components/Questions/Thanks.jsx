import { Icon } from '@/styles/icons';
import { QuestionComponentContainer, QuestionDescription, QuestionTitle } from '@/styles/questionnairePanel/QuestionComponent';
import { detectFileFormat } from '@/utilities/FormData';
import { Button, Image, Popover } from 'antd';
import React from 'react'
import { useState } from 'react';
import { Player } from 'video-react';
import { SharePopOverContent } from '../Folders/SharePopover';
import {baseurl} from "@/utilities/axios";

const ThankComponent = ({ ThanksInfo , mobilepreview , UUID}) => {
  const regex = /(<([^>]+)>)/gi;
  const [ copiedState , setCopiedState ] = useState(false);
  const [ sharePopoverState , setSharePopoverState ] = useState(false);
  return (
    <QuestionComponentContainer mobilepreview={mobilepreview}>
    <QuestionTitle>
            { ThanksInfo.show_number ? <span className='question_number'>
            </span> : '' }
            <p>{ThanksInfo.title.replace(regex,"")}</p>
        </QuestionTitle>
        <QuestionDescription>
            <p>{ThanksInfo.description ? ThanksInfo.description.replace(regex,"") :
             ThanksInfo.question_text ? ThanksInfo.question_text.replace(regex,"") : ''}</p>
        </QuestionDescription>
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
            {/* <div className='thanks_button_container'>
              <button>
                <p>کپی لینک</p>
              </button>
              <button>
                <Icon name='Share' />
              </button>
            </div> */}
              { ThanksInfo?.share_link && <div className='default_thanks_button_container' style={{ marginTop : 20 }}>
                  <button onClick={() => {
                    navigator.clipboard.writeText(`${baseurl}/questionnaire/${UUID}/answer-page/`)
                    setCopiedState(true);
                    }}>
                { copiedState ? <p>کپی شد</p> : <p>کپی لینک</p>}
                  </button>
                  <button onClick={() => setSharePopoverState(!sharePopoverState)}>
                      <Popover open={sharePopoverState}
                      onOpenChange={() => setSharePopoverState(false)}
                      content={<SharePopOverContent  UUID={UUID}/>}
                      />
                      <Icon name='Share' />
              </button>
              </div>}
            
    </QuestionComponentContainer>
  )
}
export default ThankComponent;