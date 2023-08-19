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

    & .checkbox_container
    {
        display : flex;
        justify-content : space-between; 
        flex-direction: row-reverse;
        color: #8F8F8F;
        cursor : pointer;
    }
    & .checkbox_container
    {
        marin-top : 0.8rem;
    }
`