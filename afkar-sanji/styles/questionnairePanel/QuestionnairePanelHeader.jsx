import { styled } from "styled-components";


export const QuestionnairePanelContainer = styled.div`
    width: 100%;
    height : 90vh;
`
export const PanelInnerContainer = styled.div`
    width: 84%;
    margin: 1.2rem auto;
    height: 95%;

    @media screen and (max-width : 768px)
    {
        width : 96%;
    }
`
export const PanelHeader = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    font: 14px IRANSans;

    & a
    {
        text-decoration : none;
    }
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
    height : ${p => p.loading ? '30px' : 'auto'};
    width : ${p => p.loading ? '100%' : 'auto'};
    justify-content : ${p => p.loading ? 'space-between' : 'unset'};

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
    .ant-skeleton-input
    {
        height : 20px !important;
    }
`
export const QuestionnaireDirectoryPath = styled.div`
    // margin-left: 0.5rem;
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
        text-overflow: ellipsis;
        white-space: nowrap; 
        overflow: hidden;
        max-width : 220px;
        direction: rtl;
    }
    & input
    {
        margin-left : 0;
    }
    
    @media screen and (max-width : 768px)
    {
        & a 
        {
            max-width: 141px;
        } 
    }
    @media screen and (max-width : 480px)
    {
        & a 
        {
            max-width: 121px;
        }
        & input 
        {
            max-width: 119px;
        }
    }
`
export const QuestionnaireEditItemsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    font: 13px IRANSans;
    align-items : ${p => p.loading ? 'center' : 'auto'};
    width : ${p => p.loading ? '100%' : 'auto'};
    margin: 1rem auto;

    @media screen and (max-width : 768px)
    {
        flex-direction: column-reverse;
    }
`
export const QuestionnaireEditItemsInnerContainer = styled.div`
    height : ${p => p.loading ? '40px' : 'auto'};
    align-items : ${p => p.loading ? 'center' : 'auto'};
    display: flex;
    width: 50%;
    gap: 7px;
    flex-direction: row-reverse;
    font: 13px IRANSans;

    & .ant-skeleton.ant-skeleton-element
    {
        width : 50%;
    }
    & .ant-skeleton.ant-skeleton-element .ant-skeleton-button
    {
        width : 100%;
    }
    @media screen and (max-width : 768px)
    {
        width : 100%;
    }
`
export const QuestionnaireEditItem = styled.div`
    padding: 7px 16px 7px 16px;
    color: ${p => p.selected ? 'var(--primary-color)' : 'var(--Neutral-Gray10)'};
    background: ${p => p.selected ? '#FEFEFE' : '#FEFEFE'};
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
        background: #FEFEFE;
        border: 1px solid #D9D9D9;
        width: 40px;
        padding: 0.8rem 0 0.8rem 0;
        cursor: pointer;
        box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.06);
        justify-content: center;
        display: flex;
        transition : 0.3s;
        border-radius: 2px;
    }
    & button:hover
    {
        border : 1px solid var(--primary-color);
    }
    .ant-skeleton-button
    {
        min-width : 40px !important;
    }
    @media screen and (max-width : 768px)
    {
        margin-bottom: 0.7rem;
        width : ${p => p.isloading ? '100%' : 'auto'};
    }
`