import React, { useEffect, useReducer, useRef, useState } from 'react';
import { ConfigProvider, Space, message } from 'antd';
import { Button, TimePicker } from 'antd';
import { DatePicker as DatePickerJalali, Calendar, JalaliLocaleListener } from "antd-jalali";
import dayjs from 'dayjs';
import { Switch, Checkbox } from 'antd';
import fa_IR from "antd/lib/locale/fa_IR";
import { QuestionnaireDatePickerContainer, QuestionnaireSettingContainer } from '@/styles/questionnairePanel/QuestionnaireSetting';
import { Icon } from '@/styles/icons';
import { axiosInstance } from '@/utilities/axios';
import jalaali from 'jalaali-js';
// import jalali from 'dayjs/plugin/jalali';
import PN from 'persian-number';
import { DatePickerInput } from '@/styles/questionnairePanel/QuestionSetting';
import moment from 'moment-jalaali';
import { NumberFormat } from 'react-hichestan-numberinput';
import locale from 'antd/lib/date-picker/locale/fa_IR';
import { digitsEnToFa } from '@persian-tools/persian-tools';

moment.loadPersian({
  usePersianDigits: true, // Set Persian numbers
});
moment.locale('fa')
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
  const [TimerActive, SetTimerActive] = useState(QuestionnaireData.timer ? true : false);
  const [TimerOpen, setTimerOpen] = useState(false);
  const [SettingChanged, SetSettingChanged] = useState(false);
  const [SettingLoading, SetSettingLoading] = useState(false);
  const [ErrorType, SetErrorType] = useState(null);
  const [TimerValue, setTimerValue] = useState(Questionnaire.timer);
  let defaultDatePickerValue = [
    dayjs(convertDate(convertStringToDate(Questionnaire.pub_date)[0], 'jalali') + ' ' + convertStringToDate(Questionnaire.pub_date)[1])
  ]
  QuestionnaireData.end_date ?
    defaultDatePickerValue.push(dayjs(convertDate(convertStringToDate(QuestionnaireData.end_date)[0], 'jalali') + ' ' +
      convertStringToDate(QuestionnaireData.end_date)[1]))
    : ''
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
  const DateChangeHandler = (_, NewDate) => {
    SetErrorType(null)
    if (!NewDate[0] && !NewDate[1])
      Dispatcher({ ACTION: 'Timer Cleared' });
    else {
      if (NewDate[0])
        Dispatcher({ ACTION: 'Pub date set', NewDate: convertToISOString(convertDate(NewDate[0].split(' ')[0], 'gregorian'), NewDate[0].split(' ')[1]) });
      if (NewDate[1])
        Dispatcher({ ACTION: 'End date set', NewDate: convertToISOString(convertDate(NewDate[1].split(' ')[0], 'gregorian'), NewDate[1].split(' ')[1]) });
    }
    SetSettingChanged(true)
  }

  const TimerChangeHandler = (_, Timer) => {
    console.log(Timer)
    setTimerValue(Timer)
    Dispatcher({ ACTION: 'Timer Change', NewTimer: Timer });
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
          <div className='picker_container date_picker'>
            <DatePickerJalali.RangePicker showTime status={ErrorType == 'date_error' ? 'error' : null}
              locale={fa_IR.DatePicker}
              inputReadOnly 
              disabled={!DateActive}
              defaultValue={defaultDatePickerValue}
              onChange={DateChangeHandler} />
            <JalaliLocaleListener />
          </div>
        </QuestionnaireDatePickerContainer>
        <QuestionnaireDatePickerContainer>
          <div className='picker_header time_picker' onClick={() => TimerToggleHandler(!TimerActive)}>
            <p>: تنظیم مهلت پاسخ دهی </p>
            <Switch checked={TimerActive} />
          </div>
          <div className='picker_container time_picker'>
        
              <TimePicker
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
                />
    
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
function toPersianDigits(input) {
  const digitsMap = {
    '0': '۰',
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹',
  };
  console.log(input)
  // return input.replace(/[0-9]/g, (match) => digitsMap[match]);
}