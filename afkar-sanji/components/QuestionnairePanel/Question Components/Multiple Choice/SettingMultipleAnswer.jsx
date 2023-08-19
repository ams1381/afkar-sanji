import React from 'react'
import { ToggleContainer } from '@/styles/questionnairePanel/QuestionSetting';
import ToggleCheckBoxItem from '../Common/Toggle';
import { Checkbox } from 'antd';

const SettingMultipleAnswer = () => {
  return (
    <ToggleContainer>
        <div className='checkbox_container'>
            <p>سوال چند انتخابی باشد</p>
            <Checkbox/>
        </div>
        <div className='multiple_select_inputs'>
            
        </div>
        <div className='additional_options_container'>
            <div className='additional_option_toggle'>
                <Checkbox />
                <p>گزینه های اضافی</p>
            </div>
            <div>
                
            </div>
        </div>
    </ToggleContainer>
    
  )
}
export default SettingMultipleAnswer;