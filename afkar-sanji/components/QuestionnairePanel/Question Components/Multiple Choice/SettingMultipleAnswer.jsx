import React, { useState } from 'react'
import { AlphabetNumberContainer, ToggleContainer } from '@/styles/questionnairePanel/QuestionSetting';
import ToggleCheckBoxItem from '../Common/Toggle';
import { Checkbox, Input, InputNumber, Switch } from 'antd';

const SettingMultipleAnswer = () => {
    const [ AdditionalOptionState , SetAdditionalOptionState ] = useState(false);
    const [ MultipleAnswerState , SetMultipleAnswerState ] = useState(false);

  return (
    <ToggleContainer>
        <div className='checkbox_container' onClick={() => SetMultipleAnswerState(!MultipleAnswerState)}>
            <p>سوال چند انتخابی باشد</p>
            <Switch checked={MultipleAnswerState} />
        </div>
       { MultipleAnswerState ? <AlphabetNumberContainer>
          <p>تعداد گزینه های قابل انتخاب</p>
          <label>
              <InputNumber min={0} />
              <p>حداقل</p>
          </label>
          <label>
              <InputNumber min={0} />
              <p>حداکثر</p>
          </label>
        </AlphabetNumberContainer> : ''}
         <div className='additional_options_container'>
            <div className='additional_option_toggle' onClick={() => SetAdditionalOptionState(!AdditionalOptionState)}>
                <Switch checked={AdditionalOptionState} />
                <p>گزینه های اضافی</p>
            </div>
            {AdditionalOptionState ? <div className='additional_option_checkboxes_container'>
                <div className='additional_checkbox'>
                    <Switch />
                    <p>همه گزینه ها</p>
                </div>
                <div className='additional_checkbox'>
                    <Switch />
                    <p>هیچ کدام</p>
                </div>
                <div className='additional_checkbox'>
                    <Switch />
                    <p>سایر</p>
                </div>
            </div> : ''}
        </div>
        <div className='checkbox_container'>
            <p>پاسخ به سوال اجباری باشد</p>
            <Switch/>
        </div>
        <div className='checkbox_container'>
            <p>عدم نمایش شماره ی سوال</p>
            <Switch/>
        </div>
        <div className='checkbox_container'>
            <p>گزینه ها عمودی چیده شوند</p>
            <Switch/>
        </div>
    </ToggleContainer>
    
  )
}
export default SettingMultipleAnswer;