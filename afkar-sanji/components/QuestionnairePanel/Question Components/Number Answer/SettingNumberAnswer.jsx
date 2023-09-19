import { AlphabetNumberContainer, ToggleContainer } from '@/styles/questionnairePanel/QuestionSetting'
import { ChangeMinOrMaxAnswerHandler, ChangeToggleHandler } from '@/utilities/QuestionStore';
import { InputNumber, Switch } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const SettingNumberAnswer = ({ QuestionInfo }) => {
    const OcurredError = useSelector(state => state.reducer.Error);
    const [ inputError , setInputError ] = useState(null);
    const dispatcher = useDispatch();
    const LimitContainerRef = useRef(null);
    const RegularToggleHandler = (Event , TName) => {
        dispatcher(ChangeToggleHandler({ QuestionID : QuestionInfo.id , ToggleName : TName , ToggleValue : Event}))
    }
    useEffect(() => {
        if(OcurredError)
        {
            if(OcurredError.min || OcurredError.max)
            {
                setInputError('active')
                LimitContainerRef.current?.scrollIntoView({ behavior : 'smooth' }) 
            }
                
            else
                setInputError(null)
        }
        else
            setInputError(null)
    },[OcurredError])
    const ChangeMinMaxHandler = (event,InputName) => {
        console.log(event,InputName)
        if(InputName == 'min' && event < 0)
            RegularToggleHandler(true,'accept_negative')
        else if(InputName == 'min' && event >= 0)
                RegularToggleHandler(false,'accept_negative')
        dispatcher(ChangeMinOrMaxAnswerHandler({
             QuestionID : QuestionInfo.id , MinMaxName : InputName , MinMaxValue : event
         }))
    }
  return (
    <>
    <AlphabetNumberContainer  inputerror={inputError} ref={LimitContainerRef}>
          <p>محدودیت اعداد وارد شده</p>
          <label>
              <InputNumber value={QuestionInfo.min}  onChange={(e) => ChangeMinMaxHandler(e,'min')}/>
              <p>حداقل</p>
          </label>
          <label>
              <InputNumber value={QuestionInfo.max} onChange={(e) => ChangeMinMaxHandler(e,'max')}/>
              <p>حداکثر</p>
          </label>
    </AlphabetNumberContainer>
    <ToggleContainer>
    <div className='checkbox_container' onClick={e => RegularToggleHandler(!QuestionInfo.show_number,'show_number')}>
            <p>عدم نمایش شماره سوال</p>
            <Switch checked={QuestionInfo.show_number}/>
        </div>
        <div className='checkbox_container' onClick={e => RegularToggleHandler(!QuestionInfo.accept_negative,'accept_negative')}>
            <p>عدد منفی مجاز باشد</p>
            <Switch checked={QuestionInfo.accept_negative}/>
        </div>
        <div className='checkbox_container' onClick={e => RegularToggleHandler(!QuestionInfo.accept_float,'accept_float')}>
            <p>عدد اعشاری مجاز باشد</p>
            <Switch checked={QuestionInfo.accept_float}/>
        </div>
        <div className='checkbox_container' onClick={e => RegularToggleHandler(!QuestionInfo.is_required,'is_required')}>
            <p>پاسخ به سوال اجباری باشد</p>
            <Switch checked={QuestionInfo.is_required}/>
        </div>
        </ToggleContainer>
    </>
    
  )
}
