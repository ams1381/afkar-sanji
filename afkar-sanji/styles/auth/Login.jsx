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
        animation : ${p => p.filltext ? 'LoginContainerBeforeAnim 2s ease' : 'none'};
    }
    &::after 
    {
        right: 0;
        bottom: 0;

    }
    @keyframes LoginContainerBeforeAnim
    {
        25% { bottom : 0 }
        50% { top : 0  }
        75% { bottom : 0 }
        100% { top : 0 }
    }
    @keyframes LoginContainerAfterAnim
    {
        25% { top : 0  }
        50% { bottom : 0  }
        75% { top : 0  }
        100% { bottom : 0 }
    }
`
export const LoginForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align : right;
`
export const LoginHeaderText = styled.h2`
    margin: 20px auto;
    text-align: center;
    width: fit-content;
    font-size: 3rem;
    -webkit-text-fill-color: white;
    -webkit-text-stroke: 1px var(--primary-color);
    position: relative;
    font-family: Arial, Helvetica, sans-serif;
    overflow: hidden;
    transition : 0.3s;
    animation : ${p => p.filltext ? 'LoginTitleAnim 2s ease' : 'none'};
    animation-delay: 1s;

    &::after 
    {
        content: 'AfkarSanji';
        position: absolute;
        top: 0;
        left: 0;
        -webkit-text-fill-color: var(--primary-color);
        width: 0;
        overflow: hidden;
        transition: .3s;
        text-overflow: clip;
        text-align: left;
        width : ${p => p.filltext ? '100% !important' : ''};
    }
    @keyframes LoginTitleAnim 
    {
        25% { transform : scale(1.5)  }
        50% { transform : scale(1)  }
        75% { transform : scale(1.5)  }
        100% { transform : scale(1)  }
    }
`
export const LoginInput = styled.input`
    width: 100%;
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

    @media screen and (max-width : 480px)
    {
        width: 80%;
    }
    @media screen and (min-width : 481px) and  (max-width : 780px)
    {
        width: 60%;
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
    background: white;
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