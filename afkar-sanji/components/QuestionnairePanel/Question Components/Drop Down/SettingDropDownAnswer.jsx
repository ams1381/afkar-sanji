import { AlphabetNumberContainer, ToggleContainer } from '@/styles/questionnairePanel/QuestionSetting';
import { ChangeToggleHandler , ChangeMinMaxHandler, OptionsAlphaBeticalSorter, ChangeMinOrMaxAnswerHandler } from '@/utilities/QuestionStore';
import { Checkbox, InputNumber, Switch } from 'antd';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

export const SettingDropDownAnswer = ({ QuestionInfo }) => {
    const [ AdditionalOptionState , SetAdditionalOptionState ] = useState(false);
    const [ MultipleAnswerState , SetMultipleAnswerState ] = useState(QuestionInfo.multiple_choice);
    const DropDownDispatcher = useDispatch();


    const MultipleAnswerToggleHandler = (Value) => {
        // SetMultipleAnswerState(!MultipleAnswerState)
        DropDownDispatcher(ChangeToggleHandler({ QuestionID : QuestionInfo.id , ToggleName : 'multiple_choice' , ToggleValue : Value}));
    }
    const ChangeMinMaxHandler = (event,InputName) => {
        DropDownDispatcher(ChangeMinOrMaxAnswerHandler({
             QuestionID : QuestionInfo.id , MinMaxName : InputName , MinMaxValue : event
         }))
    }
    const RegularToggleHandler = (Event , TName) => {
        DropDownDispatcher(ChangeToggleHandler({ QuestionID : QuestionInfo.id , ToggleName : TName , ToggleValue : Event}))

        if(TName == 'is_random_options')
            DropDownDispatcher(ChangeToggleHandler({ QuestionID : QuestionInfo.id , ToggleName : 'is_alphabetic_order' , ToggleValue : false}))
        if(TName == 'is_alphabetic_order')
        {
             DropDownDispatcher(ChangeToggleHandler({ QuestionID : QuestionInfo.id , ToggleName : 'is_random_options' , ToggleValue : false}))
             DropDownDispatcher(OptionsAlphaBeticalSorter({ QuestionID : QuestionInfo.id }))
        }
       
    }
    
  return (
    <ToggleContainer>
        <div className='checkbox_container' onClick={() => MultipleAnswerToggleHandler(!QuestionInfo.multiple_choice)}>
            <p>سوال چند انتخابی باشد</p>
            <Switch checked={QuestionInfo.multiple_choice} />
        </div>
       { QuestionInfo.multiple_choice ? <AlphabetNumberContainer>
          <p>تعداد گزینه های قابل انتخاب</p>
          <label>
              <InputNumber min={1} value={QuestionInfo.min_selected_options} 
              onChange={(e) => ChangeMinMaxHandler(e,'min_selected_options')} />
              <p>حداقل</p>
          </label>
          <label>
              <InputNumber min={1} value={QuestionInfo.max_selected_options} 
              onChange={(e) => ChangeMinMaxHandler(e,'max_selected_options')}/>
              <p>حداکثر</p>
          </label>
        </AlphabetNumberContainer> : ''}
         {/* <div className='additional_options_container'>
            <div className='additional_option_toggle' onClick={() => SetAdditionalOptionState(!AdditionalOptionState)}>
                <Switch checked={AdditionalOptionState} />
                <p>گزینه های اضافی</p>
            </div>
            {AdditionalOptionState ? <div className='additional_option_checkboxes_container'>
                <div className='additional_checkbox'>
                    <Switch checked={QuestionInfo.all_options}/>
                    <p>همه گزینه ها</p>
                </div>
                <div className='additional_checkbox'>
                    <Switch checked={QuestionInfo.nothing_selected}/>
                    <p>هیچ کدام</p>
                </div>
                <div className='additional_checkbox'>
                    <Switch />
                    <p>سایر</p>
                </div>
            </div> : ''}
        </div> */}
        <div className='checkbox_container' onClick={e => RegularToggleHandler(!QuestionInfo.show_number,'show_number')}>
            <p>عدم نمایش شماره ی سوال</p>
            <Switch checked={QuestionInfo.show_number}/>
        </div>
        <div className='checkbox_container' onClick={e => RegularToggleHandler(!QuestionInfo.is_required,'is_required')}>
            <p>پاسخ به سوال اجباری باشد</p>
            <Switch checked={QuestionInfo.is_required}/>
        </div>
        <div className='checkbox_container' onClick={e => RegularToggleHandler(!QuestionInfo.is_random_options,'is_random_options')}>
            <p>تصادفی سازی گزینه ها</p>
            <Switch checked={QuestionInfo.is_random_options}/>
        </div>
        <div className='checkbox_container' onClick={e => RegularToggleHandler(!QuestionInfo.is_alphabetic_order,'is_alphabetic_order')}>
            <p>مرتب سازی بر اساس حروف الفبا</p>
            <Switch checked={QuestionInfo.is_alphabetic_order}/>
        </div>

    </ToggleContainer>
  )
}
