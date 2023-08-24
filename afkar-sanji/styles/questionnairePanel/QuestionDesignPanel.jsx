import { styled } from "styled-components";

export const QuestionnairePanelBodyContainer = styled.div`
    font-family: 'IRANSANS';
    margin-top: 0.9rem;
    font-size: 14px;
`
export const QuestionSearchContainer = styled.div`
    position: relative;
    height: 40px;
    font-family: 'IRANSANS';

    & label 
    {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #D9D9D9;
        padding: 0.6rem 0.9rem 0.6rem 0.9rem;
        cursor : pointer;
    }
    & .ant-select-selection-search-input
    {
        font-family : IRANSans;
        border : none !important;
    }
    .ant-select-selection-placeholder
    {
        font-family : IRANSans;
    }
    .ant-select-arrow , .ant-select-clear
    {
        top : 16px;
    }
`
export const QuestionSearchInput = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    text-align: right;
    font-family: 'IRANSANS';
    padding: 0.7rem;

`
export const ClearSearchInputButton = styled.button`
    display: flex;
    left: 60px;
    top: 0;
    width: 10%;
    background: none;
    border: none;
    align-items: center;
    outline: none;
    position: absolute;
    height: 100%;
    cursor : pointer;
`
export const QuestionDesignTitle = styled.div`
    text-align: right;
    color: var(--Neutral-Gray9);
    margin-top: 0.9rem;
`
export const QuestionDesignBox = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-top: 1rem;

    & > div
    {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    
    .QuestionDesignRightContainer > div:first-child
    {
        width : 100%;
    }
    @media screen and (max-width : 768px) {
        // & div:first-child
        // {
        //     width: 100%;
        // }
        & .QuestionDesignLeftContainer
        {
            display : none;
        }
    }
`
export const QuestionDesignItem = styled.div`
    padding: 1rem;
    border: 2px solid ${p => p.isOpen ? p.childq ? '#7C86FA' : '#3E4ACB' : '#D9D9D9'};
    border-radius: 2px;
    margin: 0.6rem 0;
    width: ${p => p.childq ? '95%' : '100%'};
    margin-top : ${p => p.childq ? '1rem' : '0'};
    transition : border 0.3s;
    .question_bold_info 
    {
        display : flex;
    }
    .question_bold_info  .question_type_selector {
        border: 1px solid var(--primary-color);
        background: #F5F5F5;
        display: flex;
        align-items: center;
    }
    .question_type_selector > div {
        width : auto !important;
    }

`
export const QuestionItemRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: flex-start;

    & .question_preview
    {
        width : 50%;
    }
   
    @media screen and (max-width : 768px)
    {
        & .question_design_item
        {
            width : 100%;
        }
        & .question_preview
        {
            display : none;
        }
    }
`
export const QuestionItemSurface = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;

    & > div
    {
        display: flex;
        flex-direction: row-reverse;
        text-align : right;
        word-break: break-word;
        cursor : pointer;
    }
    .question_item_info
    {
        width : 100%;
    }
`
export const DropDownQuestionButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    margin-left: 0.5rem;

    & i 
    {
        transition : 0.3s;
        transform : ${p => p?.dropped ? 'rotate(-90deg)' : 'none'};
    }
    
`
export const QuestionItemButtonContainer = styled.div`
    width: fit-content;
    display: flex;
    justify-content: space-between;

    & button 
    {
        background: none;
        border: none;
        outline: none;
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-right: 1.5rem;
    }
    @media screen and (max-width : 480px)
    {
        & button 
        {
            margin-right: 1rem;
        }
    }
   
`
export const QuestionItemActionSelector = styled.div`
    width: 100%;
    margin-top: 0.8rem;
    border-top: 1px solid #0000000F;
    display: flex;

    & .view_question
    {
        display: none;
    }
    @media screen and (max-width : 768px)
    {
        .view_question
        {
            display: flex;
        }
    }
`
export const PreviewMobileSizeComponent = styled.div`
    @media screen and (min-width : 768px)
    {
        display : none;
    }
`
export const QuestionItemActionButton = styled.button`
    width: 50%;
    display: flex;
    justify-content: center;
    background: none;
    border: none;
    border-bottom : ${p => p.selected ? '1px solid var(--primary-color)' : 'none'};
    color : ${p => p.selected ? 'var(--primary-color)' : '--Neutral-Gray9'};
    flex-direction: row-reverse;
    font: 12px IRANSans;
    height: 40px;
    align-items: center;
    cursor: pointer;
    margin-top: 0.4rem;
    transition : 0.3s;
    & p 
    {
        margin-left: 0.5rem
    }
    & svg
    {
        transition : 0.3s;
        fill : ${p => p.selected ? 'var(--primary-color)' : '#8F8F8F'}
    }
`
export const QuestionItemSettingContainer = styled.div`
    width: 100%;
    margin-top: 1rem;
`
export const QuestionItemTitleContainer = styled.div`
    height: 40px;
    border: 1px solid var(--primary-color);
    border-radius: 2px;
    width: 100%;
`
export const QuestionItemTitleInput = styled.input` 
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    text-align: right;
    font-family: 'IRANSANS';
    padding: 0.7rem;
    direction: rtl;
`
export const QuestionItemFooter = styled.div`
    display : flex;
    gap : 10px;
    margin-top: 0.7rem;
    button 
    {
        width : 50%;
        height : 34px;
        border-radius : 2px;
        text-align : center;
        font-family : IRANSans;
    }
`
export const DescriptionTextField = styled.input`
    
`
export const OptionalInputItem = styled.input`
    width: 80%;
    border: 1px solid #D9D9D9;
    border-radius: 2px;
    padding: 5px 12px;
    height: 40px;
    text-align: right;
    outline: none;
    font-family: 'IRANSANS';
    direction: rtl;

    &::placeholder 
    {
        color: #D9D9D9;
    }
`
export const InputOptionsContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;

    & button 
    {
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
    }
    & button i 
    {
        width : 25px;
        height : 25px;
    }
    .option_button_container
    {
        display : flex;
        gap : 10px;
    }
`
export const OptionWritingContainer = styled.div`
    text-align : right;
    & p 
    {
        margin : 0.6rem 0;
        color: var(--Neutral-Gray9);
    }
`
export const AddOptionButton = styled.button`
    width: 100%;
    margin-top: 0.8rem;
    border: 1px solid #D9D9D9;
    padding: 5px 12px 5px 12px;
    text-align: right;
    font: 13px IRANSans;
    color: #D9D9D9;
    background: none;
    cursor : pointer;
`

export const RangeLabelContainer = styled.div`
    text-align: right;
    font-family: 'IRANSANS';

    & .label_container 
    {
        display: flex;
        justify-content: space-between;
        margin: 0.7rem 0;
    }
    & .ant-input
    {
        width: 80%;
        border: 1px solid #D9D9D9;
        font-family: 'IRANSANS';
        text-align: right;
        padding: 5px 12px 5px 12px;
        border-radius: 2px;
        outline : none;
        direction : rtl;
    }
`
export const AddNonQuestionItem = styled.div`
    width: 50% !important;
    text-align: center;
    border: 1px solid ${p => p.addquestion ? 'var(--primary-color)' : '#D9D9D9' };
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-color);
    margin: 0.6rem 0;
    cursor: pointer;
    transition : 0.3s;
    border-radius : 2px;

    & svg
    {
        margin-left : 0.5rem;
        fill : #5360ED;
        transition : 0.3s;
    }
    &:hover 
    {
        background : ${p => p.addquestion ? 'var(--primary-color)' : 'auto' };
        color : ${p => p.addquestion ? 'white' : 'auto' };
        border : 1px solid ${p => !p.addquestion ? 'var(--primary-color)' : 'auto' }
    }
    &:hover svg 
    {
        fill : ${p => p.addquestion ? 'white' : 'auto' }
    }
    @media screen and (max-width: 768px)
    {
        width : 100% !important;
    }
`