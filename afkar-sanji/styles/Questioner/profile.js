import { styled } from "styled-components";

export const UserInfoBoxHeader = styled.div`
  display : flex;
  justify-content: space-between;
  margin-bottom: 12px;
  max-height: 110px;
  overflow: hidden;
  gap: 12px;
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
  .ant-upload-list-item-container
  {
    max-height: 112px !important;
    max-width: 112px !important;
    height : 100% !important;
    margin-block : 0 !important;
  }
  .ant-upload-list-item.ant-upload-list-item-success , .ant-upload-list-item.ant-upload-list-item-uploading , .ant-upload-list-item
  {
    border-radius: 2px !important;
  }
`
export const UserInfoContainer = styled.div`   
    width: 50%;
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
        overflow: hidden !important;
    }
      .ant-upload-list-item-container
      {
        margin-inline : 0 !important;
      }
  
    @media screen and (max-width: 768px) {
      width: 100%;
    }
`
export const InfoBox = styled.div`
    display: flex;
    width: 100%;
    box-shadow: ${p => p.bold ? 'none' : '0px -1px 0px 0px rgba(0, 0, 0, 0.15) inset'};
    font-size: 14px;
    align-items: center;
    min-height: 50px;
    background: ${p => p.loading ? 'none' : 'white'};
    color: var(--Neutral-Gray9);
    justify-content: space-between;
    flex-direction: row-reverse;
    padding: 10px;

    & input 
    {
        transition: 0.3s;
        border: none;
        text-align: left;
        direction: rtl;
        outline: none;
        color : ${p => p.error ? 'var(--Error-color)' : 'var(--Neutral-Gray9)'};
    }
  .last_update_container
  {
    display: flex;
    flex-direction: row-reverse;
    gap: 10px
  }
  .ant-btn
  {
    background-color: var(--primary-color);
  }
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`
export const EditInfoBox = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    gap: 26px;
  
  & input:disabled
  {
    background: none;
  }
    .edit_icons_container
    {
      display: flex;
      gap: 10px;
      align-items: center;
    }
     & i 
     {
        cursor : pointer;
     }
  .ant-select-selector
  {
    border : none !important;
    border-radius: 2px !important;
    background: none !important;
   
  }
  //editstate
  .ant-select-arrow i
  {
    transition: 0.3s;
    filter : ${p => !p.editstate ? 'invert(1%) sepia(0%) saturate(6%) hue-rotate(54deg) brightness(130%) contrast(100%)' : 'none' };
  }
`
export const UserBoldInfoContainer = styled.div`
    gap: 12px;
    width: 100%;
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
  background: ${p => p.loading ? 'none' : 'white'};
  color: var(--Neutral-Gray9);

  .ant-select {
    width: 100% !important;
    direction: rtl !important;
    text-align: right !important;
    margin-top: 10px !important;
  }

  .ant-select-selector {
    border-radius: 2px !important;
  }

  .ant-select-selection-search-input
  {
    font-family: IRANSans;
  }
  .selected_districts
    {
      margin-top: 14px;
      text-align: right;
      font-size: 14px;
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      gap: 5px;
      align-items: flex-end;
    }
  .selected_districts p {
    cursor: pointer;
    width: fit-content;
    border-radius: 2px;
    transition: 0.3s;
    padding: 0 7px 0 7px;
    
  }
  .selected_districts p:hover {
    background: var(--SideBar-header-border);
  }
  
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