import { InputNumber, Select } from 'antd';
import { AlphabetNumberContainer, TextAnswerSettingContainer } from '@/styles/questionnairePanel/QuestionSetting';
import React from 'react'

const SettingQWanswer = () => {
  return (
    <TextAnswerSettingContainer>
        <Select placeholder='الگوی پاسخ' 
        options={[
          { label : 'تاریخ میلادی' , value  : 'gregorian_date' } , 
          { label : 'تاریخ شمسی' , value  : 'jalali_date' } ,
          { label : 'متن آزاد' , value  : 'free text' } , 
          { label : 'شماره تلفن' , value : 'Telephone' } , 
          { label : 'شماره موبایل ' , value : 'phoneNumber' }, 
          { label : ' کارکتر عددی' , value : 'number char' },
          { label : 'حروف فارسی' , value : 'number char' },
        ]}
        style={{ fontFamily : 'IRANSans' , width: 130 }} dropdownStyle={{ fontFamily : 'IRANSans' , fontSize : 12}}>

            
        </Select>
        <AlphabetNumberContainer>
          <p>تعداد حروف</p>
          <label>
              <InputNumber min={0} />
              <p>حداقل</p>
          </label>
          <label>
              <InputNumber min={0} />
              <p>حداکثر</p>
          </label>
        </AlphabetNumberContainer>
    </TextAnswerSettingContainer>
  )
}
export default SettingQWanswer;