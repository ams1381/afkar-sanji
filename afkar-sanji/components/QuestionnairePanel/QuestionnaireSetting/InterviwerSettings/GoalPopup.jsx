import {RemoveModalButtonsContainer} from "@/styles/folders/Popup";
import {Button, InputNumber, message, Modal} from "antd";
import React, {useEffect, useState} from "react";
import {styled} from "styled-components";
import DatePicker, {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import {TimePickerContainer} from "@/styles/questionnairePanel/QuestionnaireSetting";
import {Icon} from "@/styles/icons";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import persian_fa from "react-date-object/locales/persian_fa";
import {digitsEnToFa, digitsFaToEn} from "@persian-tools/persian-tools";
import {convertDate} from "@/components/QuestionnairePanel/QuestionnaireSetting/SettingPanel";
import axios from "axios";
import {axiosInstance} from "@/utilities/axios";
import moment from "moment-jalaali";

export const GoalPopup = ({ setCountPopupOpen , countPopupOpen , refetch , Questionnaire }) => {
    const [ goalCount , setGoalCount ] = useState(Questionnaire.answer_count_goal);
    const [ MessageApi , MessageContext ] = message.useMessage();
    const [ goalStartDate , setGoalStartDate ] = useState(null);
    const [ goalEndDate , setGoalEndDate ] = useState(null);
    const [ confirmLoading , setConfirmLoading ] = useState(false);
    useEffect(() => {
        if(Questionnaire.goal_start_date)
            setGoalStartDate(digitsEnToFa(convertDate(Questionnaire.goal_start_date,'jalali')))
        if(Questionnaire.goal_end_date)
            setGoalEndDate(digitsEnToFa(convertDate(Questionnaire.goal_end_date,'jalali')))
    },[])

    const ChangeGoalDateHandler = (_,Date) => {
        if(Date.validatedValue.length === 1) {
            setGoalStartDate(Date.validatedValue[0])
            // goalStartDate(convertDate(digitsFaToEn(Date.validatedValue[0]),'gregorian'))
        }
        else if(Date.validatedValue.length === 2) {
            setGoalEndDate(Date.validatedValue[1])
        }
        else {
            setGoalStartDate(null);
            setGoalEndDate(null);
        }
    }
    const ConfirmChanges = async () => {
        setConfirmLoading(true)
        let GoalInfo = {
            answer_count_goal : goalCount
        }
        // console.log(moment(digitsFaToEn(goalStartDate), 'jYYYY/jMM/jDD').locale('en').format('YYYY-MM-DD'))
        if(goalStartDate)
            GoalInfo.goal_start_date = moment(digitsFaToEn(goalStartDate), 'jYYYY/jMM/jDD').locale('en').format('YYYY-MM-DD');
        if(goalEndDate)
            GoalInfo.goal_end_date = moment(digitsFaToEn(goalEndDate), 'jYYYY/jMM/jDD').locale('en').format('YYYY-MM-DD');

        try {
            await axiosInstance.patch(`/interview-api/interviews/${Questionnaire.uuid}/`,GoalInfo)
            setConfirmLoading(false);
            refetch();
            setCountPopupOpen(false);
        }
        catch (err) {
            setConfirmLoading(false)
            MessageApi.error({
                content : Object.values(err?.response?.data)[0]
            })
        }

    }
    return <>
        {MessageContext}
        <Modal mask={true}
               preserve={false}
               destroyOnClose={true}
               onCancel={() => setCountPopupOpen(false)}
               modalRender={(ReactNode) => <div style={{ direction : 'rtl' }}>{ReactNode}</div>}
               centered={true}
               closeIcon={true}
               title={<p>پرسشگران موردنیاز</p>}
               maskClosable={true}
               footer={<RemoveModalButtonsContainer style={{ direction : 'ltr' }}>
                   <Button type='primary' onClick={ConfirmChanges} loading={confirmLoading}>
                       ثبت
                   </Button>
                   <Button style={{ border : '1px solid var(--neutral-5, #D9D9D9) !important' , color : 'auto !important' }} onClick={() => setCountPopupOpen(false)}>
                       انصراف
                   </Button>
               </RemoveModalButtonsContainer>}
               open={countPopupOpen}>

            <ContentContainer>
                <ContentColumn >
                    <p>
                        بازه‌ی زمانی
                    </p>
                    <DatePicker  format=" YYYY/MM/DD"
                        // disabled={!DateActive}
                                 rangeHover
                                 dateSeparator="تا"
                                 minDate={new DateObject({ calendar: persian })}
                                 render={(value, openCalendar) => {
                                     return (
                                         <TimePickerContainer style={{ direction : 'ltr' }}>
                                             <input
                                                 value={`${goalEndDate ? goalEndDate : ''}  ${(goalEndDate || goalStartDate) ? '~' : ''} ${goalStartDate ? goalStartDate : ''}`}
                                                 style={{ pointerEvents : 'all' , color : 'black' }} onClick={openCalendar}
                                                 placeholder='انتخاب تاریخ' />
                                             <Icon name='Calender' />
                                         </TimePickerContainer>
                                     )}}
                                 range
                                 plugins={[
                                     <TimePicker position="bottom" />,
                                     <DatePanel position="left" />
                                 ]}
                        // onChange={DateChangeHandler}
                                 calendar={persian}
                                 onChange={ChangeGoalDateHandler}
                                 calendarPosition="top-left"
                                 locale={persian_fa}
                    />
                </ContentColumn>
                <ContentColumn>
                    <p>تعداد نتایج موردنیاز</p>
                    <div>
                        <NumberInput min={1} style={{ fontFamily : 'IRANSans' }}
                                     onChange={(e) => setGoalCount(e) }
                                     value={goalCount} />
                    </div>
                </ContentColumn>
            </ContentContainer>
        </Modal>
    </>
}
const persianNumber = (input) => {
    const persianDigits = input.toString().replace(/\d/g, (digit) => String.fromCharCode(digit.charCodeAt(0) + 1728));
    return persianDigits.replace(/\d/g, (digit) => String.fromCharCode(digit.charCodeAt(0) + 1584));
};
const arabicNumber = (input) => {
    // Check if the input is empty or only contains Persian/Arabic digits
    const isValidInput = /^[\u0660-\u0669\u06f0-\u06f9]*$/.test(input);

    // If it's not a valid input, return empty string to prevent typing unexpected characters
    if (!isValidInput) {
        return '';
    }

    const arabicDigits = input.toString().replace(/[۰-۹]/g, (digit) => digit.charCodeAt(0) - 1728);
    return arabicDigits.replace(/[٠-٩]/g, (digit) => digit.charCodeAt(0) - 1632);
};
const NumberInput = styled(InputNumber)`
  direction: ltr;
  width: 100%;
  border-radius: 2px;
`
const ContentContainer = styled.div`
    display: flex;
    gap: 10px;
    padding: 24px 0;
`
const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  .ant-input-number-input
  {
    font-family: IRANSans !important;
  }
  .b-deselect
  {
    margin-right: 10px !important;
  }
`