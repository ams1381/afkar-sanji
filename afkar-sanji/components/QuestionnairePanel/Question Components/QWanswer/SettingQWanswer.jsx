import { InputNumber, Select } from 'antd';
import { AlphabetNumberContainer, TextAnswerSettingContainer } from '@/styles/questionnairePanel/QuestionSetting';
import React from 'react'
import { useDispatch } from 'react-redux';
import { ChangeAnswerPattern, ChangeMinOrMaxAnswerHandler } from '@/utilities/QuestionStore';

const SettingQWanswer = ({ QuestionInfo }) => {
  const dispatcher = useDispatch();
  const ChangeAnswerPatternHandler = (e) => {
      dispatcher(ChangeAnswerPattern({ QuestionID : QuestionInfo.id , NewPattern : e.value }))
  }
  const ChangeMinMaxHandler = (event,InputName) => {
    console.log(event,InputName)
    dispatcher(ChangeMinOrMaxAnswerHandler({
         QuestionID : QuestionInfo.id , MinMaxName : InputName , MinMaxValue : event
     }))
     
}
  return (
    <TextAnswerSettingContainer>
        <Select placeholder='الگوی پاسخ' 
        options={[
          { label : 'تاریخ میلادی' , value  : 'gregorian_date' } , 
          { label : 'تاریخ شمسی' , value  : 'jalali_date' } ,
          { label : 'متن آزاد' , value  : 'free' } , 
          { label : 'شماره تلفن' , value : 'phone_number' } , 
          { label : 'شماره موبایل ' , value : 'mobile_number' }, 
          { label : ' کارکتر عددی' , value : 'number_character' },
          { label : 'حروف فارسی' , value : 'persian_letters' },
          { label : 'حروف انگلیسی' , value : 'english_letters'}
        ]}
        defaultValue={PatternGenerator(QuestionInfo.pattern)}
        onChange={ChangeAnswerPatternHandler}
        style={{ fontFamily : 'IRANSans' , width: 130 }} dropdownStyle={{ fontFamily : 'IRANSans' , fontSize : 12}}>
        </Select>
        { (QuestionInfo.pattern == 'free' || QuestionInfo.pattern == 'persian_letters' || QuestionInfo.pattern == 'english_letters' )
        ? <AlphabetNumberContainer>
          <p>تعداد حروف</p>
          <label>
              <InputNumber value={QuestionInfo.min}  onChange={(e) => ChangeMinMaxHandler(e,'min')}/>
              <p>حداقل</p>
          </label>
          <label>
              <InputNumber value={QuestionInfo.max} onChange={(e) => ChangeMinMaxHandler(e,'max')}/>
              <p>حداکثر</p>
          </label>
        </AlphabetNumberContainer> : ''}
    </TextAnswerSettingContainer>
  )
}
const PatternGenerator = (Type) => {
  switch(Type)
  {
    case 'gregorian_date':
        return { "label" : 'تاریخ میلادی' , "value"  : 'gregorian_date' }
    case 'jalali_date':
        return { "label" : 'تاریخ شمسی' , "value"  : 'jalali_date' }
    case 'free':
        return { "label" : 'متن آزاد' , "value"  : 'free' }
    case 'phone_number':
        return { "label" : 'شماره تلفن' , "value" : 'phone_number' }
    case 'mobile_number':
        return { "label" : 'شماره موبایل ' , "value" : 'mobile_number' }
    case 'number_character':
          return { "label" : ' کارکتر عددی' , "value" : 'number_character' }
    case 'persian_letters':
          return { "label" : 'حروف فارسی' , "value" : 'persian_letters' }
    case 'english_letters' :
          return { "label" : 'حروف انگلیسی' , "value" : 'english_letters'}
  }
}
export default SettingQWanswer;