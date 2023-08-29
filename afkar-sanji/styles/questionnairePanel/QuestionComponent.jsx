import { styled } from "styled-components";


export const QuestionComponentContainer = styled.div`
    width: ${p => p.mobilePreview ? '100%' : '90%'};
    margin: 0.55rem auto;
    word-break: break-word;
    text-align: right;
    box-shadow: ${p => (p.childq || p.mobilePreview) ? 'none' : '0px 2px 8px 0px rgba(0, 0, 0, 0.15)'};
    padding: 1rem;
    border-radius: 2px;
    background: ${p => p.mobilePreview ? 'none' : 'var(--surface)'};

    .uploaded_file_preview .video-react-button.video-react-big-play-button
    {
        left: 50%;
        top: 50%;
        transform: translate(-50%,-30%);
    }
`
export const QuestionTitle = styled.div`
    display: flex;
    justify-content: flex-end;
    color: #1D1D1D;
    margin: 0.6rem auto;
    font-size: 16px;
    font-weight: 600;
    word-break: break-word;

    .question_header
    {
        font-weight : 600;
    }
    .question_number
    {
        margin-left : 0.5rem;
        white-space: nowrap;
    }
`
export const QuestionDescription = styled.div`
    color : #666666;
    margin-bottom : 0.4rem;
`
export const WelcomeComponentContainer = styled.div`
    text-align : center;
    display: flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
    width: 70%;
    margin: 0 auto;
    & p 
    {
        margin : 0.2rem auto;
    }
    & p::first-child 
    {
        font-size: 16px;
    }
    & p::last-child
    {
        font-size : 14px;
    }
    & button 
    {
        font-family : IRANSans;
        margin-top : 0.4rem;
        border-radius : 2px;
        background: var(--primary-color);
    }
    .welcome_title
    {
        font-weight : 700;
    }
`
export const OptionalAnswerBlockContainer = styled.div`
    display: grid;
    grid-template-columns : ${p => p.vertical ? 'auto' : 'auto auto'};
    direction: rtl;
   
    &  .OptionalAnswerItemContainer
    {
            display: flex;
            justify-content: flex-start;
            flex-direction: row;
            background: #FFFFFF;
            border: 2px dotted rgb(217, 217, 217);
            color: var(--Neutral-Gray9);
            padding: 0.4rem;
            margin: 0.4rem 0.4rem;
            border-radius: 2px;
            align-items: center;
            cursor : pointer;
            word-break: break-word;
            min-height: 40px;
    }
    & > .OptionalAnswerItemContainer p 
    {
        margin-right : 0.5rem;
        direction: rtl
    }
     & .Prioritize
    {
        grid-template-columns : auto !important;
    }
    & .ant-input
    {
        border-radius: 2px;
        width: 90%;
        margin-right: 0.8rem;
        font-family: 'IRANSANS';
    }
`
export const QuestionWithAnswerContainer = styled.div`
    position : relative;
    margin-top : 0.7rem;

    & .ant-select-selector input
    {
        font-family : IRANSans;
    }
`
export const TextAnswerInputBox = styled.input`
    border: 1px solid #D9D9D9;
    background: white;
    width: 100%;
    outline: none;
    transition: 0.3s;
    text-align: right;
    padding: 8px 12px 8px 12px;
    border-radius: 2px;
    font-family: 'IRANSans';
    direction: rtl;

    &:focus
    {
        border : 1px solid var(--primary-color);
    }
`
export const DropDownContainer = styled.div`
    margin : 0.7rem 0;

    & .ant-select-selection-search-input , .ant-select-selection-placeholder
    {
        font-family : IRANSans;
        color : #A3A3A3;
    }
    & .ant-select-selection-placeholder
    {
        font-size : 13px;
    }
    & .ant-select-selection-item
    {
        font-family : IRANSans;
    }
`
export const EmailInputContainer = styled.div`
    display: flex;
    border: 1px solid #D9D9D9;
    align-items: center;
    height: 40px;
    
    & input 
    {
        border: none;
        text-align: right;
    }
    & input:focus
    {
        border : none;
        box-shadow : none;
    }
    & span 
    {
        height: 100%;
        align-items: center;
        margin: 0 0.8rem 0 0.6rem;
        display: flex;
    }
`
export const RangeQuestionContainer = styled.div`
    display: flex;
    border: 3px solid #7C86FA;
    width: 90%;
    margin: 1rem auto 0 auto;
    border-radius: 2px;
    justify-content: space-around;
`
export const RangeQuestionAnswerItem = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    & input 
    {
        display : none;
    }
    & label 
    {
        width : 100%;
        height : 100%;
        background : #EEF0FF;
        color : #5360ED;
        transition : 0.3s;
        cursor : pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    & label:hover
    {
        background : #7C86FA;
        color : white;
    }
    & input:checked + label 
    {
        background : var(--primary-color);
        color : white;
    }
`
export const RangeLabelText = styled.p`

    &::before
    {
        content: '';
        position: absolute;
        width: 4px;
        height: 17px;
        background: var(--primary-color);
        top: 10px;
        left: 50%;
        transform: translate(-50% , -4px);
    }
`
export const RangeQuestionLabelContainer = styled.div`
    width: 90%;
    margin: 0.4rem auto;
    display : flex;
    justify-content : space-between;
`
export const QuestionRangeLabel = styled.div`
    position: relative;
    width: 20%;
    text-align: center;
    word-break: break-word;
    padding-top: 1.5rem;
`
export const FileSizeContainer = styled.div`
    text-align: right;
    color: #8F8F8F;

    .file_size_selector 
    {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.8rem;
    }
    .ant-input-number
    {
        border-radius : 2px;
    }
`
export const FileSizeTypeSelector = styled.div`
    display: flex;
    background: #E9EAEF;
    width: 98px;
    height: 28px;
    align-items: center;
    border-radius: 2px;
    padding: 0 2px 0 2px;

    .ant-input-number
    {
        border-radius: 2px;
    }
    label
    {
        cursor : pointer;
        justify-content: center;
        display: flex;
        align-items: center;
        width: 95%;
        border-radius: 2px;
        transition : 0.3s;
    }
    input:checked + label 
    {
        background: var(--primary-color);
        color : white;
    }
    input 
    {
        display : none;
    }
`
export const RateContainer = styled.div`
    display: flex;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
    align-items: center;
    justify-content: center;
    padding: 0.95rem 0.5rem 0.95rem 0.4rem;
    gap: 20px;


    .rate_selector {
        display: flex;
        align-items: center;
    }
    .rate_number_indicator {
        width: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #A3A3A3;
        border: 2px solid #A3A3A3;
        border-radius: 2px;
        height: 28px;
    }
    .ant-rate
    {
        display: flex;
        flex-wrap: wrap;
    }
    
`
export const FileQuestionContainer = styled.div`
    text-align : left;
    & .ant-btn
    {
        border-radius: 2px;
        direction: rtl;
        display: flex;
        align-items: center;
    }
`