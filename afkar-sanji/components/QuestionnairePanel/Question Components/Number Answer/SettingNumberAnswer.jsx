import { AlphabetNumberContainer } from '@/styles/questionnairePanel/QuestionSetting'
import { InputNumber } from 'antd'
import React from 'react'

export const SettingNumberAnswer = () => {
  return (
    <>
    <AlphabetNumberContainer>
          <p>محدودیت اعداد وارد شده</p>
          <label>
              <InputNumber min={0} />
              <p>حداقل</p>
          </label>
          <label>
              <InputNumber min={0} />
              <p>حداکثر</p>
          </label>
    </AlphabetNumberContainer>
    <div className='checkbox_container'>
            <p>عدم نمایش شماره سوال</p>
            <Switch/>
        </div>
        <div className='checkbox_container'>
            <p>عدد اعشاری مجاز باشد</p>
            <Switch/>
        </div>
        <div className='checkbox_container'>
            <p>عدد منفی مجاز باشد</p>
            <Switch/>
        </div>
        <div className='checkbox_container'>
            <p>پاسخ به سوال اجباری باشد</p>
            <Switch/>
        </div>
    </>
    
  )
}
