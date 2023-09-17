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
        justify-content: center;
    }
`
export const AnimLight = styled.div`
    position : absolute;
`
export const AnimLightOne = styled(AnimLight)`
    width :200px;
    height : 100px;
    background : red;
    position : absolute;
`
export const AnimLightTwo = styled(AnimLight)`
    width :200px;
    height : 100px;
    background : blue;
    position : absolute;
    bottom : 0;
    left : 0;
`
export const AnimLightThree = styled(AnimLight)`
    width :200px;
    height : 100px;
    background : green;
    right : 0;
    position : absolute;
    top: 0;
`
export const AnimLightFour = styled(AnimLight)`
    width :200px;
    height : 100px;
    position : absolute;
    background : yellow;
    right : 0;
    bottom : 0;
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
     .swiper-slide.swiper-slide-next
     {
        justify-content : flex-start;
     }
     .swiper-slide.swiper-slide-prev
     {
        justify-content : flex-end;
     }
     .swiper-slide.swiper-slide-next .question_component
     {
        margin-top : -120px;
        opacity : 0.6;
     }
     .swiper-slide.swiper-slide-prev .question_component
     {
        margin-bottom : -120px;
        opacity : 0.6;
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
    max-height: 649px;
    overflow: scroll;

    &::-webkit-scrollbar 
    {
        width : 0;
    }
    
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