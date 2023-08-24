import React, { useEffect, useReducer, useRef, useState } from 'react'
import { ConfigProvider,  Space, message } from 'antd';
import { Button, TimePicker } from 'antd';
import { Datepicker } from '@ijavad805/react-datepicker';
import dayjs from 'dayjs';
import { Switch , Checkbox} from 'antd';
import fa_IR from "antd/lib/locale/fa_IR";
import { QuestionnaireDatePickerContainer , QuestionnaireSettingContainer} from '@/styles/questionnairePanel/QuestionnaireSetting';
import { Icon } from '@/styles/icons';
import { axiosInstance } from '@/utilities/axios';
import jalaali from 'jalaali-js'
import PN from 'persian-number';
import { DatePickerInput } from '@/styles/questionnairePanel/QuestionSetting';
import 'moment/locale/fa';
import moment from "moment"; 
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
  const date = dayjs("1399-01-01", {jalali:true});


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
  const DateChangeHandler = (NewPubDate) => {
    SetErrorType(null)
    Dispatcher({ ACTION : 'Pub Date Changed' , NewDate : NewPubDate._i.replace('---','') });

    SetSettingChanged(true)
  }
  const EndDateChangeHandler = (NewEndDate) => {
    SetErrorType(null)
    Dispatcher({ ACTION : 'End Date Changed' , NewDate : NewEndDate._i.replace('---','') });

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
  SetDateActive((QuestionnaireData.pub_date ? true : false))
  SetSettingChanged(false)
 }
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
        <div className='picker_container' >
          <Datepicker 
          disabled={!DateActive}
          onChange={DateChangeHandler}
          readonly="readonly"
          defaultValue={QuestionnaireData.pub_date ? moment(convertToJalaliDate(QuestionnaireData.pub_date)) 
            : moment(convertToJalaliDate(new Date().toJSON().slice(0, 10)))}
          input={<DatePickerInput readOnly={true}
            errorOccur={ErrorType == 'date_error' ? 'true' : null} placeholder="تاریخ شروع" />}
          placeholder='زمان شروع' />
          <p>: زمان شروع   </p>
       </div>
       <div className='picker_container'>
          { QuestionnaireData.end_date ?  <Datepicker 
          disabled={!DateActive}
          input={<DatePickerInput placeholder="تاریخ پایان " />}
          onChange={EndDateChangeHandler}
          defaultValue={moment(convertToJalaliDate(QuestionnaireData.end_date))}
          placeholder='زمان پایان' /> : <Datepicker 
          disabled={!DateActive}
          input={<DatePickerInput readOnly={true} placeholder="تاریخ پایان " />}
          onChange={EndDateChangeHandler}
          placeholder='زمان پایان' />}
          
          <p>: زمان  پایان </p>
       </div>
      </QuestionnaireDatePickerContainer>
      <QuestionnaireDatePickerContainer>
        <div className='picker_header'>
                <p>: تنظیم مهلت پاسخ دهی </p>
                <Switch checked={TimerActive} onChange={TimerToggleHandler}/>
          </div>
          <div className='picker_container'>
      <TimePicker
                  open={TimerOpen}
                  onOpenChange={setTimerOpen}
                  onChange={TimerChangeHandler}
                  disabled={!TimerActive}
                  showNow={false}
                  defaultValue={QuestionnaireData.timer ? dayjs(QuestionnaireData.timer, 'HH:mm:ss') : null}
                />
        <p>: زمان مشخص شده</p>
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
const convertToJalaliDate = (inputDate) => {
  const [year, month, day] = inputDate.split('-');
  const jDate = jalaali.toJalaali(parseInt(year), parseInt(month), parseInt(day));
  return `${(jDate.jy)}/${(jDate.jm)}/${(jDate.jd)}`;
}
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
    case 'Pub Date Changed':
      return {
        ...State,
        pub_date : ACTION.NewDate,
        
      }
    case 'End Date Changed':
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
    case 'reset_questionnaire':
      return ACTION.Resetvalue
      
  }
}