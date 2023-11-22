import { styled } from "styled-components";

export const TopBar = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-top: 10px;
    gap : 14px;

    @media screen and (max-width : 768px)
    {
        flex-wrap : wrap-reverse;
        justify-content : center;
        height : auto !important;
    }
`
export const TopBarChartSelectorContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
    background: ${p => p.loading ? 'none' : 'white'};
    padding: 2px;
    height: 42px;
    align-items: center;
    border-radius: 2px;

    & .ant-skeleton.ant-skeleton-element
    {
        width: 74px !important;
    }
    & .ant-skeleton-input
    {
        min-width : 75px !important;
    }
    @media screen and (max-width : 768px)
    {
        width : 100%;
        // flex-wrap : wrap;
        // background : none;
        
    }
`
export const TopBarButtonsContainer = styled.div`
    display: flex;
    width: 50%;
    gap: 13px;
    justify-content: space-between;
    align-items: center;
   
    & button 
    {
        box-shadow : none !important;
        height: 42px;
    }
    & a 
    {
        text-decoration : none;
    }
    .download_charts_btn
    {
        gap: 10px;
        padding: 4px 15px;
        height: 42px;
    }
    .download_charts_btn i 
    {
        width: 14px;
        height: 14px;
        transform: rotate(180deg);
    }
    @media screen and (max-width : 768px)
    {
        width : 100%;
    }
`
export const ChartSelectItem = styled.div`
    display: flex;
    flex-direction: row-reverse;
    color: var(--On-Surface, #525252);
    align-items: center;
    gap: 14px;
    line-height: 24px;
    cursor: pointer;
    font-size: 12px;

    & span 
    {
        justify-content: center;
        display: flex;
    }
   
    @media screen and (max-width : 768px)
    {
  
        // padding: 7px 8px;
        
    }
`
export const  SortPopoverContainer = styled.div`
    width : 142px;
    padding: 4px 0px;
    display: flex;
    flex-direction: column;
    // height: 102px;
    justify-content: space-between;


    & > div
    {
        display: flex;
        color: var(--Neutral-Gray9);
        flex-direction: row-reverse;
        justify-content: space-between;
        cursor : pointer;
        padding: 5px 12px;
    }
    & > div:hover 
    {
        background : #F5F5F5;
    }

`
export const QuestionChartContainer = styled.div`
    border-radius: var(--radius-XS, 2px);
    border: ${p => p.loading ? 'none' : '1px solid var(--Outline-variant, #CCC)'};
    background: ${p => p.loading ? '#E7E7E7' :  'var(--Surface, #FEFEFE)'};
    padding : 12px;
    .selective_degree_line
    {
        margin: 24px 0px;
        gap: 15px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .selective_degree_line svg 
    {
        width : 45px;
        height : 45px;
    }
    @media screen and (max-width : 480px)
    {
        .selective_degree_line svg 
        {
            width : 35px;
            height : 35px;
        }
    }

    & canvas 
    {
        min-width : 350px;
    }
      
`
export const QuestionChartContainerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: center;
    color: #000000D9;
    font-size: 14px;
    border-bottom: 1px solid #0000000F;
    padding-bottom: 10px;

    & .question_chart_buttons .ant-skeleton-button
    {
        min-width : 50px !important;
        width : 65px !important;
    }
    .question_chart_title
    {
        width: 90%;
        text-align: right;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row-reverse;
        gap: 8px;
        padding: 5px 12px;
    }
    .question_chart_title i {
        width: 14px;
        height: 14px;
    }
    .question_chart_buttons 
    {
        display: flex;
        gap: 12px;
        align-items: center;
        justify-content: space-between;
        width: 120px;
    }
    .question_chart_buttons button {
        background: none;
        cursor: pointer;
        border: none;
        width: 34px;
        height: 23px;
        display: flex;
        justify-content: center;
        outline: none;
    }
    .question_chart_buttons button i {
        width: 22px;
        height: 22px;
        filter: invert(31%) sepia(0%) saturate(0%) hue-rotate(183deg) brightness(93%) contrast(83%);
    }
    .ExportChart i 
    {
        transform : rotate(180deg);
    }
}
`
export const QuestionChartBodyContainer = styled.div`
    margin-top: 14px;
    max-height: 500px;
    gap: 24px;
    flex-direction: column;
    display: flex;
    overflow: scroll;
    //scrollbar-width: thin;
    scrollbar-color: transparent transparent; 

    .childChartsContainer
    {
         width: 95%;
        margin: 12px auto;
        display: flex;
        flex-direction: column;
        gap: 12px; 
    }
    & canvas 
    {
        margin : 24px auto;
    }
    &::-webkit-scrollbar
    {
        width : 0;
        background: transparent;
    }
`
export const TableChart = styled.table`
    table-layout: fixed;
    margin: 24px auto;
    color: var(--character-title-85, rgba(0, 0, 0, 0.85));
    direction: rtl;
    border-spacing: 0;
    font-size: 14px;

    & tr td 
    {
        padding: 16px;
        border-bottom: 1px solid var(--conditional-divider, rgba(0, 0, 0, 0.06));
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: pre;
        max-width: 163px;
    }
    @media screen and (max-width : 768px)
    {
        width : 100%;
    }
`
export const TableHeadData = styled.td`
&::before
{
    content: '';
    width: 1px;
    position: absolute;
    height: 22px;
    display: ${p => p.hasdivider ? 'block' : 'none'};
    background: rgba(0, 0, 0, 0.06);
    left: 0;
}
& 
{
    background: var(--neutral-2, #FAFAFA);
    position : relative;
}
`