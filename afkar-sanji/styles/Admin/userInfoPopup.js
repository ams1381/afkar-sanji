import { styled } from 'styled-components'
import {ChatHeaderContainer , ChatContainer} from "@/styles/common";
import {Button} from "antd";

export const PopupContainer = styled(ChatContainer)`
    height : auto;
    width: 37.7%;
    z-index: 100000;
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
    color : black;
    font-size: 14px;
  }
`
export const PopupInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 24px 0;
`