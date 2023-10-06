import { Button, Input } from "antd";
import { styled } from "styled-components";

//Header
export const HeaderContainer = styled.div`
    background: var(--surface);
    height: 57px;
    display: flex;
    align-items: center;
`
export const HeaderComponent = styled.div`
    display: flex;
    justify-content: space-between;
    width: 84%;
    align-items : center;
    margin: 0 auto;
    
    & a 
    {
        text-decoration : none;
        height : 34px;
    }
    @media screen and (max-width : 768px)
    {
        width : 96%;
    }
`
export const SideBarToggleButton = styled.button`
    background: var(--primary-color);
    outline: none;
    padding: 4px 10px 4px 10px;
    border-radius: 2px;
    cursor: pointer;
    border: 2px solid var(--primary-color);
    color: white;
    display: flex;
    align-items: center;
    box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.06);
    gap: 6px;
    font-family: IRANSans;
    transition : 0.3s;

    // & p 
    // {
    //     margin-right: 0.5rem;
    // }

    &:hover 
    {
        background : #848CFA;
        border : none;
        border: 2px solid #848CFA;
    }
`
export const HeaderFolderButton = styled(SideBarToggleButton)`
    padding : 0;
    gap : 8px;
    padding: 4px 15px;
    border: 1px solid var(--Key-Primary, #5360ED);
    height: 34px;
    justify-content: center;
    box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.06);

    &:hover 
    {
        background : #848CFA;
        border : none;
        border: 1px solid #848CFA;
    }
`
export const UserAvatarLogout = styled.button`
    outline: none;
    height: 41px;
    background: none;
    width: 41px;
    padding: 4px 10px 4px 10px;
    border-radius: 2px;
    cursor: pointer;
    border: 1px solid #D9D9D9;
    transition : 0.3s;
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);

    &:hover 
    {
        border : 1px solid var(--primary-color);
    }
`
export const LogoutPopOverInfo = styled.div`
    width : 95%;
    margin : 0.4rem auto;
    display : flex;
    justify-content : space-between;
    color : var(--Neutral-Gray9);
    font-family: 'IRANSans';
`
export const LogoutPopOverLayout = styled.div`
    width: 235px;
    display: flex;
    flex-direction: column;
    padding: 16px;

    button 
    {
        border-radius : 2px;
    }
`

//Side Bar 
export const SideBarContainer = styled.div`
    position: fixed;
    left: ${p => p.open ? '0' : '-600%'};
    top: 0;
    height: 100%;
    width: calc(15rem + 15vw);
    background: white;
    box-shadow: 2px 0 10px #00000040;
    font-family: IRANSans;
    transition: 0.3s;
    z-index: 3;
`
export const SideBarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 95%;
    margin: 0.5rem auto;
    align-items: center;    
`
export const SideBarFolderItem = styled.div`
    display: flex;
    justify-content: space-between;
    width: 95%;
    margin: 0.4rem auto;
    color: ${p => p.selected ? 'var(--primary-color)' : '#7A7A7A'};
    border: 1px solid ${p => p.selected ? 'var(--primary-color)' : 'var(--login-input-default-border)'};
    padding: 0.5rem;
    border-radius: 2px;
    cursor: pointer;
    font-size : 14px;
    transition : 0.3s;
    word-break: break-word;
    text-align: right;

    & .folder_name
    {
        width : 80%;
    }
`
export const SideBarInputBox = styled.div`
    display: flex;
    flex-direction: column;
    text-align: right;
    color: var(--Neutral-Gray9);
    width: 95%;
    margin: 0.8rem auto;

    & p 
    {
        font-size: 13px;
    }
`
export const SideBarInput = styled(Input)`
    width: 100%;
    margin: 0.6rem auto;
    padding: 0.5rem;
    outline: none;
    border: 2px solid var(--login-input-default-border);
    transition : 0.3s;
    border-radius : 2px;
    font-family: 'IRANSans';
    height: 40px;
    text-align: right;
    direction: rtl;

    &:focus
    {
        border : 2px solid var(--primary-color)
    }
`
export const SideBarCancelButton = styled.button`
    width: 33px;
    height: 33px;
    border-radius: 50%;
    border: 2px solid var(--Error-color);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.4rem;
    cursor : pointer;
    background: none;
    & i 
    {
        display : flex;
    }
`
export const AddFolderButtons = styled.div`
    text-align: left;
    display: flex;
    width: 100%;
    margin: 0 auto;
`
export const SideBarConfirmButton = styled(Button)`
    background: var(--primary-color);
    padding: 0.5rem;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none;
`
export const SideBarTitle = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 0.7rem 0 0.7rem 0;
     
    & p
    {
        font-weight : 700;
    }
    & button 
    {
        background: none;
        border: none;
        margin-left: 0.7rem;
        cursor : pointer;
    }
`
// screen mask
export const ScreenMask = styled.div`
    position : fixed;
    left : 0;
    top : 0;
    width : 100%;
    height : 100%;
    opacity: ${p => p.shown ? '0.6' : '0'};
    background : var(--Neutral-Gray10);
    transition : 0.4s;
    cursor : pointer;
    z-index : ${p => p.shown ? '2' : '-1'}
`
export const PageBox = styled.div`
    display: flex;
    justify-content: flex-start;
`
export const CommonDrawerContainer = styled.div`
    height: 1000px;
    background: white;
    position: fixed;
    right: 0;
    z-index: 555;
    width: ${p => p.open ? '20%' : '62px'};
    transition : 0.3s;

    .drawerLogo
    {
        height: 58px;
        display: flex;
        font-size: 12px;
        color: var(--primary-color);
        justify-content: space-around;
        align-items: center;
        cursor: pointer;
        background: var(--Primary-surface, #EEF0FF);
    }
    .drawerLogo i 
    {
        width : 38px;
        height : 38px;
    }
    .drawer_item {
        display: flex;
        padding: 12px 24px;
        background: var(--hit-box, rgba(255, 255, 255, 0.00));
        height: 38px;
        cursor: pointer;
        align-items: center;
        justify-content: flex-end;
        color: var(--Neutral-Gray9);
        font-size: 14px;
        gap: 10px;
        transition : 0.3s;
    }
    .drawer_item:hover
    {
        color: var(--primary-color);
        
    }
    .drawer_item:hover i 
    {
        filter: invert(37%) sepia(74%) saturate(1045%) hue-rotate(210deg) brightness(91%) contrast(105%);
    }
    .drawer_item i
    {
        width : 14px;
        height : 14px;
    }
    .drawer_item p , .drawerLogo p
    {
        display : ${p => p.open ? 'block' : 'none'};
    }
    .drawerLogo button 
    {
        width: 24px;
        height: 24px;
        background: white;
        border-radius: 50%;
        box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.06);
        border: 1px solid var(--neutral-5, #D9D9D9);
        align-items: center;
        justify-content: center;
        cursor : pointer;
        display : ${p => p.open ? 'flex' : 'none'};
    }
    .drawerLogo button i 
    {
        width : 10px;
        transform: rotate(-90deg);
    }
`
export const QuestionerPageContainer = styled.div`
    width : 100%;
    height : 87vh;
`
export const QuestionerContentBox = styled.div`
    width: 86%;
    height: 100%;
    display: flex;
    padding: 16px 0px;
    gap: 16px;
    margin: 0 auto;
    flex-direction: row-reverse;
`