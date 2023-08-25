import { styled } from "styled-components"


export const QuestionnaireDatePickerContainer  = styled.div`
    color: var(--Neutral-Gray9);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 0.7rem 0;
    padding-bottom: 1rem;
    border-bottom: 1px solid #CCCCCC;

    & .ant-picker .ant-picker-input > input:placeholder-shown , .ant-picker-date-panel ,
    .time_picker .ant-picker-ok button , .ant-picker-input > input , 
    .ant-picker-month-btn 
    {
        font-family : IRANSans !important;
    }
 
`
export const QuestionnaireSettingContainer = styled.div`
    display : flex;
    flex-direction : column;
    font : 14px IRANSans;

    .questionnaire_setting_footer
    {
        display: flex;
        justify-content: flex-start;
    }
    .questionnaire_setting_footer button 
    {
        font-family: 'IRANSans';
        display: flex;
        align-items: center;
        margin: 1rem 0.4rem 0 0.4rem;
        height : 34px;
        border-radius : 2px;
    }
    .questionnaire_setting_footer button  p 
    {
        margin-right : 0.5rem;
    }
    .picker_header
    {
        display: flex;
        justify-content: space-between;
        flex-direction: row-reverse;
    }
    .picker_header button 
    {
        direction : ltr;
    }
    .picker_container
    {
        display: flex;
        justify-content: flex-end;
        margin-top: 1.5rem;
        text-align: right;
    }
    .picker_container p 
    {
        margin-left : 1rem;
    }
`
export const QuestionnaireCheckBoxContainer= styled.div`
    color : var(--Neutral-Gray9);
    display: flex;
    justify-content: space-between;
    font-family : IRANSans;
    padding-bottom: 1rem;
    border-bottom: 1px solid #CCCCCC;
`
