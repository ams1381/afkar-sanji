import React, { useState } from 'react'
import { ToggleContainer } from '@/styles/questionnairePanel/QuestionSetting';
import ToggleCheckBoxItem from '../Common/Toggle';
import { Checkbox } from 'antd';

export const SettingPrioritize = () => {
    const [ AdditionalOptionState , SetAdditionalOptionState ] = useState(false);
  return (
    <ToggleContainer>
        <div className='checkbox_container' >
            <p>سوال چند انتخابی باشد</p>
            <Checkbox />
        </div>
         <div className='additional_options_container'>
            <div className='additional_option_toggle' onClick={() => SetAdditionalOptionState(!AdditionalOptionState)}>
                <Checkbox checked={AdditionalOptionState} />
                <p>گزینه های اضافی</p>
            </div>
            {AdditionalOptionState ? <div className='additional_option_checkboxes_container'>
                <div className='additional_checkbox'>
                    <Checkbox />
                    <p>همه گزینه ها</p>
                </div>
                <div className='additional_checkbox'>
                    <Checkbox />
                    <p>هیچ کدام</p>
                </div>
                <div className='additional_checkbox'>
                    <Checkbox />
                    <p>سایر</p>
                </div>
            </div> : ''}
        </div>
    </ToggleContainer>
  )
}
