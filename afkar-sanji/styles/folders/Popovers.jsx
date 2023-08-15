import { styled } from "styled-components";

export const FolderPopoverContainer = styled.div`
    height: 100px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    font-family: 'IRANSANS';
    padding: 0 1rem 0 1rem;
`
export const FolderPopoverItem =  styled.div`
    width: 105%;
    margin: 0.5rem auto;
    display: flex;
    justify-content: space-between;
    
    & button
    {
        background: none;
        border: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: 'IRANSANS';
        width: 100%;
        cursor: pointer;
        color : ${p => p.deleteitem ? 'red' : ''};
    }
    & button i 
    {
        display : flex;
        margin-right : 2rem
    }
` 
export const SharePopoverContainer = styled.div`
    width: 200px;
    display: flex;
    justify-content: space-between;
    font-family: 'IRANSans';
    font-size: 13px;
`
export const SharePopoverButton = styled.div`
    width: 100%;
    background: var(--primary-color);
    border-radius: 2px;
    cursor: pointer;
    color: white;
    font-family: 'IRANSans';
    TEXT-ALIGN: CENTER;
    margin-top: 0.8rem;
`