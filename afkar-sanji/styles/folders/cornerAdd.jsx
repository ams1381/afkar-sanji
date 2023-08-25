import { styled } from "styled-components";

export const CornerAddButton = styled.button`
    background: var(--primary-color);
    outline: none;
    height: 54px;
    width: 54px;
    border-radius: 50%;
    padding: 4px 10px 4px 10px;
    cursor: pointer;
    border: 2px solid var(--primary-color);
    position: fixed;
    right: 6vw;
    bottom: 1rem;
    z-index: 1;
    transition : 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    transform : rotate(${p => p.clicked ? '45deg' : '0'});

    @media screen and (max-width : 768px)
    {
        right: 1rem;
    }
`
export const PopoverContainer = styled.div`
    display : flex;
    flex-direction : column;
    width : 100%;  
`
export const PopoverButtonHolder = styled.div`
    color: #000000D9;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    font-family: 'IRANSANS';
    align-items: center;
    margin: 0.4rem auto;
    text-align: right;
    cursor : pointer;

    & p 
    {
        margin-right : 0.6rem;
    }
`
export const PopOverButton = styled.button`
    border-radius: 50%;
    display: flex;
    background: var(--primary-color);
    border: none;
    padding: 0.5rem;
    width: 36px;
    height: 36px;
    justify-content: center;
    align-items: center;
    cursor : pointer;
`