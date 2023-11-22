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
  color: ${p => (p.pending && p.questionnaireTag) ? '#A3A3A3' : p.rejected ? '#F5222D' : p.pending ? '#FAAD14' : 'var(--primary-color)'};
`
export const TableBlockButton = styled(Button)`
  color: var(--Error-color);
  cursor: pointer;
  border: none;
  background: none;
  box-shadow: none;
  direction: ltr;
`
export const LevelAssignmentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  text-align: center;
  height: 100%;
  gap: 40px;
  

`
export const SwipersController = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
  width: 150px;
  //.next-question , .prev-question
  //{
  //  width: 100%;
  //  display: flex;
  //  justify-content: center;
  //  align-items: center;
  //}
  //& i
  //{
  //  width: 12px;
  //  height: 12px;
  //}
  //.prev-question i {
  //  transform: rotate(-90deg);
  //}
  //.next-question i
  //{
  //  transform: rotate(90deg);
  //}
  //rotate(-90deg)
  
`
export const NextSlideButton = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & i
  {
    width: 12px;
    height: 12px;
    transform: rotate(90deg);
  }
`
export const PrevSlideButton = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & i
  {
    width: 12px;
    height: 12px;
    transform: rotate(-90deg);
  }
`
export const QuestionsSliderContainer = styled.div`
  height: 80vh;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  justify-content: ${p => p.loading ? 'center' : 'flex-end'};
  flex-direction: ${p => p.loading ? 'column' : 'row'};
  .swiper
  {
    width: 70%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    //height : auto !important;
  }
  .swiper-slide-active {
    opacity: 1;
  }
  .swiper-slide-next , .swiper-slide-prev
  {
    opacity: 0.5;
  }
  .question_component
  {
    user-select: none;
  }
  .swiper-slide-next .question_component , .swiper-slide-prev  .question_component {
    background: none;
    box-shadow: none;
  }
`
export const ProgressBarThumb = styled.span`
  width: 6px;
  position: absolute;
  top: 0;
  left: 0;
  background: var(--primary-color);
  height: ${p => p.height ? `${p.height}%` : 0};
  border-radius: 100px;
  transition: 0.3s;
`
export const ProgressBar = styled.div`
  border-radius: 100px;
  background: var(--Surface, #FEFEFE);
  width: 6px;
  height: 100%;
  position: relative;
`
export const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const LevelButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 150px;
`
export const LevelButton = styled(Button)`
    width: 100%;
    border : ${p => p.active ? '1px solid var(--primary-color)' : '1px solid #d9d9d9'};
    color  : ${p => p.active ? 'var(--primary-color)' : 'black'};
`