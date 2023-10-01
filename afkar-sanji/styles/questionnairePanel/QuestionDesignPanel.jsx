import { styled } from "styled-components";

export const QuestionnairePanelBodyContainer = styled.div`
    font-family: 'IRANSANS';
    // margin-top: 0.9rem;
    font-size: 14px;
`
export const QuestionSearchContainer = styled.div`
    width : ${p => p.questionnairePanel ? '50% !important' : '100%'};
    position: relative;
    height: 40px;
    font-family: 'IRANSANS';
    margin-bottom: 10px;
    .ant-select
    {
        height : 40px !important;
    }
    &::webkit-scrollbar 
    {
        width : 0;
    }
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
    .ant-input-affix-wrapper
    {
        width: 100%;
        height: 100%;
        direction: rtl;
        border-radius: 2px;
        font-family: IRANSans;
    }
    & .ant-select-selection-search-input
    {
        font-family : IRANSans;
        border : none !important;
    }
    & .ant-select-selection-search-input
    {
        width : 90% !important;
    }
    & .ant-select-selector 
    {
        height : 100% !important;
        display : flex !important;
        align-items : center;
        border-radius : 2px;
    }
    .ant-select-selection-placeholder , input
    {
        font-family : IRANSans;
    }
    .ant-select-arrow , .ant-select-clear
    {
        top : 16px;
    }
    .ant-select-selection-search
    {
        display : flex;
        align-items : center;
    }
    .ant-input-suffix
    {
        margin-left: 52px;
    }
    .search_icon_box
    {
        height: 100%;
        width: 50px;
        left: 0;
        border-radius: 0px 2px 2px 0px;
        border-right: 1px solid #D9D9D9;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 33;
        top: 0;
    }
    .ant-select-arrow
    {
        height: 100%;
        width: 50px;
        left: 0;
        border-radius: 0px 2px 2px 0px;
        border-right: 1px solid #D9D9D9;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 6px;
    }
    .ant-select-selection-item
    {
        display : flex;
        align-items : center;
    }
    .ant-select-clear
    {
        left : 65px;
        top : 20px;
    }
    & .ant-skeleton.ant-skeleton-element , .ant-skeleton-input
    {
        width : 100% !important;
        border-radius: 2px;
    }
    @media screen and (max-width : 768px)
    {
        width : 100% !important;
        height : auto;
        flex-wrap : wrap;
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
    // margin-top: 10px;
    position: relative;
    // max-height : 478px;
    align-items: flex-end;
    // overflow : scroll;
    flex-direction : column;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent; 

    &::-webkit-scrollbar
    {
        width : 0;
        scroll-behavior: smooth;
        background: transparent;
    }

    & > div
    {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    .QuestionDesignLeftContainer 
    {
        position: absolute;
        left: 0;
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 16px;
        text-align: center;
        word-break: break-word;
        margin: 0 1rem;
        
    }
    .QuestionDesignRightContainer
    {
        max-height: 533px;
        overflow : scroll;
        padding-bottom : 10px;
    }
    .QuestionDesignRightContainer::-webkit-scrollbar
    {
        width : 0;
    }
    .QuestionDesignLeftContainer  p 
    {
        width : 85%;
    }
    .QuestionDesignRightContainer > div:first-child
    {
        width : 100%;
    }
    @media screen and (max-width : 768px) {
        & .QuestionDesignLeftContainer
        {
            display : none;
        }
    }
    @media screen and (max-width : 480px)
    {
        .QuestionDesignRightContainer
        {
            max-height: 495px;
        }
    }
    
`
export const QuestionDesignItem = styled.div`
    border: 1px solid ${p => p.isopen ? p.childq ? '#7C86FA' : '#7C86FA' : 'none'};
    border-radius: 2px;
    margin-top : 10px;
    background: var(--surface);
    width: ${p => p.childq ? '95%' : '100%'};
    // margin-top : ${p => p.childq ? '1rem' : '0'};
    transition : border 0.3s;
    border-right : 2px solid ${p => p.saved ? 'var(--primary-color)' : 'var(--Error-color)'};

    .question_bold_info 
    {
        display : flex;
        transition : 0.3s;
        border: 1px solid ${p => p.errorocurr ? '#ff4d4f' : 'var(--primary-color)'};
        border-radius: 2px;
    }
    .question_bold_info  .question_type_selector {
        border-left: 1px solid ${p => p.errorocurr ? '#ff4d4f' : 'var(--primary-color)'};
        background: #F5F5F5;
        display: flex;
        align-items: center;
    }
    .question_type_selector .ant-select-selection-item
    {
        color : var(--primary-color);
    }
    .question_type_selector .ant-select-selection-item  i 
    {
        filter : invert(37%) sepia(74%) saturate(1045%) hue-rotate(210deg) brightness(91%) contrast(105%);
    }
    .question_type_selector .type_select_item
    {
        gap : 5px;
    }
    .question_bold_info .ant-select-selection-item
    {
        display: flex;
        padding : 0;
    }
    .question_type_selector > div {
        width : auto !important;
    }
    .question_type_selector .ant-select-arrow
    {
        display : none;
    }
    @media screen and (max-width : 768px)
    {
        & .design_container
        {
            width: ${p => p.childq ? '95%' : '100%'} !important;
        }
    }

`
export const LoadingQuestionItem = styled(QuestionDesignItem)`
        background : none;
        direction : rtl;
        display : flex;
        justify-content : flex-start;
        margin-top : 10px;
        border : none !important;
        .question_item_info
        {
            display : flex;
            justify-content : flex-end;
        }
        .loading_surface
        {
            width : 50%;
            display : flex;
            justify-content : space-between;
        }
        @media screen and (max-width : 768px)
        {
            .loading_surface
            {
                width : 100% !important;
            }
        }
`
export const PreviewContainer = styled.div`
    
        width : 50%;
        position: fixed;
        width: 44%;
        left: 6%;
        max-height: 591px;
        overflow: scroll;
        top: ${p => p.QuestionTopDis ? p.QuestionTopDis + 'px' : '138px'};
    
    &::-webkit-scrollbar
    {
        width : 0;
    }
    @media screen and (max-width : 768px)
    {
        &
        {
            display : none;
            position : unset;
        }
    }
`
export const QuestionItemRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: row-reverse;
    align-items: flex-start;
    max-height : ${p => (p.isopen != null && p.maxheight && p.maxheight > 200) ?
         p.maxheight + 10 + 'px'  : 'fit-content'};
    & .question_design_item
    {
        overflow: hidden;
    }
    .nested_dnd_message
    {    
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px dotted var(--Neutral-Gray6);
        color: var(--Neutral-Gray6);
        margin-top : 10px;
    }
    .design_container
    {
        width : ${p => p.childq ? '100%' : '50%'};
    }
    .child_container
    {
        position : relative;
    }
    @media screen and (max-width : 768px)
    {
        max-height : fit-content !important;
        justify-content: flex-end;
        & .question_design_item 
        {
            width : 100% !important;
            overflow : hidden;
        }
        & .question_preview
        {
            display : none;
            position : unset;
        }
        & .design_container
        {
            width: ${p => p.childq ? '95%' : '100%'} !important;
        }
    }
`
export const QuestionItemSurface = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    padding : 10px 12px;

    & > div
    {
        display: flex;
        flex-direction: row-reverse;
        text-align : right;
        word-break: break-word;
        align-items: center;
        cursor : pointer;
    }
    .question_item_info
    {
        width : 80%;
        overflow: hidden;
    }
    .question_item_info p 
    {
        color : #B8B8B8;
        margin-right : 0.4rem;
        direction: rtl;
        text-overflow: ellipsis;
        white-space: pre;
        overflow: hidden;
    }
`
export const DropDownQuestionButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    margin-left: 0.5rem;
    display: flex;
    gap: 5px;

    & i 
    {
        transition : 0.3s;
        transform : ${p => p.dropped ? 'rotate(-90deg)' : 'none'};
    }
    
`
export const QuestionItemButtonContainer = styled.div`
    width: fit-content;
    display: flex;
    justify-content: space-between;
    gap: 15px;

    & button 
    {
        background: none;
        border: none;
        outline: none;
        display: flex;
        align-items: center;
        cursor: pointer;
        width: 34px;
        height: 34px;
        justify-content: center;
        transition : 0.3s;
    }
    .add_btn 
    {
        border: 1px solid #D9D9D9;
        border-radius: 2px;
    }
    .add_btn:hover
    {
        border: 1px solid var(--primary-color);
    }
    .ant-skeleton-button
    {
        min-width : 32px !important;
        width : 32px;
        border-radius: 2px;
    }
    .remove_btn:hover , .duplicate_btn:hover
    {
        transform : translate(1px , 0)
    }
`
export const QuestionItemActionSelector = styled.div`
    width: 100%;
    margin-top: 0.8rem;
    border-top: 1px solid #0000000F;
    display: flex;
    overflow: hidden;

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
    border-bottom : ${p => p.selected ? '2px solid var(--primary-color)' : 'none'};
    color : ${p => p.selected ? 'var(--primary-color)' : '#8F8F8F'};
    flex-direction: row-reverse;
    font: 14px IRANSans;
    height: 40px;
    align-items: center;
    cursor: pointer;
    margin-top: 0.4rem;
    box-sizing: content-box;
    outline : none;
    & p 
    {
        margin-left: 0.5rem;
        white-space: nowrap;
    }
    & svg
    {
        transition : 0.3s;
        fill : ${p => p.selected ? 'var(--primary-color)' : '#8F8F8F'};
        
    }
    @media screen and (max-width : 480px)
    {
        & svg
        {
            width: 18px;    
        }
        // &.setting_button
        // {
        //     margin-left: -9px;
        // } 
        // & svg
        // {
        //     margin-left: 20px;
        // }
        // &.write_button svg
        // {
        //     margin-left: 0;
        // } 
    }
`
export const QuestionItemSettingContainer = styled.div`
    width: 95%;
    margin : 1rem auto;
`
export const QuestionItemWriteContainer = styled.div`
    width: 95%;
    margin : 0 auto;
`
export const QuestionItemTitleContainer = styled.div`
    height: 40px;
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
    border-radius: 2px;
`
export const QuestionItemFooter = styled.div`
    display : flex;
    gap: 20px;
    width: 95%;
    margin: 0 auto;
    margin-bottom: 13px;

    button 
    {
        width : 50%;
        height : 34px;
        border-radius : 2px;
        text-align : center;
        font-family : IRANSans;
        outline : none;
    }
    button:first-child
    {
        background: ${p => p.savebuttonactive ? '#F4F4F4' : 'var(--primary-color)'};
        color : ${p => p.savebuttonactive ? '#c9c9c9' : 'white'};
        pointer-events : ${p => p.savebuttonactive ? 'none' : 'all'};
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
    transition : 0.3s;

    &::placeholder 
    {
        color: #D9D9D9;
    }
    &:focus 
    {
        border : 1px solid var(--primary-color);
    }
    
`
export const InputOptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 20px;

    & button 
    {
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
    }
    & button i 
    {
        width : 30px;
        height : 30px;
    }
    .option_container 
    {
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: space-between;
    }
    .option_button_container
    {
        display: flex;
        gap: 20px;
        margin-right: 20px;
    }
   
`
export const OptionWritingContainer = styled.div`
    text-align : right;
    & p 
    {
        margin : 0.6rem 0;
        color: var(--Neutral-Gray9);
    }
    .options_error_message
    {
        font-size: 12px;
        color: var(--Error-color);
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
    height: 40px;
    outline: none;
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
        width: 90%;
        border: 1px solid #D9D9D9;
        font-family: 'IRANSANS';
        text-align: right;
        padding: 5px 12px 5px 12px;
        border-radius: 2px;
        outline : none;
        direction : rtl;
    }
    @media screen and (max-width : 480px)
    {
        .ant-input
        {
            width : 86%;
        }
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
    // margin: 0.6rem 0;
    cursor: pointer;
    transition : 0.3s;
    padding : 20px 0;
    background: #FEFEFE;
    border-radius : 2px;

    & svg
    { 
        fill : #5360ED;
        transition : 0.3s;
    }
    & p
    {
        margin-left : 0.5rem;
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
export const SliderContainer = styled.div`
    & .ant-slider 
    {
        margin-top : 20px !important;
        margin-bottom : 35px !important;
    }
`