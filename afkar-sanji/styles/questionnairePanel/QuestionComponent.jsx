import { styled } from "styled-components";


export const QuestionComponentContainer = styled.div`
    width: 90%;
    margin: 0.55rem auto;
    text-align: right;
    box-shadow: ${p => p.childq ? 'none' : '2px 2px 6px #00000030'};
    padding: 1rem;
    border-radius: 2px;
`
export const QuestionTitle = styled.div`
    display: flex;
    justify-content: flex-end;
    color: #666666;
    margin: 0.6rem auto;
    font-size: 16px;
    font-weight: 600;
    word-break: break-word;

    .question_header
    {
        font-weight : 600;
    }
`
export const QuestionDescription = styled.div`
    color : #666666;
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
    }
`
export const OptionalAnswerBlockContainer = styled.div`
    display: grid;
    grid-template-columns : ${p => p.vertical ? 'auto' : 'auto auto'};

    &.OptionalAnswerItemContainer.Prioritize
    {
        grid-template-columns : auto !important;
    }
    

    &  > div
    {
            display: flex;
            justify-content: flex-start;
            flex-direction: row-reverse;
            background: #FFFFFF;
            border: 1px dotted #D9D9D9;
            color: var(--Neutral-Gray9);
            padding: 0.4rem;
            margin: 0.4rem 0.4rem;
            border-radius: 2px;
            align-items: center;
            cursor : pointer;
            word-break: break-word;
    }
    & > div p 
    {
        width : 70%;
        margin-right : 0.5rem;
        direction: rtl
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