import { InputNumber, Select } from 'antd';
import { AlphabetNumberContainer, TextAnswerSettingContainer } from '@/styles/questionnairePanel/QuestionSetting';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { ChangeAnswerPattern, ChangeMinOrMaxAnswerHandler } from '@/utilities/stores/QuestionStore';
import { useSelector } from 'react-redux';
import {CommonSetting} from "@/components/QuestionnairePanel/Question Components/Common/CommonSetting";

const SettingQWanswer = ({ QuestionInfo }) => {
  const dispatcher = useDispatch();
  const [ inputError , setInputError ] = useState(null);
  const OcurredError = useSelector(state => state.reducer.Error);
  const ChangeAnswerPatternHandler = (e) => {
      dispatcher(ChangeAnswerPattern(
        { QuestionID : QuestionInfo.id , NewPattern : e , answer_template : PatternGenerator(e).answer_template}
        ))
      
  
  }
  useEffect(() => {
    console.log(OcurredError)
    if(OcurredError)
    {
        if(OcurredError.min || OcurredError.max)
            setInputError('active')
        else
            setInputError(null)
    }
    else
        setInputError(null)
},[OcurredError])
  const ChangeMinMaxHandler = (event,InputName) => {
    console.log(event,InputName)
    dispatcher(ChangeMinOrMaxAnswerHandler({
         QuestionID : QuestionInfo.id , 
         MinMaxName : InputName , 
         MinMaxValue : event ,
         group : QuestionInfo.group
     }))
     
}
  return (
    <TextAnswerSettingContainer>
      <div className='pattern_selector_container'>
      <Select placeholder='الگوی پاسخ' 
        options={[
          { label : 'تاریخ میلادی' , value  : 'georgian_date' } , 
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
        style={{ fontFamily : 'IRANSans'}} dropdownStyle={{ fontFamily : 'IRANSans' , fontSize : 12}}>
        </Select>
        <p>الگوی پاسخ</p>
      </div>
        
        { (QuestionInfo.pattern == 'free' || QuestionInfo.pattern == 'persian_letters' || QuestionInfo.pattern == 'english_letters' )
        ? <AlphabetNumberContainer inputerror={inputError}>
          <p>تعداد حروف</p>
          <label>
              <InputNumber value={QuestionInfo.min} min={0} onChange={(e) => ChangeMinMaxHandler(e,'min')}/>
              <p>حداقل</p>
          </label>
          <label>
              <InputNumber value={QuestionInfo.max} min={1} onChange={(e) => ChangeMinMaxHandler(e,'max')}/>
              <p>حداکثر</p>
          </label>
        </AlphabetNumberContainer> : ''}
        <CommonSetting QuestionInfo={QuestionInfo} />
    </TextAnswerSettingContainer>
  )
}
const PatternGenerator = (Type) => {
  switch(Type)
  {
    case 'georgian_date':
        return { "label" : 'تاریخ میلادی' , "value"  : 'georgian_date' , answer_template : 'تاریخ میلادی' }
    case 'jalali_date':
        return { "label" : 'تاریخ شمسی' , "value"  : 'jalali_date' , answer_template : 'تاریخ شمسی' }
    case 'free':
        return { "label" : 'متن آزاد' , "value"  : 'free'  , answer_template : 'چیزی بنویسید'}
    case 'phone_number':
        return { "label" : 'شماره تلفن' , "value" : 'phone_number' , answer_template : 'شماره‌ی تلفن ثابت را وارد کنید'}
    case 'mobile_number':
        return { "label" : 'شماره موبایل ' , "value" : 'mobile_number' , answer_template : 'شماره‌ی موبایل را وارد کنید' }
    case 'number_character':
          return { "label" : ' کارکتر عددی' , "value" : 'number_character' , answer_template : 'عددی را وارد کنید'}
    case 'persian_letters':
          return { "label" : 'حروف فارسی' , "value" : 'persian_letters' , answer_template : 'حروف فارسی' }
    case 'english_letters' :
          return { "label" : 'حروف انگلیسی' , "value" : 'english_letters' , answer_template : 'Enter something'}
  }
}

export default SettingQWanswer;