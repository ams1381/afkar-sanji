import React, { useEffect, useState } from 'react'
import { AlphabetNumberContainer, ToggleContainer } from '@/styles/questionnairePanel/QuestionSetting';
import ToggleCheckBoxItem from '../Common/Toggle';
import { ChangeToggleHandler , ChangeMinOrMaxAnswerHandler, OptionAdder, OptionRemoverByText, DeleteInputError } from '@/utilities/stores/QuestionStore';
import { Checkbox, Input, InputNumber, Switch } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRef } from 'react';

const SettingMultipleAnswer = ({QuestionInfo}) => {
    const OcurredError = useSelector(state => state.reducer.Error);
    const [ inputError , setInputError ] = useState(null);
    const LimitContainerRef = useRef(null);
    const RandomIdGenerator = () => {
        let ID = Date.now();
        QuestionInfo.options.forEach(item => {
         if(item.id == ID)
           return RandomIdGenerator();
        })
        return ID;
       }
    useEffect(() => {
        if(OcurredError)
        {
            // console.log(OcurredError)
            if(OcurredError.find(item => item?.qid == QuestionInfo.id) &&
             OcurredError.find(item => item?.qid == QuestionInfo.id)?.err_object?.min_selected_options ||
             OcurredError.find(item => item?.qid == QuestionInfo.id)?.err_object?.max_selected_options)
            {
                setInputError('active');
                LimitContainerRef.current?.scrollIntoView({ behavior : 'smooth' })
            }
            else
                setInputError(null)
        }
        else
            setInputError(null)
    },[OcurredError])
    const [ AdditionalOptionState , SetAdditionalOptionState ] = useState(QuestionInfo.additional_options);
    const [ MultipleAnswerState , SetMultipleAnswerState ] = useState(QuestionInfo.multiple_choice);
    const OptionalDispatcher = useDispatch();
    const MultipleAnswerToggleHandler = () => {
        SetMultipleAnswerState(!MultipleAnswerState)
        OptionalDispatcher(ChangeToggleHandler({
             QuestionID : QuestionInfo.id ,
              ToggleName : 'multiple_choice' ,
               ToggleValue : !MultipleAnswerState ,
               group : QuestionInfo.group
        }));
        
    }
    const ChangeMinMaxHandler = (event,InputName) => {

        OptionalDispatcher(ChangeMinOrMaxAnswerHandler({
             QuestionID : QuestionInfo.id , 
             MinMaxName : InputName , 
             MinMaxValue : event ,
             group : QuestionInfo.group
         }))
         setInputError(false)
    }
    const AdditionalOptionsHandler = (ToggleValue) => {

        OptionalDispatcher(ChangeToggleHandler({
             QuestionID : QuestionInfo.id , 
             ToggleName : 'additional_options' , 
             ToggleValue : ToggleValue,
             group : QuestionInfo.group
            }))
        if(!ToggleValue)
        {
            OptionalDispatcher(ChangeToggleHandler({ QuestionID : QuestionInfo.id , ToggleName : 'nothing_selected' , ToggleValue : false , group : QuestionInfo.group}))
            OptionalDispatcher(ChangeToggleHandler({ QuestionID : QuestionInfo.id , ToggleName : 'all_options' , ToggleValue : false , group : QuestionInfo.group }))
            OptionalDispatcher(ChangeToggleHandler({ QuestionID : QuestionInfo.id , ToggleName : 'other_options' , ToggleValue : false , group : QuestionInfo.group}))
            OptionalDispatcher(OptionRemoverByText({ QuestionID : QuestionInfo.id , OptionText : '<span>هیچ کدام</span>' , group : QuestionInfo.group }))
            OptionalDispatcher(OptionRemoverByText({ QuestionID : QuestionInfo.id , OptionText : '<span>همه گزینه ها</span>' , group : QuestionInfo.group }))
            OptionalDispatcher(OptionRemoverByText({ QuestionID : QuestionInfo.id , OptionText : '<span>سایر</span>' , group : QuestionInfo.group }))
        }
    }
    const RegularToggleHandler = (Event , TName) => {
        OptionalDispatcher(ChangeToggleHandler({ 
            QuestionID : QuestionInfo.id ,
            ToggleName : TName ,
            ToggleValue : Event ,
            group : QuestionInfo.group
        }))

        if(TName == 'all_options')
        {
            if(Event)
            {
                ChangeMinMaxHandler(1,'min_selected_options');
                OptionalDispatcher(OptionAdder({ 
                    QuestionID : QuestionInfo.id ,
                     OptionText : '<span>همه گزینه ها</span>' ,
                      NewOptionID : RandomIdGenerator(),
                      group : QuestionInfo?.group
                    }))
            }
            else
              OptionalDispatcher(OptionRemoverByText({ 
            QuestionID : QuestionInfo.id ,
             OptionText : '<span>همه گزینه ها</span>' ,
             group : QuestionInfo.group
        }))
        }
            
        if(TName == 'nothing_selected')
            Event ? OptionalDispatcher(OptionAdder({ 
                        QuestionID : QuestionInfo.id ,
                         OptionText : '<span>هیچ کدام</span>' ,
                          NewOptionID : RandomIdGenerator() ,
                          group : QuestionInfo?.group
                        }))
            : OptionalDispatcher(OptionRemoverByText({
                 QuestionID : QuestionInfo.id , 
                 OptionText : '<span>هیچ کدام</span>' ,
                 group : QuestionInfo.group
                }))
        if(TName == 'other_options')
            Event ? OptionalDispatcher(OptionAdder({
         QuestionID : QuestionInfo.id ,
          OptionText : '<span>سایر</span>' ,
           NewOptionID : RandomIdGenerator() , 
           group : QuestionInfo?.group
        }))
            : OptionalDispatcher(OptionRemoverByText({ 
                QuestionID : QuestionInfo.id , 
                OptionText : '<span>سایر</span>' ,
                group : QuestionInfo.group
            }))
    }

  return (
    <ToggleContainer>
        <div className='checkbox_container' onClick={MultipleAnswerToggleHandler} style={{ borderBottom : QuestionInfo.multiple_choice ? 'none' : '1px solid rgba(217, 217, 217, 0.2)' }}>
            <p>سوال چند انتخابی باشد</p>
            <Switch checked={QuestionInfo.multiple_choice} />
        </div>
       { MultipleAnswerState ? <AlphabetNumberContainer inputerror={inputError} ref={LimitContainerRef}>
          <p>تعداد گزینه های قابل انتخاب</p>
          <label>
              <InputNumber value={QuestionInfo.all_options || QuestionInfo.nothing_selected || QuestionInfo.other_options ? 1 : QuestionInfo.min_selected_options}  min={1} 
              disabled={QuestionInfo.all_options || QuestionInfo.nothing_selected || QuestionInfo.other_options}
              onChange={(e) => ChangeMinMaxHandler(e,'min_selected_options')}/>
              <p>حداقل</p>
          </label>
          <label>
              <InputNumber  value={QuestionInfo.max_selected_options} min={1} onChange={(e) => ChangeMinMaxHandler(e,'max_selected_options')}/>
              <p>حداکثر</p>
          </label>
        </AlphabetNumberContainer> : ''}
         <div className='additional_options_container'>
            <div className='checkbox_container additional_option_toggle' style={{ borderBottom : QuestionInfo.additional_options ? 'none' : '1px solid rgba(217, 217, 217, 0.2)' }}
             onClick={(e => AdditionalOptionsHandler(!QuestionInfo.additional_options))}>
                <Switch checked={QuestionInfo.additional_options} />
                <p>گزینه های اضافی</p>
            </div>
            {QuestionInfo.additional_options ? <div className='additional_option_checkboxes_container checkbox_container'>
                <div className='additional_checkbox' onClick={e => RegularToggleHandler(!QuestionInfo.all_options,'all_options')}>
                    <Checkbox checked={QuestionInfo.all_options} />
                    <p>همه گزینه ها</p>
                </div>
                <div className='additional_checkbox' onClick={e => RegularToggleHandler(!QuestionInfo.nothing_selected,'nothing_selected')}>
                    <Checkbox checked={QuestionInfo.nothing_selected} />
                    <p>هیچ کدام</p>
                </div>
                <div className='additional_checkbox' onClick={e => RegularToggleHandler(!QuestionInfo.other_options,'other_options')}>
                    <Checkbox checked={QuestionInfo.other_options} />
                    <p>سایر</p>
                </div>
            </div> : ''}
        </div>
        <div className='checkbox_container' onClick={e => RegularToggleHandler(!QuestionInfo.is_required,'is_required')}>
            <p>پاسخ به سوال اجباری باشد</p>
            <Switch checked={QuestionInfo.is_required}/>
        </div>
        <div className='checkbox_container' onClick={e => RegularToggleHandler(!QuestionInfo.show_number,'show_number')}>
            <p>عدم نمایش شماره ی سوال</p>
            <Switch checked={QuestionInfo.show_number}/>
        </div>
        <div className='checkbox_container' onClick={e => RegularToggleHandler(!QuestionInfo.is_random_options,'is_random_options')}>
            <p>تصادفی سازی نمایش گزینه ها</p>
            <Switch checked={QuestionInfo.is_random_options}/>
        </div>
        <div className='checkbox_container' style={{ borderBottom : 'none' }}
         onClick={e => RegularToggleHandler(!QuestionInfo.is_vertical,'is_vertical')}>
            <p>گزینه ها عمودی چیده شوند</p>
            <Switch checked={QuestionInfo.is_vertical}/>
        </div>
    </ToggleContainer>
    
  )
}
export default SettingMultipleAnswer;