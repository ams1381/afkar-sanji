import { styled } from "styled-components";

export const UserInfoBoxHeader = styled.div`
  display : flex;
  justify-content: space-between;
  margin-bottom: 12px;
  .ant-upload-list
  {
    height: 100%;
  }
  .ant-upload-list-item-undefined
  {
    transition : 0.3s !important;
    border-radius : 2px !important;
    border-color : ${p => p.uploaderror ? '#ff4d4f' : '#d9d9d9'} !important;
    color : ${p => p.uploaderror ? '#ff4d4f' : 'black'} !important;
  }
  .ant-upload.ant-upload-select
  {
    display : ${p => p.fileuploaded ? 'none' : 'block'}
  }
`
export const UserInfoContainer = styled.div`   
    width: 45%;
    text-align: right;
  
    .ant-upload-wrapper.avatar-uploader
    {  
        width : auto !important;
    }
    .ant-upload.ant-upload-select
    {
        border-radius : 2px !important;
        margin-bottom : 0 !important;
        margin-inline-end : 0 !important;
        height : 100% !important;
    }
`
export const InfoBox = styled.div`
    display: flex;
    width: 100%;
    box-shadow: ${p => p.bold ? 'none' : '0px -1px 0px 0px rgba(0, 0, 0, 0.15) inset'};
    font-size: 14px;
    align-items: center;
    height: 50px;
    background: white;
    color: var(--Neutral-Gray9);
    justify-content: space-between;
    flex-direction: row-reverse;
    padding: 10px;

    & input 
    {
        border: none;
        text-align: left;
        outline: none;
    }
  .last_update_container
  {
    display: flex;
    flex-direction: row-reverse;
    gap: 10px
  }
`
export const EditInfoBox = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    gap: 8px;
     & i 
     {
        cursor : pointer;
     }
`
export const UserBoldInfoContainer = styled.div`
    gap: 10px;
    width: 80%;
    display: flex;
    flex-direction: column;
`
export const EditButton = styled.button`
    padding: 4px 15px;
    border-radius: 2px;
    border: 1px solid var(--Outline, #D9D9D9);
    background: var(--Surface, #FEFEFE);
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
    cursor : pointer;
    transition : 0.3s;

    &:hover 
    {
        border : 1px solid var(--primary-color);
        color : var(--primary-color);
    }
`
export const LocationSelectorContainer = styled.div`
    text-align: center;
    margin-top: 12px;
    font-size: 14px;
    padding: 10px;
    background: white;
    color: var(--Neutral-Gray9);

    .ant-select
    {
        width: 100% !important;
        direction: rtl !important;
        text-align: right !important;
        margin-top: 10px !important;
    }
    .ant-select-selector
    {
        border-radius : 2px !important;
    }
`
export const ConfirmButtonContainer = styled.div`
    text-align: left;
    margin-top : 10px;

    .ant-btn
    {
        border-radius : 2px;
        background : var(--primary-color);
    }
`