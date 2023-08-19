import { styled } from "styled-components"


export const QuestionnaireDatePickerContainer  = styled.div`
    color: var(--Neutral-Gray9);
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    margin: 0.7rem 0;
    padding-bottom: 1rem;
    border-bottom: 1px solid #CCCCCC;

    & .ant-picker .ant-picker-input >input:placeholder-shown
    {
        font-family : IRANSans;
    }
`
export const QuestionnaireSettingContainer = styled.div`
    display : flex;
    flex-direction : column;
    font : 14px IRANSans;
`
export const QuestionnaireCheckBoxContainer= styled.div`
    color : var(--Neutral-Gray9);
    display: flex;
    justify-content: space-between;
    font-family : IRANSans;
    padding-bottom: 1rem;
    border-bottom: 1px solid #CCCCCC;
`
