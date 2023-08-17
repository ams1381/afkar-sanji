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
        & .QuestionDesignLeftContainer
        {
            display : none;
        }
    }
`
export const QuestionDesignItem = styled.div`
    padding: 1rem;
    border: 2px solid #D9D9D9;
    border-radius: 2px;
    margin: 0.6rem auto;

    .question_bold_info 
    {
        display : flex;
    }
    .question_bold_info  .question_type_selector {
        border: 1px solid var(--primary-color);
        background: #F5F5F5;
        display: flex;
        align-items: center;
}
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
    margin-left: 0.5rem;

    & i 
    {
        transition : 0.3s;
        transform : ${p => p.dropped ? 'rotate(-90deg)' : 'none'};
    }
    
`
export const QuestionItemButtonContainer = styled.div`
    width: 20%;
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
    @media screen and (max-width : 480px)
    {
        width: 35%;
    }
   
`
export const QuestionItemActionSelector = styled.div`
    width: 100%;
    margin-top: 0.8rem;
    border-top: 1px solid #0000000F;
    display: flex;
`
export const QuestionItemActionButton = styled.button`
    width: 50%;
    display: flex;
    justify-content: center;
    background: none;
    border: none;
    border-bottom : ${p => p.selected ? '1px solid var(--primary-color)' : 'none'};
    color : ${p => p.selected ? 'var(--primary-color)' : '--Neutral-Gray9'};
    flex-direction: row-reverse;
    font: 12px IRANSans;
    height: 40px;
    align-items: center;
    cursor: pointer;
    margin-top: 0.4rem;
    transition : 0.3s;
    & p 
    {
        margin-left: 0.5rem
    }
    & svg
    {
        transition : 0.3s;
        fill : ${p => p.selected ? 'var(--primary-color)' : '#8F8F8F'}
    }
`
export const QuestionItemSettingContainer = styled.div`
    width: 100%;
    margin-top: 1rem;
`
export const QuestionItemTitleContainer = styled.div`
    height: 40px;
    border: 1px solid var(--primary-color);
    border-radius: 2px;
    width: 100%;
`
export const QuestionItemTitleInput = styled.input` 
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    text-align: right;
    font-family: 'IRANSANS';
    padding: 0.7rem;
`
export const QuestionItemFooter = styled.div`
    display : flex;
    gap : 10px;
    margin-top: 0.7rem;
    button 
    {
        width : 50%;
        height : 34px;
        border-radius : 2px;
        text-align : center;
        font-family : IRANSans;
    }
`