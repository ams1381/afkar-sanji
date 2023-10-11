import React from 'react'
import { useDispatch } from 'react-redux'
import { CommonSetting } from '../Common/CommonSetting';
import { Checkbox, Divider, Switch } from 'antd';
import { ToggleContainer } from '@/styles/questionnairePanel/QuestionSetting';
import { ChangeMinOrMaxAnswerHandler } from '@/utilities/stores/QuestionStore';

export const RangeSetting = ({ QuestionInfo }) => {
    const dispatcher = useDispatch();

    const ZeroStartHandler = (ZeroStartToggle) => {
        
        ZeroStartToggle ? 
        dispatcher(ChangeMinOrMaxAnswerHandler(
            { QuestionID : QuestionInfo.id , 
                MinMaxName : 'min' , 
                MinMaxValue : 0 ,
                group : QuestionInfo.group
            }))
        :
        dispatcher(ChangeMinOrMaxAnswerHandler(
            { QuestionID : QuestionInfo.id , 
                MinMaxName : 'min' , 
                MinMaxValue : 1 , 
                group : QuestionInfo.group
            }))
    }

  return (
    <>
    <ToggleContainer>
    <div className='checkbox_container' 
        onClick={() => ZeroStartHandler(!(QuestionInfo.min == 0))}>
            <p>شروع از صفر</p>
            <Switch checked={QuestionInfo.min == 0}/>
        </div>
        </ToggleContainer>
        <CommonSetting QuestionInfo={QuestionInfo}/>
    </>
  )
}
