import { styled } from "styled-components";

export const QuestionnaireContainer = styled.div`
    width: 100%;
    margin: 0.6rem auto;
    padding-bottom: 1rem;
    display: grid;
    row-gap: 1.3rem;
    //grid-template-columns: repeat(auto-fill,minmax(406px,1fr));
  grid-template-columns: repeat(auto-fill,minmax(350px,1fr));
    justify-items: center;
    direction: rtl;
    grid-auto-flow: dense;
    column-gap: 2rem;

    @media screen and (max-width : 480px)
    {
        grid-template-columns: auto;
        
    }
`
export const QuestionnaireBadgeTextContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`
export const InterviewerBadgeText = styled.p`
    padding: 0 8px;
    border-right: ${p => p.interview ? '2px solid var(--Outline, #D9D9D9)' : 'none'};
`
export const QuestionnaireDiv = styled.div`
    height: fit-content;
    border: ${p => p.isloading ? 'none' : '1px solid #CCCCCC'};
    border-radius: 2px;
    font-family: 'IRANSans';
    //width: 420px;
    width: 100%;
    direction: ltr;
    background: ${p => p.isloading ? '#E7E7E7' : 'var(--surface)'};
    padding-bottom : ${p => p.isloading ? '20px' : '0'};

    @media screen and (max-width : 680px)
    {
        &
        {
           margin : 0.4rem auto;
        }
       
    }
    @media screen and (max-width : 480px)
    {
        &
        {
            width: 100%;
        }
    }
    .ant-ribbon-text
    {
        display: flex;
        align-items: center;
    }
` 
export const QuestionnaireHeader = styled.div`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    justify-content: space-between;
    padding: 0.7rem 0 0.5rem 0;
    color: var(--Neutral-Gray9);
    border-bottom: 1px solid #F0F0F0;
    word-break: break-word;

    .questionnaire_preview
    {
        margin-left : 1.5rem;
    }
`
export const QuestionnaireBodyStat = styled.div`
    display: flex;
    width: 90%;
    padding: 0.3rem;
    margin: 0.5rem auto;
    justify-content: space-between;
    color: #7A7A7A;
    font-size: 14px;
    font-family: 'IRANSans';
`
export const QuestionnaireFooter = styled.div`
    display: flex;
    justify-content: ${p => p.loading ? 'space-evenly' : 'space-around'};
`
export const QuestionnaireNameInput = styled.input`
  font-family: 'IRANSANS';
  background: none;
  border: none;
  color: ${p => p.error ? 'var(--Error-color)' : 'var(--Neutral-Gray9)'} ;
  font-weight: 600;
  font-size: 1rem;
  outline: none;
  min-width: 25px !important;
  max-width: 231px;
  transition: width 0.25s;
  box-sizing: border-box;
  text-align: right;
  margin-left: 0.8rem;
  direction: rtl;
  // text-overflow: ellipsis;
  // white-space: nowrap;
  // overflow: hidden;

  &::selection {
    background: #86B6FF;
  }

  @media screen and (max-width: 480px) {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: ${p => p.questionnairePanel ? '106px !important' : '162px'};
  }
`
export const RenameSpan = styled.span`
    cursor : pointer;
    pointer-events : ${p => p.clickable ? 'all' : 'none'};
`
export const QuestionnaireNameContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    margin-right : 1.5rem;
`
export const QuestionnairePreviewButton = styled.button`
    color: ${p => p.disabled ? 'Gray' : 'var(--primary-color)'};
    background: none;
    border: none;
    font-family: 'IRANSANS';
    cursor : pointer;
    pointer-events : ${p => p.disabled ? 'none' : 'all'};
`
export const QuestionnaireSeeResultButton = styled.button`
    display: flex;
    font-family: 'IRANSANS';
    background: none;
    border: none;
    cursor: pointer;
    color: ${p => p.disabled ? 'Gray' : 'var(--primary-color)'};
    padding: 0.5rem;
    align-items: center;
    margin-left : 0.5rem;
    pointer-events : ${p => p.disabled ? 'none' : 'all'};

    & i 
    {
        display: flex;
    }
    & p 
    {
        margin-left: 0.5rem;
        margin-bottom: 10px;
    }
    .ant-skeleton.ant-skeleton-element
    {
        min-width: 20px !important;
        margin-left: 20px !important;
        margin-bottom: 13px !important;
    }
    .ant-skeleton.ant-skeleton-element .ant-skeleton-button
    {
        min-width: 20px !important;
        width: 108px !important;
        height: 20px !important;
    }
`
export const ContentBox = styled.div`
    width: 100%;
    height: 90vh;
    position: relative;
`
export const MainContainer = styled.div`
    height: 97%;
    width: 83.5%;
    margin: 0 auto;
    padding: 1rem 0 0 0;

    @media screen and (max-width : 480px)
    {
        width: 90%;
    }
`
export const FolderEditContainer = styled.div`
    width: 100%;
    justify-content: flex-end;
    display: flex;
    padding: 0.4rem 0 0.4rem 0;
    font-family: 'IRANSANS';

    & p 
    {
        margin-left: 0.5rem;
    }
    & input
    {
     max-width : 70%;   
    }
    
`
export const FolderPopoverToggle = styled.button`
    background: none;
    outline: none;
    border: none;
    color: var(--Neutral-Gray10);
    cursor: pointer;
    padding: 0.2rem;
`
export const QuestionnaireFooterItem = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    border-top: 1px solid #F0F0F0;
    border-right: 1px solid #F0F0F0;
    height: 40px;
    cursor : pointer;
    & a 
    {
        width : 100%;
        height : 100%;
        display : flex;
        justify-content : center;
        align-items : center;
    }
`
export const QuestionnaireFooterButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
`
export const EmptyFolderContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-family: 'IRANSANS';
    color: #8F8F8F;
    width: 210px;
    font-size: 14px;
    word-break: break-word;

    & button 
    {
        background: var(--primary-color );
        outline: none;
        padding: 4px 10px 4px 10px;
        border-radius: 2px;
        cursor: pointer;
        border: 2px solid var(--primary-color );
        color: white;
        display: flex;
        align-items: center;
        font-family: IRANSans;
        margin: 0.8rem auto;
        direction : ltr;
    }
    & button i 
    {
        display : flex;
    }
    & button p 
    {
        margin-right : 0.4rem
    }
`