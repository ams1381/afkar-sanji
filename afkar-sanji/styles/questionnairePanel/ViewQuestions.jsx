import { styled } from "styled-components";

export const PreviewPage = styled.div`
    width : 100%;
    height : 100vh;
    font-family : IRANSans;
`
export const ControlButtonsContainer = styled.div`
    display: flex;
    gap: 10px;
    width: 90%;
    margin: 1rem auto;
    & button 
    {
        display : flex;
        align-items : center;
        justify-content : center;
        border-radius : 2px;
        font-family : IRANSans;
    }
`
export const PreviewPageContainer = styled.div`
    width : 100%;
    height : 100%;
    display : flex;
    align-items : center;
    justify-content : center;
`
export const PreviewPageHeader = styled.div`
    width : 100%;
    display : flex;
    justify-content : center;
    padding-top : 1rem;
`
export const PreviewQuestionsContainer = styled.div`
    width : 30%;
    @media screen and (max-width : 980px)
    {
        width : 50%;
    }
    @media screen and (max-width : 768px)
    {
        width : 70%;
    }
    @media screen and (max-width : 480px)
    {
        width : 80%;
    }
`