import { styled } from "styled-components"

export const QuestionFileUploadContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    font-size: 14px;
    color: var(--Neutral-Gray6);
    padding-bottom: 24px;
    margin-top: 1.3rem;
    flex-direction: row-reverse;
    border-bottom: 1px solid rgb(217 217 217 / 20%);
    // flex-wrap: wrap;

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
    .ant-upload-list-item-name
    {
        word-break: break-word !important;
        white-space: initial !important;
        text-overflow: clip !important;
    }
    .ant-upload-list-item-undefined
    {
        transition : 0.3s !important;
        border-radius : 2px !important;
        border-color : ${p => p.uploaderror ? '#ff4d4f' : '#d9d9d9'} !important;
        color : ${p => p.uploaderror ? '#ff4d4f' : 'black'} !important;
    }
    .upload-list-inline .ant-upload-list-item {
        float: left;
        width: auto !important;
        margin-inline-end: 8px;
      }
    .ant-upload-list-item
    {
        height : auto !important;
        border-radius : 2px !important;
    }
    .file_upload_title
    {
        white-space : nowrap;
    }
    .ant-upload.ant-upload-select
    {
        display : ${p => p.fileuploaded ? 'none' : 'block'}
    }
    .ant-upload-list-item .ant-btn
    {
        display : flex;
        justify-content : center;
    }
`
export const QuestionDescriptionContainer = styled.div`
    display: flex;
    flex-direction : column;
    margin: 24px auto 48px auto;

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
    border-radius: 2px;
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
        border-bottom: 1px solid rgb(217 217 217 / 20%);
        padding: 1.5rem 0 1.5rem 0;
        align-items: center;
    }
    // & .checkbox_container
    // {
    //     margin-top : 1.2rem;
    // }
    & .additional_option_toggle , & .additional_option_checkboxes_container
    {
        display: flex;
        justify-content: space-between;
        align-items : center;
        cursor : pointer;
    }
    & .additional_option_checkboxes_container
    {
        padding-top : 0;
    }
    .additional_option_toggle
    {
        flex-direction: row;
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
     & .ant-select-selection-item , .ant-select-selection-placeholder
    {
        font : 13px IRANSans;
    }
    .pattern_selector_container
    {
        display: flex;
        width: 100%;
        justify-content: space-between;
        color: #8F8F8F;
        align-items: center;
        padding: 24px 0;
        border-bottom: 1px solid rgb(217 217 217 / 20%);
    }
    .ant-select-selector
    {
        border-radius : 2px;
        direction: rtl;
    }
    .ant-select-arrow
    {
        left : 10px;
    }
    .ant-select
    {
        width: 130px;
    }
`
export const AlphabetNumberContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: #A3A3A3;
    text-align: left;
    margin-top: 24px;
    margin-bottom: 24px;

    & label 
    {
        display: flex;
        width: 100%;
        margin-top: 5px;
        justify-content: space-between;
    }
    & label .ant-input-number
    {
        border-radius : 2px;
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
    padding: 2px;
    width: 164px;
    background: #E9EAEF;

    & input 
    {
        display : none;
    }
    & label
    {
        cursor: pointer;
        width: 40px;
        height: 40px;
        background: #E9EAEF;
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
export const DatePickerInput = styled.input`
    cursor: not-allowed;
    border: 1px solid ${p => p.erroroccur ? 'var(--login-err-message-color) !important' :  '#d9d9d9'};
    padding: 0.4rem;
    outline: none;
    transition : 0.3s;
    border-radius: 2px;
    font-family : IRANSans;
    cursor : pointer !important;
    user-select : none;
`
export const RangeWriteContainer = styled.div`
    color : #8F8F8F;
    text-align : right;

    & .ant-slider 
    {
        margin-top : 20px !important;
        margin-bottom : 35px !important;
    }
`