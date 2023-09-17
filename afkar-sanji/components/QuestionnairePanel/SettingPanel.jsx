import React, { useEffect, useReducer, useRef, useState } from 'react';
import { ConfigProvider, Space, message } from 'antd';
import { Button } from 'antd';
import dayjs from 'dayjs';
import { Switch, Checkbox } from 'antd';
import fa_IR from "antd/lib/locale/fa_IR";
import { QuestionnaireDatePickerContainer, QuestionnaireSettingContainer , TimePickerContainer
 } from '@/styles/questionnairePanel/QuestionnaireSetting';
import { Icon } from '@/styles/icons';
import { axiosInstance } from '@/utilities/axios';
import jalaali from 'jalaali-js';
import { NumberFormat } from 'react-hichestan-numberinput';
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import transition from "react-element-popper/animations/transition"
import { digitsEnToFa, digitsFaToEn } from '@persian-tools/persian-tools';
import DatePicker from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import moment from 'moment-jalaali';

export const convertStringToDate = str => {
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
  const [DateValue, SetDateValue] = useState(null);
  const [QuestionnaireData, Dispatcher] = useReducer(QuestionnaireReducerFunction, Questionnaire);
  const [messageApi, contextHolder] = message.useMessage()
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
  // useEffect(() => {
    if(QuestionnaireData.pub_date)
       pub_date = digitsEnToFa((convertDate(convertStringToDate(QuestionnaireData.pub_date)[0], 'jalali'))) +
    ' ' + digitsEnToFa(convertStringToDate(QuestionnaireData.pub_date)[1])
    let date_picker = pub_date;
    // setDatePickerValue(pub_date)
    if(QuestionnaireData.end_date)
    {
     end_date = digitsEnToFa((convertDate(convertStringToDate(QuestionnaireData.end_date)[0], 'jalali'))) +
     ' ' + digitsEnToFa(convertStringToDate(QuestionnaireData.end_date)[1]);
 
     date_picker += ' ~ ' + end_date;
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
    console.log(NewDate)
    if(NewDate.validatedValue && NewDate.validatedValue.length == 1)
    {
      pub_date = NewDate.validatedValue[0];
      Dispatcher({ 
        ACTION : 'Pub date set' , NewDate : convertPersianDateTimeToISO(NewDate.validatedValue[0])
      })
      Dispatcher({ 
        ACTION : 'End date set' , NewDate : null
      })
    }
    else if(NewDate.validatedValue && NewDate.validatedValue.length == 2)
    {
      end_date = NewDate.validatedValue[1];
      Dispatcher({ 
        ACTION : 'End date set' , NewDate : convertPersianDateTimeToISO(NewDate.validatedValue[1])
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
      if(!QuestionnaireData.pub_date)
        delete QuestionnaireData.pub_date;
      delete QuestionnaireData.folder
      delete QuestionnaireData.welcome_page;
      delete QuestionnaireData.questions;
      delete QuestionnaireData.thanks_page;
     let { data } = await axiosInstance.patch(`/question-api/questionnaires/${Questionnaire.uuid}/`, QuestionnaireData);
     if(data)
      SetSettingChanged(false)
    }
    catch (err) {
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
    <ConfigProvider locale={fa_IR} direction="rtl">
      {contextHolder}
      <QuestionnaireSettingContainer>
        <QuestionnaireDatePickerContainer>
          <div className='picker_header' onClick={() => DateToggleHandler(!DateActive)}>
            <p>: فعال سازی دستی </p>
            <Switch checked={DateActive} />
          </div>
          <div className='picker_container date_picker' >
            <DatePicker  format="YYYY-MM-DD HH:mm:ss"
              disabled={!DateActive}
              render={(value, openCalendar) => {
                return (
                  <TimePickerContainer Error={ErrorType == 'date_error' ? 'active' : false} active={DateActive ? 'active' : null}>
                    <input value={date_picker} onClick={openCalendar}  placeholder='انتخاب تاریخ' />
                    <Icon name='Calender' />
                  </TimePickerContainer>
                )}}
              range
              plugins={[
                <TimePicker position="bottom" />
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
              {/* <TimePicker
                open={TimerOpen}
                onOpenChange={setTimerOpen}
                onChange={TimerChangeHandler}
                disabled={!TimerActive}
                showNow={false}
                cellRender={(current, info) => <div className='time_cell'>{digitsEnToFa(current)}</div>}
                inputReadOnly 
                // locale={{ momentLocale: 'fa' }} 
                defaultValue={
                  TimerValue
                    ? (dayjs(TimerValue, 'HH:mm:ss'))
                     // Set Jalali locale for moment
                    : null
                } 
                /> */}
    
          </div>
        </QuestionnaireDatePickerContainer>
        <QuestionnaireDatePickerContainer>
          <div className='picker_header' onClick={e => ToggleCheckBoxHandler(!QuestionnaireData.show_question_in_pages, 'show_question_in_pages')}>
            <p>در هر صفحه یک سوال نمایش داده شود</p>
            <Switch checked={QuestionnaireData.show_question_in_pages} />
          </div>
        </QuestionnaireDatePickerContainer>
        <QuestionnaireDatePickerContainer style={{ borderBottom: 'none', paddingBottom: 0, marginRight: '30px' }}>
          <div className='picker_header' onClick={e => ToggleCheckBoxHandler(QuestionnaireData.progress_bar, 'progress_bar')}>
            <p>حذف نوار پیشرفت</p>
            <Switch checked={!QuestionnaireData.progress_bar} />
          </div>
        </QuestionnaireDatePickerContainer>
        <QuestionnaireDatePickerContainer style={{ borderBottom: 'none', paddingBottom: 0, marginRight: '30px' }}>
          <div className='picker_header' onClick={e => ToggleCheckBoxHandler(QuestionnaireData.previous_button, 'previous_button')}>
            <p>حذف دکمه قبلی</p>
            <Switch checked={!QuestionnaireData.previous_button} />
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

function convertPersianDateTimeToISO(persianDateTime) {
  // Replace Persian numerals with English numerals
  const englishDateTime = persianDateTime.replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - '۰'.charCodeAt(0) + '0'.charCodeAt(0)));

  // Parse the Persian date and time using jalali-moment
  const gregorianDateTime = moment(englishDateTime, 'jYYYY/jMM/jDD HH:mm:ss').locale('en').format('YYYY-MM-DDTHH:mm:ss');

  return `${gregorianDateTime}+04:30`;
}