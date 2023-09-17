const { styled } = require("styled-components");

export const ErrorPageTitle = styled.h1`
    color: var(--primary-color);
    font-family: Gilory;
    font-weight: bolder;
    font-size: 10rem;
    -webkit-text-stroke: 11.5px var(--primary-color);
    text-align: center;
    letter-spacing: 9px;

    &::before
    {
        content: '';
        width: 230px;
        filter: blur(47px);
        height: 186px;
        background: #a4abffd4;
        opacity: 0.5;
        position: absolute;
        left: 50%;
        z-index: -1;
        top: 50%;
        transform: translate(-50%,-50%);
    }
`
export const ErrorContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 32%;
    height: 60%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: IRANSans;
    justify-content: center;
    color : var(--Neutral-Gray9);

    & button
    {
        font-family: 'IRANSANS';
        margin-top: 1rem;
        border-radius: 2px;
    }
    .error_inner_container
    {
        text-align : center;
        position: relative;
    }
    .error_inner_container::before
    {
        content: '';
        width: 158px;
        height: 158px;
        background: #a4abff;
        opacity: 0.5;
        position: absolute;
        filter: blur(53px);
        left: 53px;
        z-index: -1;
        animation: RotateAnim  2s linear infinite; /* Apply the animation */
        border-radius: 50%; /* Make it circular */
        transform-origin: center; /* Rotate around the center of the circle */
    }

    @keyframes RotateAnim 
    {
        0% {
            transform: rotate(0deg) translateX(200px);
          }
          100% {
            transform: rotate(360deg) translateX(200px);
          }
    }

`
export const RotatingLight = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    animation: OuterRotateAnim 3s linear infinite;
    animation-delay : 1s;

    &::before , &::after
    {
        content : '';
        position: absolute;
        width: 158px;
        height: 158px;
        background: #a4abff;
        filter: blur(53px);
    }
    &::after
    {
        top : 0;
        left : 100px;
        opacity: 0.3;
    }
    &::before
    {
        bottom : 0;
        right : 0;
        opacity: 0.5;
        margin-right: 30px;
    }
    @keyframes OuterRotateAnim 
    {
        0% {
            transform: rotate(0deg) translateX(355px);
        }
        100% {
            transform: rotate(358deg) translateX(355px);
    }
`