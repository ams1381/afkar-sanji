import React, { useEffect, useState } from 'react'
import { ConfigProvider,  Space } from 'antd';
import { DatePicker } from "antd";
import { Button, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { Switch , Checkbox} from 'antd';
import { DatePicker as DatePickerJalali, JalaliLocaleListener, Calendar as CalendarJalali, useJa} from "antd-jalali";

import fa_IR from "antd/lib/locale/fa_IR";
import en_US from "antd/lib/locale/en_US";


const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
import { QuestionnaireDatePickerContainer , QuestionnaireSettingContainer} from '@/styles/questionnairePanel/QuestionnaireSetting';

const SettingPanel = ({ Questionnaire }) => {
  const [ DateValue , SetDateValue ]= useState(null);
  const [open, setOpen] = useState(false);
  const DateChangeHandler = (e,h) => {
    console.log(h)
  }

  return (
    <ConfigProvider locale={fa_IR} direction="rtl">
      <QuestionnaireSettingContainer>
      <QuestionnaireDatePickerContainer>
        <DatePickerJalali.RangePicker disabledTime onChange={DateChangeHandler} popupStyle={{ fontFamily : 'IRANSans' }}
         style={{ fontFamily : 'IRANSans' }} />
        <Switch />
      </QuestionnaireDatePickerContainer>
      <QuestionnaireDatePickerContainer>
      <TimePicker
                  open={open}
                  onOpenChange={setOpen}
                  renderExtraFooter={() => (
                    <Button size="small" type="primary" onClick={() => setOpen(false)}>
                      OK
                    </Button>
                  )}
                />
        <Switch />
      </QuestionnaireDatePickerContainer>
          <QuestionnaireDatePickerContainer>
            <p>نمایش پرسشنامه در صفحه های مجزا</p>
            <Checkbox />
          </QuestionnaireDatePickerContainer>
          <QuestionnaireDatePickerContainer style={{ borderBottom : 'none' , paddingBottom : 0}}>
            <p>حذف نوار پیشرفت</p>
            <Checkbox />
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