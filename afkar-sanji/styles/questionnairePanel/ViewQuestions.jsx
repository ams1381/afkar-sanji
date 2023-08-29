import QuestionComponent from "@/components/Questions/Question";
import { styled } from "styled-components";

export const PreviewPage = styled.div`
    width : 100%;
    height : 100vh;
    font-family : IRANSans;
`
export const ControlButtonsContainer = styled.div`
    display: flex;
    gap: 10px;
    width: 30%;
    margin: 1rem auto;

    & button 
    {
        display : flex;
        align-items : center;
        justify-content : center;
        border-radius : 2px;
        font-family : IRANSans;
    }
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
        width : 95%;
    }
`
export const PreviewPageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    .question_component
    {
        box-shadow : none;
    }
    &::before , &::after 
    {
        width: 30%;
        height: 401px;
        position: absolute;
        background: #A4ABFF;
        content: '';
        opacity: 50%;
        filter: blur(142px);
        border-radius: 50%;
        z-index: -2;
        animation-delay: 1s;
    }
    &::before 
    {
        left: 0;
        top: 0;
    }
    &::after 
    {
        right: 0;
        bottom: 0;
    }
     .swiper-slide
     {
        height: 100vh!important;
        display: flex;
        align-items: center;
        width: 70%;
        margin: 0 auto;
        flex-direction: column;
        justify-content: center;
     }
     .swiper-wrapper
     {
        width: 100%;
        height: 100vh;
     }
    @media screen and (max-width : 768px)
    {
        .swiper-slide
        {
            width : 80%;
        }
    }
    @media screen and (max-width : 480px)
    {
        .swiper-slide
        {
            width : 100%;
        }
    }
 
`
export const PreviewPageHeader = styled.div`
    width : 100%;
    display : flex;
    justify-content : center;
    padding-top : 1rem;
`
export const PreviewQuestionsContainer = styled.div`
    width : ${p => p.slidemode ? '50%' : '30%'};
    
    @media screen and (max-width : 980px)
    {
        width : 60%;
    }
    @media screen and (max-width : 768px)
    {
        width : 80%;
    }
    @media screen and (max-width : 480px)
    {
        width : 95%;
    }
`
export const PreviewQuestionComponent = styled(QuestionComponent)`
    box-shadow : none;
    background : transparent;
`