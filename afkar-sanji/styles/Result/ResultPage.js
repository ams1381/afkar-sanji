import { Button } from "antd";
import { styled } from "styled-components";

export const ResultBodyContainer = styled.div`
    margin-top : 10px;
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
        margin-top : 10px;
        background : ${p => p.loading ? '#EFE9E9' : 'none'};
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
    //  .ant-table-cell.ant-table-selection-column
    // {
    //     min-width : 70px !important;
    // }
    // colgroup col 
    // {
    //     min-width : 217px;
    // }
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
        border-left: 1px solid #D9D9D9;
    }
    .order_checkbox
    {
        width : 50%;
        display: flex
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