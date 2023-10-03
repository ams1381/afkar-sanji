import QuestionComponent from "@/components/Questions/Question";
import { styled } from "styled-components";

export const PreviewPage = styled.div`
    width : 100%;
    height : 100vh;
    font-family : IRANSans;

    .answer_error_message
    {
        font-size: 14px;
        color: var(--Error-color);
        text-align: right;
    }
`
export const ControlButtonsContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
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
    .ant-btn
    {
        background : var(--primary-color);
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
    position : fixed !important;
    z-index : -1;
`
export const AnimLightOne = styled(AnimLight)`
    width: 200px;
    height: 100px;
    background: #3E4ACB;
    opacity: 0.5;
    filter: blur(83px);
    left: 65px;
    position: absolute;
    top: 30px;


    animation : LightOneAnim 3s infinite;
    animation-timing-function: ease-in-out;
    animation-duration: 5200ms;
    animation-delay: 100ms;
    
    @keyframes LightOneAnim 
    {
        0% { transform: translate(0, 0); }
        25% { transform: translate(588px, 98px);  }
        50% { transform: translate(342px, 305px);; }
        75% { transform: translate(1082px, 421px); }
        100% { transform: translate(0, 0); }
    }
`
export const AnimLightTwo = styled(AnimLight)`
    width: 200px;
    height: 100px;
    background: #87CCF2;
    filter: blur(83px);
    left: 50%;
    top: 50%;
    animation : LightTwoAnim 3s infinite;
    animation-timing-function: ease-in-out;
    animation-duration: 5200ms;
    animation-delay: 100ms;

    @keyframes LightTwoAnim 
    {
        0% { transform: translate(-50%, -50%); }
        25% {     transform: translate(-456px, 131px);  }
        50% {     transform: translate(241px, 162px); }
        75% {     transform: translate(323px, -229px); }
        100% {transform: translate(-50%, -50%); }
    }
`
export const AnimLightThree = styled(AnimLight)`
    width: 200px;
    height: 100px;
    background: #7982eb69;
    filter: blur(83px);
    right : 0;
    position : absolute;
    top: 0;

    animation : LightThreeAnim 3s infinite;
    animation-timing-function: ease-in-out;
    animation-duration: 5200ms;
    animation-delay: 100ms;
    
    @keyframes LightThreeAnim 
    {
        0% { transform: translate(-32px, 50px); }
        25% { transform: translate(-702px, 50px);  }
        50% { transform: translate(-382px, 458px); }
        75% {  transform: translate(-281px, 50px); }
        100% { transform: translate(-51px, 50px); }
    }
    
`
export const AnimLightFour = styled(AnimLight)`
    width: 200px;
    height: 100px;
    background: #7982eb;
    filter: blur(83px);
    // right : 0;
    opacity : 0.4;
    // bottom : 0;

    animation : LightFourAnim 3s infinite;
    animation-timing-function: ease-in-out;
    animation-duration: 3800ms;
    animation-delay: 100ms;

    @keyframes LightFourAnim 
    {
        0% { transform: translate(-38px, -181px); }
        25% { transform: translate(-418px, -53px);  }
        50% { transform: translate(-382px, 458px); }
        75% { transform: translate(-1220px, -101px); }
        100% { transform: translate(-1202px, -527px); }
    }
    // transform: translate(-38px, -181px);
    
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
    // &::before , &::after 
    // {
    //     width: 30%;
    //     height: 401px;
    //     position: absolute;
    //     background: #A4ABFF;
    //     content: '';
    //     opacity: 50%;
    //     filter: blur(142px);
    //     border-radius: 50%;
    //     z-index: -2;
    //     animation-delay: 1s;
    // }
    // &::before 
    // {
    //     left: 0;
    //     top: 0;
    // }
    // &::after 
    // {
    //     right: 0;
    //     bottom: 0;
    // }
     .swiper-slide
     {
        height: 75vh!important;
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
        // overflow : scroll;
     }
    //  .swiper-vertical
    //  {
    //     overflow : scroll;
    //  }
    //  .swiper-vertical::-webkit-scrollbar 
    //  {
    //     width : 0;
    //  }
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
        // margin-top : -85px;
        transform : scale(0.8);
        // transition : transform;
        opacity : 0.6;
        // animation : ScaleAnim 1s ease;
     }
     .swiper-slide.swiper-slide-prev .question_component
     {
        // margin-bottom : -120px;
        transform : scale(0.8);
        opacity : 0.6;
        // animation : ScaleAnim 1s ease;
     }
     @keyframes ScaleAnim {
        from {
            transform : scale(1)
        }
        to {
            transform : scale(0.85)
        }
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
    background: white;
    justify-content : center;

    .ant-progress 
    {
        height : 34px;
        display : flex;
        align-items : center;
    }
    .ant-progress-steps-outer .ant-progress-steps-item
    {
        width : 8px !important;
    }
`
export const PreviewQuestionsContainer = styled.div`
    width : ${p => p.slidemode ? '50%' : '30%'};
    max-height: ${p => p.slidemode ? 'auto' : '649px'};
    // overflow: ${p => p.slidemode ? 'hidden' : 'scroll'};

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
export const TimerContainer = styled.div`
    text-align: center;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    background: var(--primary-color);
    color: white;
    border-radius: 2px;
    width: 86px;
    left: 30px;
    top: 74px;
`