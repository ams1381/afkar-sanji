import { AlphabetNumberContainer, ToggleContainer } from '@/styles/questionnairePanel/QuestionSetting'
import { ChangeMinOrMaxAnswerHandler, ChangeToggleHandler } from '@/utilities/QuestionStore';
import { InputNumber, Switch } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux';

export const SettingNumberAnswer = ({ QuestionInfo }) => {
    const dispatcher = useDispatch();
    const RegularToggleHandler = (Event , TName) => {
        dispatcher(ChangeToggleHandler({ QuestionID : QuestionInfo.id , ToggleName : TName , ToggleValue : Event}))
    }
    const ChangeMinMaxHandler = (event,InputName) => {
        console.log(event,InputName)
        dispatcher(ChangeMinOrMaxAnswerHandler({
             QuestionID : QuestionInfo.id , MinMaxName : InputName , MinMaxValue : event
         }))
    }
  return (
    <>
    <AlphabetNumberContainer>
          <p>محدودیت اعداد وارد شده</p>
          <label>
              <InputNumber min={0} value={QuestionInfo.min}  onChange={(e) => ChangeMinMaxHandler(e,'min')}/>
              <p>حداقل</p>
          </label>
          <label>
              <InputNumber min={0} value={QuestionInfo.max} onChange={(e) => ChangeMinMaxHandler(e,'max')}/>
              <p>حداکثر</p>
          </label>
    </AlphabetNumberContainer>
    <ToggleContainer>
    <div className='checkbox_container' onClick={e => RegularToggleHandler(!QuestionInfo.show_number,'show_number')}>
            <p>عدم نمایش شماره سوال</p>
            <Switch checked={QuestionInfo.show_number}/>
        </div>
        <div className='checkbox_container' onClick={e => RegularToggleHandler(!QuestionInfo.show_number,'accept_negative')}>
            <p>عدد منفی مجاز باشد</p>
            <Switch checked={QuestionInfo.accept_negative}/>
        </div>
        <div className='checkbox_container' onClick={e => RegularToggleHandler(!QuestionInfo.show_number,'accept_float')}>
            <p>عدد اعشاری مجاز باشد</p>
            <Switch checked={QuestionInfo.accept_float}/>
        </div>
        <div className='checkbox_container' onClick={e => RegularToggleHandler(!QuestionInfo.show_number,'is_required')}>
            <p>پاسخ به سوال اجباری باشد</p>
            <Switch checked={QuestionInfo.is_required}/>
        </div>
        </ToggleContainer>
    </>
    
  )
}
