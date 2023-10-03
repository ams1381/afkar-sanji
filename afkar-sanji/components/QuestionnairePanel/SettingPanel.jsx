import React, { useEffect, useReducer, useRef, useState } from 'react';
import { message } from 'antd';
import { Button } from 'antd';
import { Switch, Checkbox } from 'antd';
import { QuestionnaireDatePickerContainer, QuestionnaireSettingContainer , TimePickerContainer
 } from '@/styles/questionnairePanel/QuestionnaireSetting';
import { Icon } from '@/styles/icons';
import { axiosInstance } from '@/utilities/axios';
import jalaali from 'jalaali-js';
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { digitsEnToFa, digitsFaToEn } from '@persian-tools/persian-tools';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import moment from 'moment-jalaali';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import { useLocalStorage } from '@/utilities/useLocalStorage';

export const convertStringToDate = str => {
  const [datePart, timezonePart] = str.split(/[T+]/);
  const [timezoneHours, timezoneMinutes] = timezonePart.split(":").map(Number);

  const date = new Date(datePart);
  date.setUTCHours(date.getUTCHours() + timezoneHours);
  date.setUTCMinutes(date.getUTCMinutes() + timezoneMinutes);

  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  const formattedTime = `${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}:${date.getUTCSeconds().toString().padStart(2, '0')}`;

  return [formattedDate, formattedTime];
};
export function convertToRegularTime(dateTimeString) {
  const dateObj = new Date(dateTimeString);

  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');

  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const seconds = dateObj.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const SettingPanel = ({ Questionnaire , refetch , ChangeSide }) => {
  const [DateValue, SetDateValue] = useState(null);
  const [QuestionnaireData, Dispatcher] = useReducer(QuestionnaireReducerFunction, Questionnaire);
  const [messageApi, contextHolder] = message.useMessage();
  const { getItem , setItem } = useLocalStorage();
  const [DateActive, SetDateActive] = useState(false);
  const [TimerActive, SetTimerActive] = useState(QuestionnaireData?.timer ? true : false);
  const [TimerOpen, setTimerOpen] = useState(false);
  const [SettingChanged, SetSettingChanged] = useState(false);
  const [SettingLoading, SetSettingLoading] = useState(false);
  const [ErrorType, SetErrorType] = useState(null);
  const [TimerValue, setTimerValue] = useState(Questionnaire?.timer);
  let end_date;
  let pub_date;
  const [ DatePickerValue , setDatePickerValue ] = useState(null);

    if(QuestionnaireData.pub_date)
    {
      // console.log(parseInt(convertToRegularTime(QuestionnaireData.pub_date).split(" ")[1].split(':')[0]) + 1 + ':' +
      // convertToRegularTime(QuestionnaireData.pub_date).split(" ")[1].split(':')[1] + ':' +
      // convertToRegularTime(QuestionnaireData.pub_date).split(" ")[1].split(':')[0])
      pub_date = digitsEnToFa(convertDate((convertToRegularTime(QuestionnaireData.pub_date).split(" ")[0]),'jalali') + ' ') +
      digitsEnToFa(parseInt(parseInt(convertToRegularTime(QuestionnaireData.pub_date).split(" ")[1].split(':')[0]) + 1) + ':' +
      convertToRegularTime(QuestionnaireData.pub_date).split(" ")[1].split(':')[1] + ':' +
      convertToRegularTime(QuestionnaireData.pub_date).split(" ")[1].split(':')[2])
    }
    let date_picker = pub_date;

    if(QuestionnaireData.end_date)
    {
      end_date = digitsEnToFa(convertDate((convertToRegularTime(QuestionnaireData.end_date).split(" ")[0]),'jalali') + ' ') +
      digitsEnToFa(parseInt(parseInt(convertToRegularTime(QuestionnaireData.end_date).split(" ")[1].split(':')[0]) + 1) + ':' +
      convertToRegularTime(QuestionnaireData.end_date).split(" ")[1].split(':')[1] + ':' +
      convertToRegularTime(QuestionnaireData.end_date).split(" ")[1].split(':')[2])
     
     date_picker += ' => ' + end_date;
    }
 
  const DateToggleHandler = (E) => {
    SetDateActive(E);
    if (!E)
      Dispatcher({ ACTION: 'Date Cleared' });
    SetSettingChanged(true)
  }
  const TimerToggleHandler = (E) => {
    SetTimerActive(E);
    if (!E)
      Dispatcher({ ACTION: 'Timer Cleared' });
    SetSettingChanged(true)
  }

  const DateChangeHandler = (ali, NewDate) => {
    SetErrorType(null)
    
    if(NewDate.validatedValue && NewDate.validatedValue.length == 1)
    {

      // pub_date = NewDate.validatedValue[0];
      Dispatcher({ 
        ACTION : 'Pub date set' , NewDate : convertPersianDateTimeToISO(digitsFaToEn(NewDate.validatedValue[0]))
      })
      Dispatcher({ 
        ACTION : 'End date set' , NewDate : null
      })
    }
    else if(NewDate.validatedValue && NewDate.validatedValue.length == 2)
    {
      end_date = NewDate.validatedValue[1];
      Dispatcher({ 
        ACTION : 'End date set' , NewDate : convertPersianDateTimeToISO(digitsFaToEn(NewDate.validatedValue[1]))
      })
    }
    SetSettingChanged(true)
  }

  const TimerChangeHandler = (_, Timer) => {
    setTimerValue(digitsFaToEn(Timer.validatedValue[0]))
    Dispatcher({ ACTION: 'Timer Change', NewTimer: digitsFaToEn(Timer.validatedValue[0]) });
    SetSettingChanged(true)
  }
  const ToggleCheckBoxHandler = (e, ToggleName) => {
    Dispatcher({ ACTION: ToggleName, NewToggleValue: e });
    SetSettingChanged(true)

    // console.log(QuestionnaireData,e, ToggleName)
  }
  const CancelEditHandler = () => {
    Dispatcher({ ACTION: 'reset_questionnaire', Resetvalue: Questionnaire })
    SetTimerActive(QuestionnaireData.timer ? true : false)
    SetDateActive(false)
    SetSettingChanged(false)
  }

  const SaveQuestionnaireChanges = async () => {
    if (!SettingChanged)
      return
    SetSettingLoading(true)
    try {

      delete QuestionnaireData.folder
      delete QuestionnaireData.welcome_page;
      delete QuestionnaireData.questions;
      delete QuestionnaireData.thanks_page;
     let { data } = await axiosInstance.patch(`/question-api/questionnaires/${Questionnaire.uuid}/`, QuestionnaireData);
     if(data)
     {
      SetSettingChanged(false)
      refetch()
      setItem('tabType','question_design');
      ChangeSide('question_design')

     }
      
    }
    catch (err) {
      console.log(err)
      SetSettingChanged(true)
      if (err.response)
        Object.keys(err.response.data).includes('pub_date', 'end_date') ? SetErrorType('date_error') : ''
      messageApi.error({
        content: Object.values(err.response.data)[0],
        duration: 5,
        style: {
          fontFamily: 'IRANSans',
          direction: 'rtl'
        }
      })
    }
    finally {
      SetSettingLoading(false);
    }
  }
  return (
    <>
      {contextHolder}
      <QuestionnaireSettingContainer>
        <QuestionnaireDatePickerContainer>
          <div className='picker_header' onClick={() => DateToggleHandler(!DateActive)}>
            <p>: فعال سازی دستی </p>
            <Switch checked={DateActive} />
          </div>
          <div className='picker_container date_picker' >
            <DatePicker  format=" YYYY/MM/DD HH:mm:ss "
              // value={[
              //   new DateObject({ calendar: persian })
              //   .setDate(
              //     (convertDate(convertStringToDate(QuestionnaireData.pub_date)[0],'jalali') + ' ' +
              //      convertStringToDate(QuestionnaireData.pub_date)[1]))
              // ]}
              disabled={!DateActive}
              rangeHover
              dateSeparator="تا" 
              // minDate="1402/6/18"
              // minDate={new DateObject({ calendar: persian })}
              minDate={new DateObject({ calendar: persian })}
              // maxDate={new DateObject({ calendar: persian }).add(3, "days")}
              render={(value, openCalendar) => {
                return (
                  <TimePickerContainer Error={ErrorType == 'date_error' ? 'active' : false} active={DateActive ? 'active' : null}>
                    <input value={date_picker} onClick={openCalendar}
                      placeholder='انتخاب تاریخ' />
                    <Icon name='Calender' />
                  </TimePickerContainer>
                )}}
              range
              plugins={[
                <TimePicker position="bottom" />,
                <DatePanel position="left" />
              ]}
              onChange={DateChangeHandler}
              calendar={persian}
              calendarPosition="bottom-left"
              locale={persian_fa}
            />
          </div>
        </QuestionnaireDatePickerContainer>
        <QuestionnaireDatePickerContainer active={TimerActive ? 'active' : null}>
          <div className='picker_header time_picker' onClick={() => TimerToggleHandler(!TimerActive)}>
            <p>: تنظیم مهلت پاسخ دهی </p>
            <Switch checked={TimerActive} />
          </div>
          <div className='picker_container time_picker' >
          <DatePicker 
            disableDayPicker
            format="HH:mm:ss"   
            
            onChange={TimerChangeHandler}
            render={(value, openCalendar) => {
                let timerValue;
                if(QuestionnaireData.timer)
                {
                  timerValue = digitsEnToFa(QuestionnaireData.timer);
                }
                else if(value && value.length)
                {
                  timerValue = value
                }
              return (
                <TimePickerContainer active={TimerActive ? 'active' : null} onClick={e => TimerActive ?  openCalendar() : e.preventDefault()}>
                  <input value={timerValue}
                   placeholder='تنظیم زمان' 
                    />
                  <Icon name='time' />
                </TimePickerContainer>
              )}}
            plugins={[
              <TimePicker />
            ]} 
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
          />
         
          </div>
        </QuestionnaireDatePickerContainer>
        <QuestionnaireDatePickerContainer>
          <div className='picker_header' onClick={e => ToggleCheckBoxHandler(!QuestionnaireData.show_question_in_pages, 'show_question_in_pages')}>
            <p>در هر صفحه یک سوال نمایش داده شود</p>
            <Switch checked={QuestionnaireData.show_question_in_pages} />
          </div>
        </QuestionnaireDatePickerContainer>
        <QuestionnaireDatePickerContainer>
          <div className='picker_header' onClick={e => ToggleCheckBoxHandler(!QuestionnaireData.show_number, 'show_number')}>
            <p>عدم نمایش شماره سوال</p>
            <Switch checked={!QuestionnaireData.show_number} />
          </div>
        </QuestionnaireDatePickerContainer>
        <QuestionnaireDatePickerContainer style={{ borderBottom: 'none', paddingBottom: 0, marginRight: '30px' }}>
          <div className='picker_header' onClick={e => ToggleCheckBoxHandler(QuestionnaireData.progress_bar, 'progress_bar')}>
            <p>حذف نوار پیشرفت</p>
            <Switch checked={!QuestionnaireData.progress_bar} />
          </div>
        </QuestionnaireDatePickerContainer>
        <QuestionnaireDatePickerContainer disabled={!QuestionnaireData.show_question_in_pages}
         style={{ borderBottom: 'none', paddingBottom: 0, marginRight: '30px' }}>
          <div className='picker_header' onClick={e => ToggleCheckBoxHandler(QuestionnaireData.previous_button, 'previous_button')}>
            <p>دکمه‌ی قبل</p>
            <Switch disabled={!QuestionnaireData.show_question_in_pages}
             checked={QuestionnaireData.previous_button && QuestionnaireData.show_question_in_pages} />
          </div>
         { !QuestionnaireData.show_question_in_pages &&
          <p className='disable_warning'>دکمه‌ها فقط در صورتی که در هر صفحه یک سوال نمایش داده‌شود فعال هستند.</p>}
        </QuestionnaireDatePickerContainer>
        <div className='questionnaire_setting_footer'>
          <Button type='primary' icon={SettingChanged ? <Icon name='Check' /> : null} disabled={!SettingChanged}
            onClick={SaveQuestionnaireChanges} loading={SettingLoading}>
            <p>ذخیره‌ی تغییرات</p>
          </Button>
          <Button danger onClick={CancelEditHandler} disabled={!SettingChanged}>
            <p>انصراف</p>
          </Button>
        </div>
      </QuestionnaireSettingContainer>
    </>
  )
}

export default SettingPanel;
export const convertDate = (inputDate, dateType) => {
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
    case 'Data Replacement' :
      return ACTION.newData;
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
        show_question_in_pages : ACTION.NewToggleValue,
        previous_button : ACTION.NewToggleValue,
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
    case 'show_number':
      return {
        ...State,
        show_number : ACTION.NewToggleValue
      }
  }
}

function convertPersianDateTimeToISO(persianDateTime) {
  // Replace Persian numerals with English numerals
  const englishDateTime = persianDateTime.replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - '۰'.charCodeAt(0) + '0'.charCodeAt(0)));

  // Parse the Persian date and time using jalali-moment
  const gregorianDateTime = moment(englishDateTime, 'jYYYY/jMM/jDD HH:mm:ss').locale('en').format('YYYY-MM-DD HH:mm:ss');

  return `${gregorianDateTime}+04:30`;
}
function convertPersianDateToMultiTimerPickerDateObject(persianDate) {
  // Convert Persian digits to Western Arabic digits
  const westernDigits = persianDate.replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728));

  // Split the date and time components
  const [dateStr, timeStr] = westernDigits.split(' ');

  // Extract year, month, and day components
  const [year, month, day] = dateStr.split('/').map(Number);

  // Extract hour and minute components
  const [hour, minute] = timeStr.split(':').map(Number);

  // Create the date object for the multi-timer picker format
  const dateObject = {
    year,
    month,
    day,
    hour,
    minute,
  };

  return dateObject;
}