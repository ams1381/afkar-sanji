import { styled } from "styled-components";
import {Button, Input, Tag, TreeSelect} from 'antd'
import {ResultTableContainer} from "@/styles/Result/ResultPage";

export const AdminPanelContainer = styled.div`
  height: 97%;
  width: 83.5%;
  margin: 0 auto;
  padding: 24px 0px;
`
export const AdminPanelHeader = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
`
export const AdminHeaderTitlerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 20px;
  flex-direction: row-reverse;
`
export const UsersListHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
`
export const UsersListTopPartContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: center;
`
export const UsersListBottomPartContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: center;
  
  .ant-select-selector
  {
    border-radius: 2px !important;
  }

`
export const UsersListFiltersContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  gap: 16px;
`
export const AdminHeaderButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
`
export const HeadersRefreshButton = styled(AdminHeaderButton)`
  & i
  {
    width: 14px;
    height: 14px;
  }
`
export const HeaderDeleteButton = styled(Button)`
  width: 32px;
  border-radius: 2px;
  border: 1px solid var(--neutral-5, #D9D9D9);
  background: var(--neutral-3, #F5F5F5);
  padding: 0;
  justify-content: center;
  display: flex;
  align-items: center;
  
  & i
  {
    width: 14px;
    height: 14px;
  }
`
export const HeaderResetFilters = styled.button`
  border-radius: 2px;
  border: 1px solid var(--neutral-5, #D9D9D9);
  background: var(--neutral-1, #FFF);
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
  display: flex;
  height: 32px;
  align-items: center;
  padding: 4px 15px;
  flex-direction: row-reverse;
  gap: 10px;
  color: var(--Neutral-Gray9);
  transition: 0.3s;
  cursor: pointer;
  &:hover
  {
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
  }
  &:hover i
  {
    filter: invert(37%) sepia(74%) saturate(1045%) hue-rotate(210deg) brightness(91%) contrast(105%);
  }
`
export const ResetFiltersContainer = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: row-reverse;
`
export const HeaderSearchInput = styled(Input)`
  border-radius: 0 2px 2px 0px;
  font-family: 'IRANSANS';
  width: 216px;
`
export const HeaderSearchContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`

export const FiltersDropdownContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-direction: row-reverse;
  
  .ant-select-selector
  {
    border-radius: 2px !important;
  }
`
export const FilterButton = styled.span`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  gap: 15px;
  cursor: pointer;

  font-size: 14px;

  & i
  {
    width: 12px;
    height: 12px;
    transform: ${p => p.open ? 'rotate(90deg)' : 'rotate(-90deg)'};
    transition: 0.3s;
  }
`
export const HeadersTreeSelect = styled(TreeSelect)`
    direction: rtl;
    width: 274px;
    border-radius: 2px;
   
`
export const FilterProjectSearchBox = styled.div`
    
`
export const UsersTableContainer = styled(ResultTableContainer)`
    .ant-table-thead .ant-table-cell , .ant-table-cell
    {
      border: none !important;
    }
  .tbody .ant-table-cell
  {
    border-bottom: 1px solid var(--conditional-divider, rgba(0, 0, 0, 0.06));
  }
  .ant-tag
  {
    border-radius: 2px !important;
    font-family: 'IRANSANS';
  }
  thead .ant-table-cell
  {
    color : black !important;
  }
  .ant-table-cell.ant-table-selection-column
  {
    border : none !important;
  }
  .ant-checkbox-inner
  {
    border-radius: 2px !important;
  }
`
export const UserTag = styled(Tag)`
  border-radius: 2px!important;
  font-family: 'IRANSANS';
  display: inline-flex;
  gap: 5px;
  align-items: center;
  direction: ltr;
  color: ${p => p.pending ? '#A3A3A3' : p.rejected ? '#F5222D' : 'var(--primary-color)'};
`
export const TableBlockButton = styled(Button)`
  color: var(--Error-color);
  cursor: pointer;
  border: none;
  background: none;
  box-shadow: none;
  direction: ltr;
`