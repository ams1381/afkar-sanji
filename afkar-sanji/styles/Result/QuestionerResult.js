import styled from 'styled-components'
import {UserAvatarLogout} from "@/styles/common";

export const QuestionerResultHeader = styled.div`
  display: flex;
  width: 86%;
  margin: 0 auto;
  padding: 16px 8px;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: center;
  
  @media screen and (max-width: 480px) {
    flex-wrap: wrap;
    width: 90%;
  }
`
export const QuestionerResultBodyContainer = styled.div`
    width: 86%;
    margin: 0 auto;
  
    @media screen and (max-width: 480px) {
      width: 90%;
    }
`
export const QuestionerResultChangerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-direction: row-reverse;
  @media screen and (max-width: 480px) {
    flex-wrap: wrap;
  }
  .ant-btn
  {
    background: var(--primary-color);
  }
  & .ant-select
  {
    direction: rtl;
  }
  .ant-select-selection-placeholder
  {
    color: var(--Neutral-Gray9) !important;
  }
`
export const RowSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  @media screen and (max-width: 480px) {
    width: 100%;
    justify-content: space-between;
    margin-top: 10px;
  }
  &  > label
  {
    display: flex;
    gap: 12px;
    font-size: 14px;
  }
  & .ant-checkbox-inner
  {
    border-radius: 2px !important;
  }
`
export const QuestionTypeSelector = styled.div`
  & span
  {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: var(--Neutral-Gray9);
    cursor : pointer;
  }
  & span i
  {
    width: 11px;
    height: 11px;
    transition: 0.3s;
    transform: ${p => p.open ? 'rotate(-90deg)' : 'none'};
  }
`
export const QuestionTypeFilterContainer = styled.div`
    padding : 4px 0;
    gap: 4px;
    display: flex;
    flex-direction: column;
    width: 160px;
  
    .filter_type_item
    {
      display: flex;
      gap: 8px;
      color: var(--Neutral-Gray9);
      padding: 5px 12px;
      height: 34px;
      align-items: center;
      justify-content: flex-end;
      cursor: pointer;
    }
    .filter_type_item.all
    {
      padding: 8px 8px 8px 3px;
      border-top: 1px solid var(--conditional-divider, rgba(0, 0, 0, 0.06));
    }
      & .filter_type_item .ant-checkbox-inner
      {
        border-radius: 2px !important;
      }
`
export const ModalHeader = styled.div`
  color: var(--Neutral-Gray9);
  font-weight: 700;
  font-size: 20px;
  display: flex;
  padding: 0 24px;
  justify-content: space-between;
  height: 64px;
  align-items: center;
  box-shadow: 0px -1px 0px 0px #F0F0F0 inset;
  
  .modal_header_box {
    display: flex;
    align-items: center;
    gap: 12px
  }
  & .close_modal {
    width: 11px;
    cursor: pointer;
    filter: invert(0%) sepia(2%) saturate(7499%) hue-rotate(210deg) brightness(8%) contrast(97%);
  }
`
export const ModalBody = styled.div`
  overflow: auto;
  max-width: 500px;
  max-height: 500px;
  gap: 24px;
  display: flex;
  flex-direction: column;
  
  &::-webkit-scrollbar
  {
    width : 0;
  }
`
export const ModalEditButton = styled(UserAvatarLogout)`
      width: auto;
      gap: 10px;
      display: flex;
      color: var(--Neutral-Gray9);
      align-items: center;
  
      &:hover 
      {
        color: var(--primary-color);
      }
      &:hover i
      {
        filter: invert(37%) sepia(74%) saturate(1045%) hue-rotate(210deg) brightness(91%) contrast(105%);
      }
`

export const ModalFooter = styled.div`
  height: 64px;
  display: flex;
  box-shadow: 0px 1px 0px 0px #F0F0F0 inset;
  align-items: center;
  padding: 0 24px;
  cursor: grab;
`
export const ModalSubComponentContainer = styled.div`
    display: flex;
    gap : 6px;
    margin-top: 8px;
    font-size: 14px;
  .sort_item
  {
    display: flex;
    font-size: 12px;
    gap: 10px;
  }
  .sort_item span
  {
    color : var(--primary-color);
  }
`
export const NoAnswerBoxContainer = styled.div`
  padding: 10px 12px;
  margin-top: 8px;
  font-size: 12px;
  color: var(--Error-color);
  border: 1px solid var(--Error-color);
`
