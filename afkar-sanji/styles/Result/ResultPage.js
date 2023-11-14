import { Button } from "antd";
import { styled } from "styled-components";

export const ResultBodyContainer = styled.div`
    margin-top : 10px;
   display: ${p => p.error ? 'flex' : 'block'};
   align-items: center;
   justify-content: center;
  
  
    .date_filter
    {
        width: 45%;
        display : flex;
        gap : 15px;
    }
    .rmdp-panel-body li .b-deselect
    {
        margin-right : 10px !important;
    }
    .date_filter .rmdp-arrow-container
    {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .date_filter .rmdp-arrow-container  i 
    {
        height: 3px !important;
        margin-top: 0 !important;
        padding: 3px !important;
        width: 3px !important;
    }
  

    .date_filter a 
    {
        text-decoration : none;
    }
    .rmdp-container 
    {
        width : 60%;
    }
    .date_filter .ant-picker.ant-picker-range
    {
        direction : rtl;
        border-radius : 2px;
        width : 100%;
        height: 34px;
    }
    .ant-table-container
    {
        max-height: 510px !important;
        overflow: hidden;
    }
    .ant-picker-active-bar
    {
        display : none;
    }
    .ant-table-body::-webkit-scrollbar
    {
        width : 10px;
        overflow: visible;
        height : 10px;
    }
    .ant-table-body::-webkit-scrollbar-track
    {
        background : transparent;
    }
    .ant-table-body::-webkit-scrollbar-corner
    {
        display : none;
    }
    .ant-table-body::-webkit-scrollbar-thumb
    {
        background: #D3CFCF;
        border-radius: 31px;
    }
    .ant-table-container , .ant-table-header , .ant-table-cell.ant-table-selection-column
    {
        border-radius : 0 !important;
    }
    @media screen and (max-width : 768px)
    {
        .date_filter
        {
            width: 100%;
            justify-content: space-between;
        }
        .rmdp-container 
        {
            width : 100%;
        }
    }
`
export const ResultTableContainer = styled.div`
  
    & .ant-table
    {
        background : ${p => p.loading ? '#EFE9E9' : 'none'};
    }
    .ant-table-wrapper
    {
      margin-top : 10px;
    }
      .react-draggable
      {
        position: absolute;
        background: white;
        width: 336px;
        //height: 640px;
        z-index: 3333;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 9px 28px 8px, rgba(0, 0, 0, 0.08) 0px 6px 16px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px -4px;
      }
  .react-draggable::-webkit-scrollbar
  {
    width: 0;
  }
    table 
    {
        // table-layout: auto !important;
        // min-width : 5000px !important;
    }
    .rmdp-panel-body li .b-deselect
    {
        margin-left : 10px !important;
    }
    & .ant-table-cell
    {
        font-weight: 500 !important;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        // min-width : 217px;
        color: var(--Neutral-Gray9) !important;
    }
    .ant-pagination-item , .ant-pagination-next , .ant-pagination-prev
    {
        border-radius: 2px !important;
        border: 1px solid var(--Outline, #D9D9D9) !important;
        background: var(--Surface, #FEFEFE) !important;
        padding: 1px 7px !important;
        width: 32px;
        height: 32px !important;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.3s;
    }
    .ant-pagination-item:hover
    {
      border : 1px solid var(--primary-color) !important;
    }
    .ant-pagination 
    {
        gap : 8px !important;
        justify-content : center !important;
        align-items: center !important; 
    }
    .ant-pagination-options
    {
        height : 32px;
    }
    .ant-pagination-options input , .ant-pagination-options-quick-jumper inout
    {
       width: 50px !important;
       height: 32px !important;
       border-radius: 2px !important; 
    }
    .ant-pagination-item-active
    {
        border: 1px solid var(--primary-color) !important;
        color: var(--primary-color) !important;
    }
    & .ant-table-cell p 
    {
        // width: 95%;
        text-overflow: ellipsis;
        white-space: pre;
        overflow: hidden;
        text-align: center;
        display: flex;
        justify-content: center;
    }
    .question_title_cell
    {
        width: 100%;
        justify-content: center;
        margin: 0 auto;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        gap: 8px;
    }
    .question_title_cell i 
    {
        background-size: 12px;
        padding: 0 10px 0 10px;
    }
    & .ant-table-tbody tr:nth-child(odd)
    {
        background: var(--surface) !important;
    }
    & .ant-table-container
    {
        direction : rtl;
    }
    & .ant-table-container::before , & .ant-table-container::after
    {
        box-shadow : none !important;
    }
    .ant-table-thead .ant-table-cell
    {
        border: 1px solid rgba(184, 184, 184, 0.20);
        border-radius: 2px;
    }
    .order_cell {
        display: flex;
        justify-content: center;
        gap: 10px;
        height: 47.5px;
        color: var(--Neutral-Gray9) !important;
    }
    .order_cell .order_cell_number
    {
        display: flex;
        justify-content: center;
        width : 50%;
        align-items: center;
        border-left: 1px solid #D9D9D9;
    }
  .order_cell .edit_result_button
  {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    border: 1px solid var(--neutral-5, #D9D9D9);
    cursor: pointer;
    box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.06);
    transition: 0.3s;
  }
  .order_cell .edit_result_button:hover
  {
    border: 1px solid var(--primary-color);
  }
  .order_cell .edit_result_button i
  {
    width: 11px;
  }
    .order_cell_number i
    {
      filter: invert(37%) sepia(74%) saturate(1045%) hue-rotate(210deg) brightness(91%) contrast(105%);
    }
    .order_checkbox
    {
        width : 50%;
        display: flex;
        //justify-content : center;
    }
    .order_checkbox .ant-checkbox-inner
    {
      border-radius: 2px !important;
    }
    .order_cell p 
    {
        display: flex;
        align-items: center;
    }
    .ant-table-cell
    {
        border: 0.5px solid rgba(184, 184, 184, 0.20);
        box-shadow: 0px -1px 0px 0px #F0F0F0 inset !important;
    }
    .ant-table-cell.ant-table-selection-column
    {
        border: 1px solid #D9D9D9 !important; 
        border-top : none !important;
        padding : 0 !important;
    }
    .ant-pagination *
    {
        font-family : IRANSans !important;
    }
    .no_data_table .ant-table-wrapper , .no_data_table
    {
        width : 100%;
        height : 100%;
    }
    .no_data_table .ant-table-content
    {
        overflow-y : hidden;
        overflow-x : scroll;
    }
    .no_data_table .ant-table-content::-webkit-scrollbar
    {
        width: 10px;
        overflow: visible;
        height: 10px;
    }
    .no_data_table .ant-table-content::-webkit-scrollbar-thumb
    {
        background: #D3CFCF;
        border-radius: 31px;
    }
    .no_data_table .ant-table-content::-webkit-scrollbar-track
    {
        background: transparent;
    }
    .no_data_table .ant-table-wrapper
    {
      overflow: auto;
    }
    .ant-table-cell .no_result_message
    {
        color: var(--Neutral-Gray9) !important;
        font-size: 20px;
        line-height: 30px;
    }
    .ant-input-suffix
    {
        margin-left : 3.5rem;
    }
    .ant-spin-container
    {
        max-height: 540px;
        overflow: scroll;
    }
    .ant-spin-container::-webkit-scrollbar 
    {
        width : 0;
    }
  .ant-upload-list-item
  {
    justify-content: center;
  }
    .ant-upload-list-item a
    {
      flex : none !important;
    }
  .ant-table-cell.ant-table-selection-column.ant-table-cell-fix-left
  {
    right : 0 !important;
    box-shadow: -4px 0px 24px 0px rgba(0, 0, 0, 0.10) !important;
  }
  .ant-table-header
  {
    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.10) !important;
  }
  .ant-select.ant-pagination-options-size-changer
  {
    height: 100% !important;
  }
  .ant-select.ant-pagination-options-size-changer .ant-select-selector
  {
    height: 100% !important;
    align-items: center;
    border-radius: 2px;
  }
`
export const EmptyResultContainer = styled.div`
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 14px;
    color: var(--character-title-85, rgba(0, 0, 0, 0.85));

    & p 
    {
        margin-top : 8px;
    }
    & button 
    {
        background : var(--primary-color);
    }
    .ant-table-cell
    {
      font-weight: 300 !important;
      border-radius: 2px !important;
    }
    .question_title_cell
    {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
    }
  .question_title_cell p
  {
    margin-top: 0 !important;
  }
`
export const ResultButton = styled.button`
    background: #FEFEFE;
    border: 1px solid #D9D9D9;
    padding: 0.8rem 15px 0.8rem 15px;
    cursor: pointer;
    box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.06);
    justify-content: center;
    display: flex;
    height: 34px;
    align-items: center;
    transition: 0.3s;
    white-space: pre;
    border-radius: 2px;
    color: var(--Neutral-Gray9);

    &:hover
    {
        border : 1px solid var(--primary-color);
        color : var(--primary-color);
    }
    &:hover i 
    {
        filter: invert(37%) sepia(74%) saturate(1045%) hue-rotate(210deg) brightness(91%) contrast(105%);
    }
    
`
export const DeleteRowButton = styled.button`
    padding: 0.8rem 0 0.8rem 0;
    display: flex;
    width : 40px;
    height: 34px;
    cursor: pointer;
    background: #EEE;
    transition: 0.3s;
    justify-content: center;
    border: 1px solid #D9D9D9;
    align-items : center;
    border-radius: 2px;
    pointer-events : ${p => p.disabled ? 'none' : 'all'};
`
export const ResultBodyTopPart = styled.div`
    display : flex;
    flex-direction : row-reverse;
    gap: 12px;
    margin-top : 10px;
    @media screen and (max-width : 768px)
    {
       
        flex-wrap : wrap-reverse;
        
    }
`
export const TableOutPut= styled.div`
    width : 55%;
    display : flex;
    flex-direction : row-reverse;
    justify-content: space-between;

    .table_control
    {
       display : flex;
       gap : 15px;
    }
`
export const EmptyButtonPage = styled(Button)`
    border-radius : 2px;
    margin-top: 16px;
    box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.06);
    padding: 4px 15px;
`

export const DateFilterContainer = styled.div`
  padding: 8px;
  gap: 8px;
  display: flex;
  flex-direction: column;

  .rmdp-input
  {
    border-radius: 2px;
    width: 100%;
    height: 32px;
  }
  input
  {
    border-radius: 2px;
    font-family: 'IRANSANS';
    text-align: right;
  }
  .b-deselect
  {
    margin-right: 10px;
  }
  .ant-checkbox-inner
  {
    border-radius: 2px !important;
  }
`
export const InterviewerCodeSearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.25);
  flex-direction: row-reverse;
  border-radius: 2px;
  & input
  {
    border: none;
    direction: rtl !important;
  }
  & input:focus
  {
    box-shadow: none !important;
  }
  span
  {
    padding: 9px;
    border-right: 1px solid rgba(0, 0, 0, 0.25);
  }
`
export const DateFilterButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  gap: 8px;
  width: 100%;
  
  .ant-btn
  {
    color: var(--Neutral-Gray6);
  }
  .search-button
  {
    color: var(--Neutral-Gray9);
  }
  .ant-btn:hover
  {
    color : var(--primary-color);
  }
`
export const FilterButtonContainer = styled.div`
    align-items: center;
    display: flex;
    gap: 12px;
    cursor: pointer;
    text-align: right;
    justify-content: center;
    transition: 0.3s;
  
  & span
  {
    padding: 3px;
    border-radius: 2px;
    transition: 0.3s;
  }
  & span:hover
  {
    background-color: #E2E2E2;
  }
`