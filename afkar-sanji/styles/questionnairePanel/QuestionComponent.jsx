import { Input } from "antd";
import { styled } from "styled-components";


export const QuestionComponentContainer = styled.div`
    width: ${p => p.mobilepreview ? '100%' : '90%'};
    margin: 0.55rem auto;
    word-break: break-word;
    text-align: right;
    box-shadow: ${p => (p.childq || p.mobilepreview) ? 'none' : '0px 2px 8px 0px rgba(0, 0, 0, 0.15)'};
    padding: 1rem;
    border-radius: 2px;
    background: ${p => p.mobilepreview ? 'none' : 'var(--surface)'};

    .uploaded_file_preview .video-react-button.video-react-big-play-button
    {
        left: 50%;
        top: 50%;
        transform: translate(-50%,-30%);
    }
    .thank_description
    {
        color: #1D1D1D;
        font-size: 14px;
        margin-bottom: 20px;
    }
    .default_thanks_button_container {
        display: flex;
        gap: 15px;
        align-items: center;
        flex-direction: row-reverse;
    }
    .default_thanks_button_container button {
        width: 50%;
        height: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px 7px;
        background: var(--surface);
        box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
        border: 1px solid #D9D9D9;
        border-radius: 2px;
        cursor : pointer;
        transition : 0.3s;
    }
    .default_thanks_button_container button:hover 
    {
        border: 1px solid var(--primary-color);
        color : var(--primary-color)
    }
    .brand_button 
    {
        text-align: center;
        margin-top: 60px;
    }
    .brand_button  button 
    {
        border-radius : 2px;
    }
    .brand_button  button p span 
    {
        font-weight : 700;
    }
    .video-react .video-react-progress-holder .video-react-play-progress
    {
        display : flex;
        // width : auto !important;
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
    & p 
    {
        direction: rtl;
    }
`
export const QuestionDescription = styled.div`
    color : #666666;
    margin-bottom : 0.4rem;
    direction: rtl;
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
    gap: 16px;
    margin-top: 20px;
   
    &  .OptionalAnswerItemContainer
    {
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        background: #FFFFFF;
        border: 2px dotted rgb(217, 217, 217);
        color: var(--Neutral-Gray9);
        border-radius: 2px;
        align-items: center;
        padding: 4px 8px;
        word-break: break-word;
        min-height: 40px;
        cursor : pointer;
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
export const TextAnswerInputBox = styled(Input)`
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
    .ant-select-selection-item-content
    {
        color : var(--primary-color);
    }
    .ant-select-selector
    {
        border-radius : 2px;
    }
`
export const EmailInputContainer = styled.div`
    display: flex;
    border: 1px solid #D9D9D9;
    align-items: center;
    height: 40px;
    
    & input 
    {
        // border: none;
        text-align: right;
        border-radius: 2px;
        height: 100%;
        font-family : IRANSans;
        direction: rtl;
    }
    & input::placeholder 
    {
        text-align : left;
    }
    & span 
    {
        height: 100%;
        display: flex;
        width: 40px;
        justify-content: center;
        align-items: center;
        background: #F5F5F5;
        border-left : 1px solid #D9D9D9;
    }
`
export const RangeQuestion = styled.div`
    width: 50%;
    margin: 20px auto;

    @media screen and (max-width : 480px)
    {
        width: 80%;
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
    width: 26%;
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
    padding: 12px;
    gap: 20px;
    width: fit-content;
    margin: 0 auto;


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
        height: 28px;
    }
    .ant-rate
    {
        display: flex;
        flex-wrap: wrap;
    }
    .ant-rate-star svg
    {
        fill : #8F8F8F;
        transition : 0.3s;
        width : 24px;
        height : 24px;
    }
    .ant-rate-star.ant-rate-star-full svg
    {
        fill : #FBDB14;
    }
    .ant-rate-star-second
    {
        display: flex;
        width: 25px;
        height: 25px;
    }
    
`
export const FileQuestionContainer = styled.div`
    text-align : left;
    & .ant-btn
    {
        border-radius: 2px;
        direction: rtl;
        display: flex !important;
        align-items: center;
        justify-content: center !important;
    }
    .ant-upload-list-item-undefined
    {
        transition : 0.3s !important;
        border-radius : 2px !important;
        border-color : ${p => p.uploaderror ? '#ff4d4f' : '#d9d9d9'} !important;
        color : ${p => p.uploaderror ? '#ff4d4f' : 'black'} !important;
    }
`
export const NumberInputContainer = styled.div`
    & .ant-input-number
    {
        font-family: IRANSans;
        direction: ltr;
        text-align: left;
        width: 100%;
        border-radius: 2px;
    }
    .ant-input-number-input-wrap
    {
        padding: 4px 12px;
    }
    .ant-input-number-input
    {
        padding : 1px;
    }
    & .ant-input-number-input-wrap input::placeholder
    {
        font-family: IRANSans;
    }
`