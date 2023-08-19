import React, { useEffect, useReducer, useRef, useState } from 'react'
import { ConfigProvider,  Space } from 'antd';
import { DatePicker } from "antd";
import { Button, TimePicker } from 'antd';
import { DatePicker as DatePickerJalali, JalaliLocaleListener, Calendar as CalendarJalali, useJa} from "antd-jalali";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import "moment/locale/fa"; 
import moment from "moment";
import locale from 'antd/locale/fa_IR';
import { Switch , Checkbox} from 'antd';
import 'moment/locale/fa';


import fa_IR from "antd/lib/locale/fa_IR";
import en_US from "antd/lib/locale/en_US";


const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
import { QuestionnaireDatePickerContainer , QuestionnaireSettingContainer} from '@/styles/questionnairePanel/QuestionnaireSetting';

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
    case 'Changed Date':
      return {
        ...State,
        pub_date : ACTION.NewDate[0],
        end_date : ACTION.NewDate[1],
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
        progress_bar : ACTION.NewToggleValue
      }
  }
}

const SettingPanel = ({ Questionnaire }) => {
  const [ DateValue , SetDateValue ]= useState(null);
  const [ QuestionnaireData , Dispatcher ] = useReducer(QuestionnaireReducerFunction,Questionnaire);
  const  DateSelector = useRef(null);
  const QuestionnaireObject = Questionnaire;
  const [ DateActive , SetDateActive ] = useState(false);
  const [ TimerActive , SetTimerActive ] = useState(false);
  const [TimerOpen, setTimerOpen] = useState(false);

  const DateToggleHandler = (E) => {
    SetDateActive(E);
    if(!E)
      Dispatcher({ ACTION : 'Date Cleared' });
  }
  const TimerToggleHandler = (E) => {
    SetTimerActive(E);
    if(!E)
      Dispatcher({ ACTION : 'Timer Cleared' });
  }
  const DateChangeHandler = (_, NewDateArray) => {
    Dispatcher({ ACTION : 'Changed Date' , NewDate : NewDateArray });
  }
 const TimerChangeHandler = (_, Timer) => {
    Dispatcher({ ACTION : 'Timer Change' , NewTimer : Timer });
 }
 const ToggleCheckBoxHandler = (e,ToggleName) => {
    Dispatcher({ ACTION : ToggleName , NewToggleValue : e.target.checked});
 }
 console.log(QuestionnaireData)
  return (
    <ConfigProvider locale={locale} direction="rtl">
      <QuestionnaireSettingContainer>
      <QuestionnaireDatePickerContainer>
        <DatePickerJalali.RangePicker disabledTime onChange={DateChangeHandler} popupStyle={{ fontFamily : 'IRANSans' }}
          disabled={!DateActive}  />
        <Switch onChange={DateToggleHandler}/>
      </QuestionnaireDatePickerContainer>
      <QuestionnaireDatePickerContainer>
      <TimePicker
                  open={TimerOpen}
                  onOpenChange={setTimerOpen}
                  onChange={TimerChangeHandler}
                  disabled={!TimerActive}
                  renderExtraFooter={() => (
                    <Button size="small" type="primary" onClick={() => setOpen(false)}>
                      OK
                    </Button>
                  )}
                />
        <Switch onChange={TimerToggleHandler}/>
      </QuestionnaireDatePickerContainer>
          <QuestionnaireDatePickerContainer>
            <p>نمایش پرسشنامه در صفحه های مجزا</p>
            <Checkbox onChange={e => ToggleCheckBoxHandler(e,'show_question_in_pages')}
            checked={QuestionnaireData.show_question_in_pages} 
           />
          </QuestionnaireDatePickerContainer>
          <QuestionnaireDatePickerContainer style={{ borderBottom : 'none' , paddingBottom : 0}}>
            <p>حذف نوار پیشرفت</p>
            <Checkbox onChange={e => ToggleCheckBoxHandler(e,'progress_bar')}
            checked={QuestionnaireData.progress_bar} 
             />
          </QuestionnaireDatePickerContainer>
          <QuestionnaireDatePickerContainer style={{ borderBottom : 'none' , paddingBottom : 0 }}>
            <p>حذف دکمه بعدی</p>
            <Checkbox />
          </QuestionnaireDatePickerContainer >
          <QuestionnaireDatePickerContainer style={{ borderBottom : 'none' , paddingBottom : 0}}>
            <p>حذف دکمه قبلی</p>
            <Checkbox />
          </QuestionnaireDatePickerContainer>
      </QuestionnaireSettingContainer>
        </ConfigProvider>
  )
}
export default SettingPanel;