import { styled } from 'styled-components'
import {ChatHeaderContainer , ChatContainer} from "@/styles/common";
import {Button} from "antd";
export const ModalMainContainer = styled.div`
    direction: ltr;
    width: fit-content;
    margin: 0 auto;
`
export const PopupContainer = styled(ChatContainer)`
    height : auto;
    width: 576px;
    z-index: 100000;
  
  @media screen and (max-width: 600px) {
    width: 400px;
  }
`
export const PopupHeader = styled(ChatHeaderContainer)`
    box-shadow: 0px -1px 0px 0px #F0F0F0 inset;
`
export const PopupFooter = styled.div`
  box-shadow: 0px 1px 0px 0px #F0F0F0 inset;
  width: 100%;
  padding: 10px var(--Gap-m, 16px);
  gap: 8px;
  display: flex;
  align-items: center;
`
export const PopupTopButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`
export const PopupFooterButton = styled(Button)`
    display: flex;
    gap: 15px;
    align-items: center;
  
  & i
  {
    width: 12px;
    height: 12px;
    transition: 0.3s;
    filter: ${p => p.disabled ? 'invert(97%) sepia(0%) saturate(14%) hue-rotate(182deg) brightness(91%) contrast(93%)' : 'none'};
  }
  &:hover i
  {
    filter: invert(37%) sepia(74%) saturate(1045%) hue-rotate(210deg) brightness(91%) contrast(105%);
  }
`
export const PopupRowContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    padding: var(--radius-none, 0px) 10px;
    align-items: center;
    height: 30px;
    color: var(--Neutral-Gray6);
  
  span
  {
    color : #525252;
    font-size: 14px;
  }
  a {
    color: var(--primary-color);
    text-decoration: none;
    font-size: 14px;
    display: flex;
    gap: 10px;
    align-items: center;
    flex-direction: row-reverse;
  }
`
export const PopupInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 24px 0;
`
export const LevelInfoContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;
  align-items: center;
`
export const PricePack = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 3px;
`
export const PricePackContainer = styled.div`
  width: 145px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 6px;
  background: var(--Primary-surface, #EEF0FF);
  color: var(--primary-color);
  height: 124px;
  cursor: pointer;
  transition: 0.3s;
  margin: 10px 0;
  border : ${p => p.selected ? '1px solid var(--primary-color)' : 'none'};
  
  &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.44);
  }
`
export const PricePacksItemsContainer = styled.div`
  display: flex;
  max-width: 100%;
  gap: 12px;
  overflow: auto;
  width: fit-content;
  direction: rtl;
  
  .price-per-each {
    font-size: 12px;
    text-align: right;
  }
  &::-webkit-scrollbar
  {
    width : 10px;
    overflow: visible;
    height : 10px;
  }
  &::-webkit-scrollbar-track
  {
    background : transparent;
  }
  &::-webkit-scrollbar-corner
  {
    display : none;
  }
  &::-webkit-scrollbar-thumb
  {
    background: #D3CFCF;
    border-radius: 31px;
  }
`
export const PricePackHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: space-between;
  text-align: right;
  height: 50px;
  gap: 11px;
  
  p
  {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
   i{
     width: 14px;
     height: 14px;
     cursor: pointer;
   }
  
`
export const PricePackEditButtonsContainer = styled.div`
  width: 24px;
  height: 124px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
`
export const PricePackButton = styled.span`
  width: 100%;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.06);
  height: 24px;
  cursor: pointer;
  
  & i {
    width: 14px;
    height: 14px;
  }
}
`
export const PricePaakEditButton = styled(PricePackButton)`
  border: 1px solid #5360ED;
  background: #5360ED;
`
export const PricePackDeleteButton = styled(PricePackButton)`
  background: var(--character-danger, #FF4D4F);
`