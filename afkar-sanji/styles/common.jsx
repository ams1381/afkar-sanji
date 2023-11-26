import { Button, Input } from "antd";
import { styled } from "styled-components";

//Header

export const UserIconContainer = styled.div`
  position: absolute;
  width: 56px;
  height: 40px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const HeaderContainer = styled.div`
    background: var(--surface);
    height: 57px;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 556;
    box-shadow: 0px -1px 0px 0px #F0F0F0 inset;
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
    border-radius: 50% !important;
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
    //display: flex;
    //justify-content: flex-start;
`
export const CommonDrawerContainer = styled.div`
    height: 1000px;
    background: white;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 555;
    width: ${p => p.open ? '20%' : '56px'};
    transition : 0.3s;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);
  & a
  {
    text-decoration: none;
    outline: none;
  }
    .drawerLogo
    {
        height: 10%;
        display: flex;
        font-size: 12px;
        color: var(--primary-color);
        justify-content: ${p => p.open ? 'space-around' : 'center'};
        align-items: center;
        cursor: pointer;
        background: var(--Primary-surface, #EEF0FF);
        border-top: 1px solid var(--primary-color);
    }
    .drawerLogo i 
    {
        width : 38px;
        height : 38px;
    }
    // .drawer_item {
    //     display: flex;
    //     padding: ${p => p.open ? '12px' : 'none'};
    //     //background: var(--hit-box, rgba(255, 255, 255, 0.00));
    //     cursor: pointer;
    //     align-items: center;
    //     //justify-content: ${p => p.open ? 'flex-end' : 'center'};
    //     justify-content: center;
    //     color: var(--Neutral-Gray9);
    //     font-size: 14px;
    //     gap: 10px;
    //     height: 40px;
    //
    //     transition : 0.3s;
    // }
    //.drawer_item_text
    //{
    //  display: flex;
    //  padding: 0 12px 0 var(--Tittle-Padding, 24px);
    //  align-items: center;
    //  gap: 10px;
    //  color: var(--On-Surface, #525252);
    //  font-family: IRANSans;
    //  font-size: 14px;
    //  font-style: normal;
    //  font-weight: 400;
    //  justify-content: flex-end;
    //  height: 40px;
    //  transition: 0.3s;
    //  cursor: pointer;
    //}
  //.dashboard:hover ~ .drawer-column .dashboard
  //{
  //  background-color: red;
  //}
  //.dashboard:hover , .employer:hover , .interviewer:hover , .wallet:hover , .create-questionaire:hover , .profile:hover
  //{
  //  color: var(--primary-color);
  //  //filter: invert(37%) sepia(74%) saturate(1045%) hue-rotate(210deg) brightness(91%) contrast(105%);
  //}
  //.dashboard:hover .i_dashboard i
  //{
  //  filter: invert(37%) sepia(74%) saturate(1045%) hue-rotate(210deg) brightness(91%) contrast(105%);
  //}
  //  .drawer_item:hover
  //  {
  //      color: var(--primary-color);
  //  }
  //  .drawer_item:hover i 
  //  {
  //      filter: invert(37%) sepia(74%) saturate(1045%) hue-rotate(210deg) brightness(91%) contrast(105%);
  //  }
    .drawer_item i
    {
        width : 17px;
        height :17px;
    }
    .drawer_item p , .drawerLogo p
    {
        //display : ${p => p.open ? 'block' : 'none'};
        width: ${p => p.open ? 'auto' : '0%'};
        overflow: hidden;
        white-space: nowrap;
        transition: width 0.9s;
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
  .drawer-inner-container
  {
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
  }
  .drawer-logo-inner-container
  {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0px 12px 0px var(--Tittle-Padding, 24px);
    align-items: center;
  }
  .drawer-logo-container
  {
    display: flex;
    width: 100%;
    align-items: center;
    transition: 0.3s;
  }
  .trapezoid {
    position: absolute;
    top: 50%;
    transform: translate(0 , -50%);
    left: -20px;
    //z-index: -1111;
    background: url(/Images/Rectangle.png);
    height: 66px;
    width: 23px;
    filter: drop-shadow(-2px 0px 1px rgba(0, 0, 0, 0.089));
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .trapezoid i
  {
    transition: 0.8s;
    width: 12px;
    height: 12px;
    transform: ${p => p.open ? 'rotate(180deg)' : 'none'};
  }
`
export const CommonDrawerItemText = styled.div`
  display: flex;
  padding: 0 12px 0 var(--Tittle-Padding, 24px);
  align-items: center;
  gap: 10px;
  color: ${p => p.logout ? 'var(--Error-color)' : 'var(--On-Surface, #525252)' };
  font-family: IRANSans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  justify-content: flex-end;
  height: 40px;
  transition: 0.3s;
  cursor: pointer;
  user-select: none;
  background-color: ${p => p.active ? 'var(--drawer-active-item-bg)' : 'white'};
  border-left: ${p => p.active ? '1px solid var(--primary-color)' : 'none'};
  cursor: pointer;
  
  &:hover
  {
    background: ${p => p.active ? 'var(--drawer-active-item-bg)' : 'white'};
    color : ${p => p.logout ? '#ff1919' : 'var(--primary-color)'};
  }
`
export const CommonDrawerItemIcon = styled.div`
  display: flex;
  padding: ${p => p.open ? '12px' : 'none'};
  background: ${p => p.active ? 'var(--drawer-active-item-bg)' : 'white'};
  cursor: pointer;
  align-items: center;
    //justify-content: ${p => p.open ? 'flex-end' : 'center'};
  justify-content: center;
  color: var(--Neutral-Gray9);
  font-size: 14px;
  gap: 10px;
  height: 40px;
  border-left: ${p => (!p.open && p.active) ? '1px solid var(--primary-color)' : 'none'};
  transition : 0.3s;
  
  & i {
    position: relative;
  }
   & p
   {
     width: ${p => p.open ? 'auto' : '0%'};
     overflow: hidden;
     white-space: nowrap;
     transition: width 0.9s;
   }
  &:hover i
  {
    filter: ${p => p.logout ? 
        'invert(28%) sepia(75%) saturate(4490%) hue-rotate(347deg) brightness(95%) contrast(118%)' : 
        'invert(37%) sepia(74%) saturate(1045%) hue-rotate(210deg) brightness(91%) contrast(105%)'};
  }
`
export  const CommonDrawerTopPartContainer = styled.div`
  height: 100%;
  display: flex;
  width: 100%;
  position: relative;
  justify-content: space-between;
  align-items: flex-end;
  a:hover
  {
    background: none;
  }
  .drawer-column
  {
    transition: 0.3s;
    height: 91.5%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }

  
`
export const CommonDrawerLogoImageContainer = styled.div`
     width: ${p => p.draweropen ? '25%' : '100%'};
    display: flex;
    justify-content: center;
    align-items: center;
`
export const QuestionerPageContainer = styled.div`
    width : 100%;
    height : 87vh;
`
export const QuestionerContentBox = styled.div`
    width: 84%;
    //height: 100%;
    display: flex;
    padding: 16px 0px;
    gap: 16px;
    margin: 0 auto;
    flex-direction: row-reverse;
  
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    margin: 0;
    padding: 16px 0 0 15px;
  }
`
export const LogoutPopoverItem = styled.div`
  display: flex;
  padding: 5px 12px;
  height: 34px;
  gap: 8px;
  justify-content: flex-end;
  align-items: center;
  color: var(--Error-color);
  cursor: pointer;

  & a
  {
    color: var(--Neutral-Gray9);
  }
`
export const HeaderAvatarButton = styled(UserAvatarLogout)`
  display: flex;
  padding: 4px;
  gap: 24px;
  align-items: center;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  width: auto;
  transition: 0.3s background;
  &:hover
  {
    background: linear-gradient(0deg, rgba(83, 96, 237, 0.20) 0%, rgba(83, 96, 237, 0.20) 100%), var(--Surface, #FEFEFE);
  }
  & img
  {
    max-width: 30px;
    max-height: 30px;
  }
  .user_icon
  {
    filter: invert(45%) sepia(70%) saturate(5831%) hue-rotate(226deg) brightness(97%) contrast(91%);
  }
`
export const ChatMask = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background: #00000057;
  z-index: 3333;
`
export const ChatContainer = styled.div`
  z-index: 99999;
  position: absolute;
  left: 50%;
  background: var(--surface);
  top: 50%;
  transform: translate(-50%, -50%);
  width: 45%;
  display: flex;
  height: 494px;
  box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
  flex-direction: column;
`
export const ChatHeaderContainer = styled.div`
  display: flex;
  padding: var(--Gap-col, 16px) var(--Tittle-Padding, 24px);
  justify-content: space-between;
  align-items: center;
`
export const ChatHeaderTitle = styled.div`
  display: flex;
  font-size: 14px;
  gap: 4px;

  p.admin-name {
    font-weight: 700;
  }
  p.project-name {
    color: var(--character-secondary-45, rgba(0, 0, 0, 0.45));
  }
`
export const ChatPromptContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 10px var(--Gap-col, 16px);
  align-items: center;
  gap: 8px;
  align-self: stretch;
  box-shadow: 0 1px 0 0 #F0F0F0 inset;

  .ant-btn
  {
    background-color: var(--primary-color);
  }
  input {
    font-family: 'IRANSANS';
    border-radius: 2px;
    text-align: right;
    height: 100%;
  }
`
export const ChatMessageContainer = styled.div`
    flex: 1;
    padding: 24px;
  
  &::-webkit-scrollbar
  {
    width: 0;
  }
  .ant-input-number-input
  {
    font-family: IRANSans !important;
  }
  .VListContainer
  { 
    scroll-behavior: smooth;
  }
  .VListContainer::-webkit-scrollbar
  {
    width: 0;
  }
`
export const SentMessageContainer = styled.div`
  font-size: 14px;
  text-align: right;
  display: flex;
  //max-width: 400px;
  padding: 0px 10px;
  justify-content: flex-end;
  gap: 10px;
  border-radius: var(--radius-XS, 2px);
  flex-direction: column;
  align-items: flex-end;

  max-width: 50%;
  word-break: break-word;
`
export const AskForAdminSign = styled.span`
  width: 6px;
  display: block;
  height: 6px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background: var(--primary-color);
  border-radius: 50%;
`
export const AskForAdminText = styled.span`
  border-radius: var(--radius-XS, 2px) var(--radius-XS, 2px) var(--radius-XS, 2px) 0px;
  background: var(--Key-Primary, #5360ED);
  position: absolute;
  left: 0;
  padding: 0px 8px;
  font-size: 14px;
  color: var(--On-Primary, #EEF0FF);
`
export const SentMessageTextContainer = styled.div`
  background: #EEEEEE;
  padding: 6px;
  display: flex;
  gap: 10px;
`
export const MessageMenuToggle = styled.span`
  padding-top: 5px;
  height: 30px;
  border-radius: 2px;
  cursor: pointer;
  transition: 0.3s;
  
  &:hover
  {
    background-color: #01010117;
  }
`
export const RecievedMessageTextContainer = styled.div`
  border: 1px solid var(--Outline, #D9D9D9);
  padding: 6px;
`

export const RecommandedContainer = styled.div`
    display: flex;
    padding: 0 24px 24px 24px;
    gap: 8px;
    justify-content: flex-end;
  
`
export const RecommandedMessage = styled(Button)`
  border-radius: 2px;
  border: 1px solid var(--Outline, #D9D9D9);
  background: var(--Surface, #FEFEFE);
  display: flex;
  padding: 1px 8px;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  transition: 0.3s;
  cursor: pointer;
  
  &:hover
  {
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
  }
`