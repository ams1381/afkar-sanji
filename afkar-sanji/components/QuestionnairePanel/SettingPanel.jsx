import React, { useEffect, useReducer, useRef, useState } from 'react'
import { ConfigProvider,  Space, message } from 'antd';
import { Button, TimePicker } from 'antd';
import { DatePicker as DatePickerJalali, Calendar, JalaliLocaleListener } from "antd-jalali";
import dayjs from 'dayjs';
import { Switch , Checkbox} from 'antd';
import fa_IR from "antd/lib/locale/fa_IR";
import { QuestionnaireDatePickerContainer , QuestionnaireSettingContainer} from '@/styles/questionnairePanel/QuestionnaireSetting';
import { Icon } from '@/styles/icons';
import { axiosInstance } from '@/utilities/axios';
import jalaali from 'jalaali-js'
// import jalaliday from 'jalaliday'
import PN from 'persian-number';
import { DatePickerInput } from '@/styles/questionnairePanel/QuestionSetting';
// import 'moment/locale/fa';
// import moment from "moment"
import moment from 'moment-jalaali';
import locale from 'antd/lib/date-picker/locale/fa_IR';

const convertStringToDate = str => {
  const [datePart, timezonePart] = str.split(/[T+]/);
  const [timezoneHours, timezoneMinutes] = timezonePart.split(":").map(Number);

  const date = new Date(datePart);
  date.setUTCHours(date.getUTCHours() - timezoneHours, date.getUTCMinutes() - timezoneMinutes);

  const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const formattedTime = `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;

  return [formattedDate, formattedTime];
};
const convertToISOString = (datePart, timePart) =>
  new Date(`${datePart}T${timePart}`).toISOString().replace('Z', `+${(new Date().getTimezoneOffset() / -60).toFixed(0).padStart(2, '0')}:${(Math.abs(new Date().getTimezoneOffset()) % 60).toString().padStart(2, '0')}`);

const SettingPanel = ({ Questionnaire }) => {
  const [ DateValue , SetDateValue ]= useState(null);
  const [ QuestionnaireData , Dispatcher ] = useReducer(QuestionnaireReducerFunction,Questionnaire);
  const [messageApi, contextHolder] = message.useMessage()
  const [ DateActive , SetDateActive ] = useState(false);
  const [ TimerActive , SetTimerActive ] = useState(QuestionnaireData.timer ? true : false);
  const [TimerOpen, setTimerOpen] = useState(false);
  const [ SettingChanged , SetSettingChanged ] = useState(false);
  const [ SettingLoading , SetSettingLoading ] = useState(false);
  const [ ErrorType , SetErrorType ] = useState(null);
  let defaultDatePickerValue  = [dayjs(convertDate(convertStringToDate(Questionnaire.pub_date)[0],'jalali') + ' ' + convertStringToDate(Questionnaire.pub_date)[1])]


    QuestionnaireData.end_date ? 
      defaultDatePickerValue.push(dayjs(convertDate(convertStringToDate(QuestionnaireData.end_date)[0],'jalali') + ' ' + 
      convertStringToDate(QuestionnaireData.end_date)[1]))
      : ''


  const DateToggleHandler = (E) => {
    SetDateActive(E);
    if(!E)
      Dispatcher({ ACTION : 'Date Cleared' });
    SetSettingChanged(true)
  }
  const TimerToggleHandler = (E) => {
    SetTimerActive(E);
    if(!E)
      Dispatcher({ ACTION : 'Timer Cleared' });
   SetSettingChanged(true)
  }
  const DateChangeHandler = (_,NewDate) => {
    SetErrorType(null)
    if(!NewDate[0] && !NewDate[1])
      Dispatcher({ ACTION : 'Timer Cleared' });
    else
    {
      if(NewDate[0])
         Dispatcher({ ACTION : 'Pub date set' , NewDate : convertToISOString(convertDate(NewDate[0].split(' ')[0],'gregorian'),NewDate[0].split(' ')[1] )});
      if(NewDate[1])
        Dispatcher({ ACTION : 'End date set' , NewDate : convertToISOString(convertDate(NewDate[1].split(' ')[0],'gregorian'),NewDate[1].split(' ')[1])});
    }
    SetSettingChanged(true)
  }

 const TimerChangeHandler = (_, Timer) => {
    Dispatcher({ ACTION : 'Timer Change' , NewTimer : Timer });
    SetSettingChanged(true)
 }
 const ToggleCheckBoxHandler = (e,ToggleName) => {
    Dispatcher({ ACTION : ToggleName , NewToggleValue : e});
    SetSettingChanged(true)
 }
 const CancelEditHandler = () => {
  Dispatcher({ ACTION : 'reset_questionnaire' , Resetvalue : Questionnaire })
  SetTimerActive(QuestionnaireData.timer ? true : false)
  SetDateActive(false)
  SetSettingChanged(false)
 }
 console.log(convertStringToDate(Questionnaire.pub_date))
 const SaveQuestionnaireChanges = async () => {
  if(!SettingChanged)
    return
  SetSettingLoading(true)
  try
  {
    delete QuestionnaireData.folder
    delete QuestionnaireData.welcome_page;
    delete QuestionnaireData.questions;
    delete QuestionnaireData.thanks_page;
    await axiosInstance.patch(`/question-api/questionnaires/${Questionnaire.uuid}/`,QuestionnaireData) 
    SetSettingChanged(false)
  }
  catch(err)
  {
    if(err.response)
      Object.keys(err.response.data).includes('pub_date','end_date') ? SetErrorType('date_error') : ''
      messageApi.error({
        content : Object.values(err.response.data)[0],
        duration : 5,
        style : {
          fontFamily : 'IRANSans',
          direction : 'rtl'
        }
      })
    }
  finally
  {
      SetSettingLoading(false);
      SetSettingChanged(false);
  }
 } 
  return (
    <ConfigProvider locale={fa_IR} direction="rtl">
      {contextHolder}
      <QuestionnaireSettingContainer>
      <QuestionnaireDatePickerContainer>
      <div className='picker_header'>
            <p>: فعال سازی دستی </p>
              <Switch checked={DateActive} onChange={DateToggleHandler}/>
          </div>
       <div className='picker_container'>
          <DatePickerJalali.RangePicker showTime status={ErrorType == 'date_error' ? 'error' : null} 
          locale={fa_IR.DatePicker}
          disabled={!DateActive}
          defaultValue={defaultDatePickerValue}
           onChange={DateChangeHandler} />
           <JalaliLocaleListener  />
       </div>
      </QuestionnaireDatePickerContainer>
      <QuestionnaireDatePickerContainer>
        <div className='picker_header time_picker'>
                <p>: تنظیم مهلت پاسخ دهی </p>
                <Switch checked={TimerActive} onChange={TimerToggleHandler}/>
          </div>
          <div className='picker_container'>
    <ConfigProvider locale={fa_IR} direction="rtl">
      <TimePicker
                  open={TimerOpen}
                  onOpenChange={setTimerOpen}
                  onChange={TimerChangeHandler}
                  disabled={!TimerActive}
                  showNow={false}
                  defaultValue={
                    QuestionnaireData.timer
                      ? moment(QuestionnaireData.timer, 'HH:mm:ss').locale('fa') // Set Jalali locale for moment
                      : null
                  }
                />
    </ConfigProvider>        
        </div>
        
      </QuestionnaireDatePickerContainer>
          <QuestionnaireDatePickerContainer>
          <div className='picker_header'>
              <p>در هر صفحه یک سوال نمایش داده شود</p>
              <Switch onChange={e => ToggleCheckBoxHandler(!QuestionnaireData.show_question_in_pages,'show_question_in_pages')}
              checked={QuestionnaireData.show_question_in_pages} />
           </div>
          </QuestionnaireDatePickerContainer>
          <QuestionnaireDatePickerContainer style={{ borderBottom : 'none' , paddingBottom : 0}}>
          <div className='picker_header'>
            <p>حذف نوار پیشرفت</p>
            <Checkbox onChange={e => ToggleCheckBoxHandler(QuestionnaireData.progress_bar,'progress_bar')}
            checked={!QuestionnaireData.progress_bar} />
             </div>
          </QuestionnaireDatePickerContainer>
          <QuestionnaireDatePickerContainer style={{ borderBottom : 'none' , paddingBottom : 0}}>
          <div className='picker_header'>
            <p>حذف دکمه قبلی</p>
            <Checkbox onChange={e => ToggleCheckBoxHandler(QuestionnaireData.previous_button,'previous_button')}
             checked={!QuestionnaireData.previous_button} />
            </div>
          </QuestionnaireDatePickerContainer>
        
        <div className='questionnaire_setting_footer'>
          <Button type='primary' icon={SettingChanged ? <Icon name='Check' /> : null} disabled={!SettingChanged}
          onClick={SaveQuestionnaireChanges} loading={SettingLoading}>
              <p>ذخیره ی تغییرات</p>
          </Button>
          <Button danger onClick={CancelEditHandler} disabled={!SettingChanged}>
              <p>انصراف</p>
          </Button>
        </div>

        
      </QuestionnaireSettingContainer>
        </ConfigProvider>
  )
}
export default SettingPanel;
const convertDate = (inputDate, dateType) => {
  const [year, month, day] = inputDate.split('-');

  if (dateType === 'jalali') {
    const jDate = jalaali.toJalaali(parseInt(year), parseInt(month), parseInt(day));
    return `${jDate.jy}/${jDate.jm}/${jDate.jd}`;
  } else if (dateType === 'gregorian') {
    const gDate = jalaali.toGregorian(parseInt(year), parseInt(month), parseInt(day));
    return `${gDate.gy}-${String(gDate.gm).padStart(2, '0')}-${String(gDate.gd).padStart(2, '0')}`;
  }

  return inputDate; // Return input date if no conversion needed
};
// const convertToGregorian 
const QuestionnaireReducerFunction = (State,ACTION) => {
  switch(ACTION.ACTION)
  {
    case 'Date Cleared' :
      return {
        ...State,
        pub_date : null,
        end_date : null
      }
    case 'Timer Cleared' :
      return {
        ...State,
        timer : null
      }
    case 'Pub date set':
      return {
        ...State,
        pub_date : ACTION.NewDate,
        
      }
    case 'End date set':
      return {
        ...State,
        end_date : ACTION.NewDate,
      }
    case 'Timer Change':
      return {
        ...State,
        timer : ACTION.NewTimer
      }
    case 'show_question_in_pages':
      return {
        ...State,
        show_question_in_pages : ACTION.NewToggleValue
      }
    case 'progress_bar':
      return {
        ...State,
        progress_bar : !ACTION.NewToggleValue
      }
    case 'previous_button':
      return {
        ...State,
        previous_button : !ACTION.NewToggleValue
      }
    case 'reset_questionnaire':
      return ACTION.Resetvalue
      
  }
}