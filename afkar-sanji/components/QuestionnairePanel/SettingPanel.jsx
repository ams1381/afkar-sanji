import React, { useState } from 'react'
import { ConfigProvider,  Space } from 'antd';
import { DatePicker } from "antd";
import { Button, TimePicker } from 'antd';
import { Switch , Checkbox} from 'antd';
import { DatePicker as DatePickerJalali, JalaliLocaleListener, Calendar as CalendarJalali, useJa} from "antd-jalali";

import fa_IR from "antd/lib/locale/fa_IR";
import en_US from "antd/lib/locale/en_US";


const { RangePicker } = DatePicker;
import { QuestionnaireDatePickerContainer , QuestionnaireSettingContainer} from '@/styles/questionnairePanel/QuestionnaireSetting';

const SettingPanel = () => {
  const [open, setOpen] = useState(false);
  return (
    <ConfigProvider locale={fa_IR} direction="rtl">
      <QuestionnaireSettingContainer>
      <QuestionnaireDatePickerContainer>
        <DatePickerJalali.RangePicker disabledTime
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
      <QuestionnaireDatePickerContainer>
        <p>حذف نوار پیشرفت</p>
        <Checkbox />
      </QuestionnaireDatePickerContainer>
      <QuestionnaireDatePickerContainer>
        <p>حذف دکمه بعدی</p>
        <Checkbox />
      </QuestionnaireDatePickerContainer>
      </QuestionnaireSettingContainer>
      
           
        </ConfigProvider>
  )
}
export default SettingPanel;