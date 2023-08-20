import { styled } from "styled-components";


export const QuestionComponentContainer = styled.div`
    width: 90%;
    margin: 0.55rem auto;
    text-align: right;
    box-shadow: 2px 2px 6px #00000030;
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
        font-size: 1.1rem;
        margin : 0.1rem auto;
    }
    & button 
    {
        font-family : IRANSans;
        margin-top : 0.4rem;
    }
`
export const OptionalAnswerBlockContainer = styled.div`
    display : flex;
    flex-direction : column;

    &  > div
    {
        display: flex;
        justify-content: flex-end;
        background: #FFFFFF;
        border: 1px dotted #D9D9D9;
        color: var(--Neutral-Gray9);
        padding: 0.4rem;
        margin: 0.4rem 0;
        border-radius: 2px;
        align-items: center;
    }
    & > div p 
    {
        margin-left : 0.5rem;
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