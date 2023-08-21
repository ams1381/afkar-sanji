import { styled } from "styled-components"

export const QuestionFileUploadContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: var(--Neutral-Gray6);
    margin : 0.7rem auto;

    & button 
    {
        display : flex;
        align-items: center;
        font-family : IRANSans;
        font-size: 13px;
        border-radius: 2px;
    }
    & button:hover 
    {
        color : black !important;
    }
`
export const QuestionDescriptionContainer = styled.div`
    display: flex;
    flex-direction : column;
    margin: 0.9rem auto;

    & .Description_checkbox_container
    {
        display : flex;
        justify-content : space-between; 
        flex-direction: row-reverse;
        color: #8F8F8F;
        cursor : pointer;
    }
    & .DescriptionInputContainer
    {
        marin-top : 0.8rem;
    }
`
export const DescriptionTextField = styled.input`
    width: 100%;
    height: 100%;
    outline: none;
    margin: 0.5rem auto;
    border: 1px solid #D9D9D9;
    text-align: right;
    padding: 5px 12px 5px 12px;
    font-family: 'IRANSANS';
    transition : 0.3s;
    direction: rtl;
    &:focus 
    {
        border : 1px solid var(--primary-color);
    }
`
export const MultipleAnswerContainer = styled.div`
    display: flex;
    flex-direction : column;
    margin: 0.9rem auto;
`
export const ToggleContainer = styled.div`
    display: flex;
    flex-direction : column;
    margin: 0.9rem auto;
    color: #8F8F8F;
    width : 100%;

    & .checkbox_container
    {
        display : flex;
        justify-content : space-between; 
        flex-direction: row-reverse;
        cursor : pointer;
        width : 100%;
    }
    & .checkbox_container
    {
        margin-top : 0.8rem;
    }
    & .additional_option_toggle , & .additional_option_checkboxes_container
    {
        display: flex;
        justify-content: space-between;
        align-items : center;
        cursor : pointer;
    }

    .additional_option_toggle
    {
        margin : 0.8rem 0;
    }
    & .additional_checkbox
    {
        display: flex;
        gap: 10px;
        width: auto !important;
        justify-content: flex-start;
        
    }
`
export const TextAnswerSettingContainer = styled.div`
     & .ant-select-selection-item
    {
        font : 13px IRANSans;
    }
`
export const AlphabetNumberContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: #A3A3A3;
    margin-top: 1rem;

    & label 
    {
        display: flex;
        width: 100%;
        margin-top: 0.8rem;
        justify-content: space-between;
    }
`
export const DegreeShapeContainer = styled.div`
    text-align: right;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    color: #8F8F8F;
`
export const ShapeSelectorContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 0.8rem;

    & input 
    {
        display : none;
    }
    & label
    {
        cursor: pointer;
        width: 40px;
        height: 40px;
        background: #E2DBF1;
        justify-content: center;
        display: flex;
        align-items: center;
        border-radius: 2px;
        transition : 0.3s;
    }
    & label svg
    { 
        width: 30px;
        height: 22px;
        fill : #8F8F8F;
        transition : 0.4s;
    }
    & input:checked + label 
    {
        background : var(--primary-color)
    }
    & input:checked + label svg
    {
        fill : white;
    }
`