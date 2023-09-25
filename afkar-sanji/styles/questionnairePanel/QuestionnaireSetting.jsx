import { styled } from "styled-components"


export const QuestionnaireDatePickerContainer  = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 0.7rem 0;
    padding-bottom: 1rem;
    border-bottom: 1px solid  #CCCCCC;
    pointer-events : ${p => p.disabled ? 'none' : 'all'};
    text-align : right;
    .picker_header 
    {
        color: ${p => p.disabled ? '#00000059' : 'var(--Neutral-Gray9)' };
    }
    .disable_warning
    {
        color: var(--Error-color);
        font-size: 12px;
        margin-top: 4px;
    }
    .picker_container.time_picker .ant-picker , .picker_container.date_picker
    {
        border-radius: 2px;
    }
    .picker_container.date_picker .rmdp-input
    {
        border-radius: 2px;
        width: 300px;
        height: 34px;
        padding: 5px var(--radius-XL, 12px);
        border: 1px solid var(--neutral-5, #D9D9D9);
        text-align: right !important;
        
    }
    .picker_container .rmdp-container 
    {
        background : ${p => p.active ? 'white' : 'rgba(0, 0, 0, 0.04)'}
    }
    .picker_container.date_picker .icon icon-tabler.icon-tabler-calendar-event
    {
        stroke: #8F8F8F;
    }
    .picker_container .rmdp-time-picker input
    {
        outline : none;
        border : none !important;
        width: 28px;
    }
    .rmdp-arrow-container.rmdp-up 
    {
        align-items: flex-start;
    }
    .rmdp-arrow-container.rmdp-down 
    {
        align-items: center;
    }
    .rmdp-panel
    {
        min-width: 152px !important;
    }
    .rmdp-panel-body li , .rmdp-panel-body li .b-deselect
    {
        background : var(--primary-color);
    }
`
export const TimePickerContainer = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid ${p => p.Error ? 'red' :  'var(--neutral-5, #D9D9D9)'};
    border-radius: 2px;
    padding: 5px var(--radius-XL, 12px);
    gap: var(--radius-none, 0px);
    height: 32px;
    width: 300px;
    flex-direction: row-reverse;

    & input 
    {
        width: 100%;
        text-align: right;
        border: none;
        transition : 0.3s;
        
        outline: none;
        background : transparent;
        color : ${p => p.active ? 'black' : 'rgba(0, 0, 0, 0.25)'};
        pointer-events : ${p => p.active ? 'all' : 'none'};
    }
    & input::placeholder 
    {
        color: var(--Neutral-Gray6);
    }
`
export const QuestionnaireSettingContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: #FEFEFE;
    font: 14px IRANSans;
    padding: 18px;
    border-radius: 2px;
    border: 1px solid #B8B8B8;

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
    .picker_header
    {
        display: flex;
        justify-content: space-between;
        flex-direction: row-reverse;
        text-align: right;
        cursor: pointer;
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
    .picker_container .ant-picker-content
    {
        font-family : IRANSans;
    }
    .picker_container  .rmdp-panel-body li .b-deselect
    {
        padding-right : 10px;
    }
   .ant-picker.ant-picker-range
   {
        direction : rtl;
        border-radius: 2px;
   }
    .ant-picker-range-separator
    {
        transform : rotate(180deg);
    }
    .picker_container p 
    {
        margin-left : 1rem;
    }
    .ant-picker-active-bar
    {
        display : none;
    }
    .ant-picker-input input 
    {
        direction : ltr;
        text-align : right;
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
