import { styled } from "styled-components";

export const TopBar = styled.div`
    display: flex;
    height: 34px;
    flex-direction: row-reverse;
    margin-top: 24px;
    gap : 14px;

    @media screen and (max-width : 768px)
    {
        flex-wrap : wrap-reverse;
        height : auto !important;
    }
`
export const TopBarChartSelectorContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
    background: white;
    padding: 2px;

    @media screen and (max-width : 768px)
    {
        width : 100%;
        flex-wrap : wrap;
        background : none;
        
    }
`
export const TopBarButtonsContainer = styled.div`
    display: flex;
    width: 50%;
    gap: 13px;
    justify-content: space-between;

    & button 
    {
        box-shadow : none !important;
    }
    & a 
    {
        text-decoration : none;
    }
    .download_charts_btn
    {
        gap: 10px;
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
  
        padding: 7px 8px;
        
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
    border: 1px solid var(--Outline-variant, #CCC);
    background: var(--Surface, #FEFEFE);
    padding : 12px;
    margin-top: 24px;
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

    .question_chart_title
    {
        width: 90%;
        text-align: right;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row-reverse;
        gap: 8px;
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
    }
    .question_chart_buttons button {
        background: none;
        cursor: pointer;
        border: none;
        outline: none;
    }
    .question_chart_buttons button i {
        width: 20px;
        height: 20px;
    }
}
`