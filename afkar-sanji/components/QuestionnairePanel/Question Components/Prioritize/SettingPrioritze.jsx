import React, { useState } from 'react'
import { ToggleContainer } from '@/styles/questionnairePanel/QuestionSetting';
import ToggleCheckBoxItem from '../Common/Toggle';
import { Checkbox, Switch } from 'antd';
import { useDispatch } from 'react-redux';
import { ChangeToggleHandler } from '@/utilities/stores/QuestionStore';
import { CommonSetting } from '../Common/CommonSetting';

export const SettingPrioritize = ({ QuestionInfo }) => {
    const [ AdditionalOptionState , SetAdditionalOptionState ] = useState(false);
    const PrioritizeDispatcher = useDispatch();

    const RegularToggleHandler = (Event , TName) => {
        PrioritizeDispatcher(ChangeToggleHandler({
           QuestionID : QuestionInfo.id ,
            ToggleName : TName ,
             ToggleValue : Event ,
             group : QuestionInfo.group
          }))
    }
  return (
    <ToggleContainer>
         <div className='checkbox_container' onClick={e => RegularToggleHandler(!QuestionInfo.is_random_options,'is_random_options')}>
            <p>تصادفی سازی ترتیب گزینه ها</p>
            <Switch checked={QuestionInfo.is_random_options}/>
        </div>
        <CommonSetting QuestionInfo={QuestionInfo}/>
    </ToggleContainer>
  )
}
