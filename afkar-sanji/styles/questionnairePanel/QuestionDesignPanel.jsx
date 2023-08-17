import { styled } from "styled-components";

export const QuestionnairePanelBodyContainer = styled.div`
    font-family: 'IRANSANS';
    margin-top: 0.9rem;
    font-size: 14px;
`
export const QuestionSearchContainer = styled.div`
    border: 1px solid #D9D9D9;
    position: relative;
    height: 40px;
    font-family: 'IRANSANS';

    & label 
    {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #D9D9D9;
        padding: 0.6rem 0.9rem 0.6rem 0.9rem;
        cursor : pointer;
    }
`
export const QuestionSearchInput = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    text-align: right;
    font-family: 'IRANSANS';
    padding: 0.7rem;

`
export const ClearSearchInputButton = styled.button`
    display: flex;
    left: 60px;
    top: 0;
    width: 10%;
    background: none;
    border: none;
    align-items: center;
    outline: none;
    position: absolute;
    height: 100%;
    cursor : pointer;
`
export const QuestionDesignTitle = styled.div`
    text-align: right;
    color: var(--Neutral-Gray9);
    margin-top: 0.9rem;
`
export const QuestionDesignBox = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-top: 1rem;

    & > div
    {
        width: 50%;
    }
    @media screen and (max-width : 768px) {
        & div:first-child
        {
            width: 100%;
        }
        & div:last-child
        {
            display: none;
        }
    }
`
export const QuestionDesignItem = styled.div`
    padding: 1rem;
    border: 2px solid #D9D9D9;
    border-radius: 2px;
    margin: 0.6rem auto;
`
export const QuestionItemSurface = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;

    & > div
    {
        display: flex;
        flex-direction: row-reverse;
    }
`
export const DropDownQuestionButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
`
export const QuestionItemButtonContainer = styled.div`
    width: 10%;
    display: flex;
    justify-content: space-between;

    & button 
    {
        background: none;
        border: none;
        outline: none;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
`