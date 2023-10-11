import {styled} from "styled-components";

export const TransactionItem= styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  width: 100%;
  border-radius: 2px;
  background: var(--surface);
  
  
`

export const TransactionHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px 15px 10px 15px;
  border-bottom: 1px solid #eee;
  
  > .title {
    color:  #525252;
    text-align: right;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; 
  }
  
  > .date {
    display: flex;
    align-items: center;
    gap: 10px;
    color:  #525252;
    text-align: right;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
`

export const TransactionBody = styled.h2`
  padding: 10px 15px 5px 15px;
  display: flex;
  align-items: center;
  gap: 10px;

  > .text {
    color: ${p => p.success};
    text-align: right;
    font-size: 20px;
    font-style: normal;
    font-weight: bold;
    line-height: 30px;
  }
`