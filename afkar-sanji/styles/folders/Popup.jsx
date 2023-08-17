import { styled } from "styled-components";

export const AddQuestionnaireModalInput = styled.input`
    width: 100%;
    padding: 0.5rem;
    border-radius: 2px;
    outline: none;
    border: 1px solid var(--Neutral-Gray10);
    transition : border 0.3s;
    font-family: 'IRANSans';

    &:focus
    {
        border: 1px solid var(--primary-color);
    }
`
export const ModalButtonsContainer = styled.div`
    display : flex;
    & button 
    {
        font-family : IRANSans;
        font-size: 13px;
        border-radius : 2px;
    }
    & button:last-child
    {
        border: 1px solid var(--primary-color);
        color : var(--primary-color);
    }
`
export const RemoveModalButtonsContainer = styled.div`
    display : flex;
    & button 
    {
        font-family : IRANSans;
        font-size: 13px;
        border-radius : 2px;
    }
    & button:last-child
    {
        border: 1px solid var(--Error-color);
        color : var(--Error-color);
    }
`
export const ModalContentContainer = styled.div`
    color : var(--Neutral-Gray10);
    text-align : right;
    & p 
    {
        margin: 0 0 0.9rem 0;
    }
`
export const RemoveFolderModalContainer = styled.div`
    width : 95%;
    margin : 0 auto;
    font-family : IRANSans;
    text-align: right;
`
export const RemoveFolderModalHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    text-align: right;
    flex-direction: row-reverse;
    align-items: flex-start;

    & p:first-child
    {
        margin-right : 0.7rem;
        font-weight: 600;
        color : #000000D9;

    }
`
export const RemoveModalTextContent = styled.div`
    display: flex;
    flex-direction: column;
    line-height: 2rem;
`
export const RemoveModalIcon = styled.div`
    margin-top: 5px;
`