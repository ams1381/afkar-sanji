import { styled } from "styled-components";


export const QuestionnairePanelContainer = styled.div`
    width: 100%;
    height : 90vh;
`
export const PanelInnerContainer = styled.div`
    width: 90%;
    margin: 0.5rem auto;
    height: 95%;
`
export const PanelHeader = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    font: 14px IRANSans;
`
export const SeeResultButton = styled.div`
    background: none;
    border: none;
    outline: none;
    color: var(--primary-color);
    display: flex;
    font-family: 'IRANSANS';
    flex-direction: row-reverse;
    align-items: center;
    cursor: pointer;

    & p 
    {
        margin-left: 0.5rem;
    }
`
export const QuestionnaireDirectoryContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;

    & button
    {
        background: none;
        outline: none;
        border: none;
        color: var(--Neutral-Gray10);
        cursor: pointer;
        padding: 0.2rem;
        margin-right : 0.5rem;
    }
    & > div
    {
        display : flex;
    }
`
export const QuestionnaireDirectoryPath = styled.div`
    margin-left: 0.5rem;
    align-items: center;
    display : flex;

    & span 
    {
        color : #A3A3A3;
        margin-left: 0.4rem;
    }
    & p 
    {
        font-weight: 700;
    }
    & a 
    {
        text-decoration: none;
        color: var(--Neutral-Gray9);
        margin-left: 0.5rem;
    }
`
export const QuestionnaireEditItemsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    font: 13px IRANSans;
    margin: 1rem auto;

    @media screen and (max-width : 768px)
    {
        flex-direction: column-reverse;
    }
`
export const QuestionnaireEditItemsInnerContainer = styled.div`
    display: flex;
    width: 50%;
    gap: 7px;
    flex-direction: row-reverse;
    font: 13px IRANSans;
    @media screen and (max-width : 768px)
    {
        width : 100%;
    }
`
export const QuestionnaireEditItem = styled.div`
    padding: 7px 16px 7px 16px;
    color: ${p => p.selected ? 'var(--primary-color)' : 'var(--Neutral-Gray10)'};
    background: ${p => p.selected ? '#FEFEFE' : 'var(--questionnaire-edit-item-bg)'};
    border: 1px solid ${p => p.selected ? 'var(--primary-color)' : '#D9D9D9'};
    width: 95%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition : 0.3s;
`
export const QuestionnaireEditButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    & button 
    {
        background: none;
        border: 1px solid #D9D9D9;
        width: 40px;
        padding: 0.8rem 0 0.8rem 0;
        cursor: pointer;
        box-shadow: 2px 2px 5px #0000000d;
        justify-content: center;
        display: flex;
    }
    @media screen and (max-width : 768px)
    {
        margin-bottom: 0.7rem;
    }
`