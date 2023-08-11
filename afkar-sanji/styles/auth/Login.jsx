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
`
export const LoginForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
`
export const LoginHeaderText = styled.h2`
    margin: 20px auto;
    text-align: center;
    width: fit-content;
    font-size: 3rem;
    -webkit-text-fill-color: white;
    -webkit-text-stroke: 1px var(--primary-color);
    position: relative;

    &::after 
    {
        content: 'Afkar Sanji';
        position: absolute;
        top: 0;
        left: 0;
        -webkit-text-fill-color: var(--primary-color);
        width: 0;
        overflow: hidden;
        transition: .6s;
    }
`
export const LoginInput = styled.input`
    width: 100%;
    border: 2px solid var(--login-input-border-color);
    background: var(--login-input-bg-color);
    padding: 8px 12px 8px 12px;
    outline: none;
    -moz-appearance: textfield;
    color: var(--login-input-text-color);
    font-family: 'IRANSANS';
    border-radius: 4px;
    transition: 0.3s border;

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
    position: absolute;
    right: 0.6rem;
    top: 0.8rem;
    display: flex;
    cursor: pointer;

    & i 
    {
        background: url('../../public/Icons/Shape.svg');
        width: 15px;
        height: 15px;
        background-repeat: no-repeat;
        background-position: center;
    }
`
export const LoginErrorMessage = styled.span`
    margin: 0.5rem 0 0.5rem 0;
    text-align: right;
    color: var(--login-err-message-color);
    font-weight: 700;
    font-family: 'IRANSANS';
    font-size: 19px;
`