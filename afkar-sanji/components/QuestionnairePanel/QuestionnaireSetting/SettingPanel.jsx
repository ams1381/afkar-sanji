import React, {useContext, useEffect, useReducer, useRef, useState} from 'react';
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
import {SettignToggle} from "@/components/QuestionnairePanel/QuestionnaireSetting/SettingToggle";
import {QuestionnaireReducerFunction} from "@/utilities/stores/SettingReducers";
import {
  InterviewSettingContainer
} from "@/components/QuestionnairePanel/QuestionnaireSetting/InterviwerSettings/SettingContainer";
import {AuthContext} from "@/utilities/AuthContext";
import {useQuery} from "@tanstack/react-query";


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
const SettingPanel = ({ Questionnaire , refetch , setChatModalActive , ChangeSide , regions }) => {
  const [QuestionnaireData, Dispatcher] = useReducer(QuestionnaireReducerFunction, Questionnaire);
  const [messageApi, contextHolder] = message.useMessage();
  const { getItem , setItem } = useLocalStorage();
  const Auth = useContext(AuthContext);
  const [DateActive, SetDateActive] = useState(false);
  const [TimerActive, SetTimerActive] = useState(QuestionnaireData?.timer ? true : false);
  const [SettingChanged, SetSettingChanged] = useState(false);
  const [SettingLoading, SetSettingLoading] = useState(false);
  const [ErrorType, SetErrorType] = useState(null);

  useEffect(() => {
    // console.log('Quesitonnaire Changed')
    Dispatcher({ ACTION : 'refresh_data' , refreshData : Questionnaire })
  }, [Questionnaire]);

  let end_date;
  let pub_date;

    if(QuestionnaireData.pub_date)
    {
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
    Dispatcher({ ACTION: 'Timer Change', NewTimer: digitsFaToEn(Timer.validatedValue[0]) });
    SetSettingChanged(true)
  }
  const ToggleCheckBoxHandler = (e, ToggleName) => {
    // console.log(e, ToggleName);
    Dispatcher({ ACTION: ToggleName, NewToggleValue: e });
    SetSettingChanged(true)
  }
  const CancelEditHandler = () => {
    Dispatcher({ ACTION: 'reset_questionnaire', Resetvalue: Questionnaire })
    SetTimerActive(QuestionnaireData.timer ? true : false)
    SetDateActive(false)
    SetSettingChanged(false)
  }

  const ChangeDistrict = (selectedRegions) => {
    SetSettingChanged(true)
      if(selectedRegions)
        Dispatcher({ ACTION : 'change_district' , preferred_districts : selectedRegions })
      else
        Dispatcher({ ACTION : 'change_district' , preferred_districts : [] })
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
      delete QuestionnaireData.interviewers;
     let { data } = await axiosInstance.patch(`/${Auth.reqRole}/${Questionnaire.uuid}/`, QuestionnaireData);
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
              disabled={!DateActive}
              rangeHover
              dateSeparator="تا"
              minDate={new DateObject({ calendar: persian })}
              render={(value, openCalendar) => {
                return (
                  <TimePickerContainer Error={ErrorType === 'date_error' ? 'active' : false} active={DateActive ? 'active' : null}>
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
              calendarPosition="bottom-right"
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
        { getItem('roleReq') && getItem('roleReq') === 'interview-api/interviews' &&
            <InterviewSettingContainer regions={regions}
               ToggleCheckBoxHandler={ToggleCheckBoxHandler}
               refetch={refetch}
               setChatModalActive={setChatModalActive}
               ChangeDistrict={ChangeDistrict}
               Questionnaire={QuestionnaireData}/>}
        { getItem('roleReq') !== 'interview-api/interviews' &&
            <SettignToggle ToggleName={'is_active'}
                 ToggleText={'غیر فعال سازی موقت'}
              ToggleCheckBoxHandler={ToggleCheckBoxHandler}
                 QuestionnaireData={QuestionnaireData}/>}
        { getItem('roleReq') !== 'interview-api/interviews' && <SettignToggle ToggleName={'show_number'} ToggleText={'عدم نمایش شماره سوال'}
                        ToggleCheckBoxHandler={ToggleCheckBoxHandler} QuestionnaireData={QuestionnaireData}/>}
        { getItem('roleReq') !== 'interview-api/interviews' &&
            <SettignToggle ToggleName={'progress_bar'} ToggleText={'حذف نوار پیشرفت'}
                        ToggleCheckBoxHandler={ToggleCheckBoxHandler} QuestionnaireData={QuestionnaireData}/>}
        { getItem('roleReq') !== 'interview-api/interviews' && <QuestionnaireDatePickerContainer disabled={!QuestionnaireData.show_question_in_pages}
                                           style={{borderBottom: 'none', paddingBottom: 0, marginRight: '30px'}}>
          <div className='picker_header'
               onClick={e => ToggleCheckBoxHandler(QuestionnaireData.previous_button, 'previous_button')}>
            <p>دکمه‌ی قبل</p>
            <Switch disabled={!QuestionnaireData.show_question_in_pages}
                    checked={QuestionnaireData.previous_button && QuestionnaireData.show_question_in_pages}/>
          </div>
          {!QuestionnaireData.show_question_in_pages &&
              <p className='disable_warning'>دکمه‌ها فقط در صورتی که در هر صفحه یک سوال نمایش داده‌شود فعال هستند.</p>}
        </QuestionnaireDatePickerContainer>}
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

const convertPersianDateTimeToISO = (persianDateTime) => {
  const englishDateTime = persianDateTime.replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - '۰'.charCodeAt(0) + '0'.charCodeAt(0)));

  // Parse the Persian date and time using jalali-moment
  const gregorianDateTime = moment(englishDateTime, 'jYYYY/jMM/jDD HH:mm:ss').locale('en').format('YYYY-MM-DD HH:mm:ss');

  return `${gregorianDateTime}+04:30`;
}
