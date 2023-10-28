import { Input } from "antd";
import { styled } from "styled-components";

export const Button = styled.button`
    width: 100%;
    padding: 6px 14px 6px 14px;
    background: var(--primary-color);
    color: white;
    border: 1px solid var(--login-confirm-btn-border);
    font-size: 1rem;
    font-family: IRANSans;
    border-radius: 2px;
    cursor: pointer;
    margin-top: 0.6rem;
`
export const LoginContainer = styled.div`
    width: 100%;
    position: relative;
    height: 100vh;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
    overflow: hidden;
    &::-webkit-scrollbar {
        width: 0;
        background: transparent; /* Optional: This will hide the scrollbar in WebKit browsers */
    }
`
export const LeftLight = styled.span`
    width: 30%;
    height: 401px;
    position: absolute;
    background: #A4ABFF;
    content: '';
    opacity: 50%;
    filter: blur(142px);
    border-radius: 50%;
    z-index: -2;
    right: 0;
    bottom: 0;
    animation : ${p => p.filltext ? 'LeftLightAnim 2s 0.4s' : 'none'};
    animation-timing-function: cubic-bezier(0.7, -0.4, 0.4, 1.4);
    // animation-duration: 400ms;
    animation-delay: 700ms;

    @keyframes LeftLightAnim 
    {
        0% { bottom : 0; }
        25% { bottom : 400px;
            top : 0; }
        50% { bottom : 0;
            top : 400px }
        75% { bottom : 400px;
            top : 0; }
        100% {
            bottom : 0;
            top : 400px;
        }
    }
    @media screen and (max-width : 480px)
    {
        width: 206px;
        height: 200px;
    }
`
export const RightLight = styled.span`
    left: 0;
    top: 0;
    width: 30%;
    height: 401px;
    position: absolute;
    background: #A4ABFF;
    content: '';
    opacity: 50%;
    filter: blur(142px);
    border-radius: 50%;
    z-index: -2;
    animation : ${p => p.filltext ? 'RightLightAnim 2s 0.4s' : 'none'};
    animation-timing-function: cubic-bezier(0.7, -0.4, 0.4, 1.4);
    // animation-duration: 400ms;
    animation-delay: 700ms;

    @keyframes RightLightAnim 
    {
        0% { top : 0; }
        25% { top : 400px;
            bottom : 0; }
        50% { top : 0;
            bottom : 400px }
        75% { top : 400px;
            bottom : 0; }
        100% {
            top : 0;
            bottom : 400px;
        }
    }
    @media screen and (max-width : 480px)
    {
        width: 206px;
        height: 200px;
    }
`
export const LoginForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align : right;

  .input_label_message 
  {
    padding: 10px 0px;
    font-size: 14px;
    color: var(--Neutral-Gray6);
  }
  .animation_container::before
  {
    content: '';
    width: 4px;
    height: 42px;
    background: var(--Neutral-Gray10);
    position: absolute;
    right: 0;
    bottom: 209px;
    transition : 0.05s;
    opacity : ${p => p.transitionLine ? '1' : '0'};
    z-index: 5;
`
export const LoginHeaderText = styled.h2`
    margin: 20px auto;
    text-align: center;
    width: fit-content;
    font-size: 43.59px;
    -webkit-text-fill-color: white;
    -webkit-text-stroke: 1px var(--primary-color);
    position: relative;
    font-family: Arial, Helvetica, sans-serif;
    overflow: hidden;
    transition : 0.3s;
    animation : ${p => p.filltext ? 'LoginTitleAnim 1.7s ease' : 'none'};
    animation-timing-function: cubic-bezier(0.7, -0.4, 0.4, 1.4);
    // animation-duration: 400ms;
    animation-delay: 800ms;

    &::after 
    {
        content: 'Mah';
        position: absolute;
        top: 0;
        left: 0;
        -webkit-text-fill-color: var(--primary-color);
        width: 0;
        overflow: hidden;
        transition: width 0.3s;
        text-overflow: clip;
        text-align: left;
        // animation : ${p => p.halffill ? 'OTPAnimation 1s ease' : 'none'};
        width : ${p => p.filltext ? '100% !important' : p.halffill ? '50% !important' : ''};
        // width : ${p => p.halffill ? '50% !important' : ''}; 
    }
    @keyframes OTPAnimation
    {
        from { width : 0 }
        to { width : 50% }
    } 
    @keyframes LoginTitleAnim 
    {
        25% { transform : scale(1.5)  }
        50% { transform : scale(1)  }
        75% { transform : scale(1.5)  }
        100% { transform : scale(1)  }
    }
    @media screen and (max-width : 480px)
    {
        font-size: 40px;
    }
`

export const TextProgress = styled.div`
  font-size: 40px;
  white-space: nowrap;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 0.5px var(--primary-color);
  position: relative;
  text-align: center;
  margin: 0 auto;
  width: fit-content;
  animation : ${p => p.filltext ? 'LoginTitleAnim 1.7s ease' : 'none'};
  animation-timing-function: cubic-bezier(0.7, -0.4, 0.4, 1.4);
  // animation-duration: 400ms;
  font-family: 'IRANSANS';
  animation-delay: 800ms;
  font-weight: 800;

  @keyframes LoginTitleAnim
  {
    25% { transform : scale(1.5)  }
    50% { transform : scale(1)  }
    75% { transform : scale(1.5)  }
    100% { transform : scale(1)  }
  }
  @media screen and (max-width: 480px)
  {
    font-size: 30px;
  }
`
export const TextInnerProgress = styled.div`
  color: var(--primary-color);
  position: absolute;
  -webkit-text-fill-color: var(--primary-color);
  top: 0;
  left: 0;
  text-align: center;
  width: ${p => p.filltext ? '100%' : p.halffill ? '50%' : '0'};
  white-space: nowrap;
  font-size: 40px;
  overflow: hidden;
  transition: 0.3s;
  
  
  @media screen and (max-width: 480px)
  {
    font-size: 30px;
  }
`
export const LoginInput = styled.input`
    width: 92%;
    border : none;
    background: var(--login-input-bg-color);
    padding: 8px 12px 8px 12px;
    outline: none;
    -moz-appearance: textfield;
    color: var(--login-input-text-color);
    font-family: 'IRANSANS';
    
    &::placeholder 
    {
        color: var(--login-input-placeholder-color);
    }
    &::-webkit-inner-spin-button , 
    &::-webkit-outer-spin-button
    {
        -webkit-appearance: none;
    }
    &:-webkit-autofill {
       background : red;
      }
    &:autofill {
        background : red;
    }
`
export const LoginBox = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 32%;
    height: 60%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow-x: ${p => p.filltext ? 'initial' : 'hidden'};
  &::-webkit-scrollbar
  {
    width: 0;
  }
    @media screen and (max-width : 480px)
    {
        width: 93%;
    }
    @media screen and (min-width : 481px) and  (max-width : 780px)
    {
        width: 75%;
    }
`
export const InputBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0.8rem 0 0.5rem 0;
    position: relative;
    border-radius: 4px;
    justify-content: space-between;
    border: 2px solid ${p => p.focused ? 'var(--login-input-default-border)' : '#7ACCFF'} ;
    transition: 0.3s border;
    margin-bottom: 0;
    background: white;

    .resend_button_container .ant-btn-loading
    {
        box-shadow : none !important;
        border: none !important;
    }
`
export const FormChildDiv = styled.div`
    color: var(--form-body-header-color);
    font-size: 0.85rem;
    text-align: right;
    line-height: 1.5rem;
    word-break: break-word;
    font-family: IRANSans;
`
export const ClearLoginInputButton = styled.span`
    display: flex;
    width: 10%;
    // background: white;
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    cursor: pointer;
    justify-content: center;
    align-items: center;

    & i 
    {
        background: url('/Icons/ClearInput.svg') no-repeat;
        background-position: center;
        width : 15px;
        height : 15px;
    }
    


`
export const LoginErrorMessage = styled.span`
    margin: 0.5rem 0 0.5rem 0;
    text-align: right;
    color: var(--login-err-message-color);
    font-weight: 700;
    font-family: 'IRANSANS';
    font-size: 14px;
    transition : 0.3s;
`