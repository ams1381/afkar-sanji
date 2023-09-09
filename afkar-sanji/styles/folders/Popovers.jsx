import { styled } from "styled-components";

export const FolderPopoverContainer = styled.div`
    height: 118px;
    margin: 0 auto;
    padding: 16px;
    row-gap: 18px;
    border-radius: 2px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    font-family: 'IRANSANS';
`
export const FolderPopoverItem =  styled.div`
    // width: 105%;
    // margin: 0.5rem auto;
    display: flex;
    justify-content: space-between;
    padding: 4px 15px;
    border-radius: 2px;
    
    &:hover
    {
        background : var(--popover-hover-bg);
    }
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
    & button p 
    {
        white-space : nowrap;
    }
    & button i 
    {
        display : flex;
        margin-right : 2rem
    }
` 
export const SharePopoverContainer = styled.div`
    width: 236px;
    display: flex;
    justify-content: space-between;
    font-family: 'IRANSans';
    font-size: 13px;
    flex-direction: column;
    text-align: right;
    padding: 8px 10px;

    .share_icon_container
    {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }
    .share_icon_container .icon_container i 
    {
        width : 20px;
        height : 20px;
    }
    & p 
    {
        white-space : nowrap;
    }
`
export const SharePopoverButton = styled.div`
    width: 100%;
    background: var(--primary-color);
    border-radius: 2px;
    cursor: pointer;
    color: white;
    font-family: 'IRANSans';
    display : flex;
    justify-content : center;
    align-items : center;
    text-align : center;
    height : 24px;
    margin-top: 0.8rem;

    
`
export const RemovePopoverContainer = styled.div`
    display: flex;
    flex-direction: column;
    font: 14px IRANSans;
    align-items: center;

    & button 
    {
        width : 100% !important;
        margin-top : 0.8rem;
    }
`