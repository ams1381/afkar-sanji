import {styled} from "styled-components";

export const AddResultFooter = styled.div`
      display: flex;
      gap: 10px;
      padding-bottom: 15px;
      .ant-btn-primary
      {
        background: var(--primary-color) !important;
      }
`
export const QuestionsContainer = styled.div`
  display: grid;
  padding: 24px 0;
  direction: rtl;
  grid-template-columns: repeat(auto-fill,minmax(332px,1fr));
  gap: 80px;
`
export const QuestionContainer = styled.div`
    direction: rtl;
    word-break: break-word;
    padding: 12px;
    transition: 0.3s;
    .question_description
    {
      font-size: 14px;
      margin-top: 4px;
      color: var(--Neutral-Gray9);
    }
    border: ${
      p => p.error ? '1px solid var(--Error-color)' : 'none'
    };
    border-radius: 2px;
    background: ${p => p.error ? '#ff00001c' : 'none'} ;
  
  .question_header
  {
    display: flex;
    color: var(--Neutral-Gray9);
    gap: 8px;
  }
  .question_header span , .question_title
  {
    color: var(--Neutral-Gray9);
  }
  .question_header span
  {
    white-space: nowrap;
  }
  
`
export const QuestionOptionsContainer = styled.div`
    display: flex;
    margin-top: 24px;
    flex-direction: column;
    gap: 8px;
`
export const InputAnswerContainer = styled.div`
      & .ant-input-number
      {
        border-radius: 2px !important;
        margin-top: 26px;
        width: 100% !important;
      }
  .ant-skeleton.ant-skeleton-element
  {
    width : 100%;
  }
  & input
  {
    font-family: 'IRANSANS' !important; 
  }
`
export const DegreeItemsContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 10px;
  margin-top: 26px;
`