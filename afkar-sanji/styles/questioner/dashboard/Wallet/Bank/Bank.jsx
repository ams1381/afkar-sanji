import {styled} from "styled-components";

export const Bank = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const BankHead = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 2px;
  background: var(--surface);

  > .text {
    color: var(--Neutral-Gray9);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; 
  }
`

export const BankCard = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 15px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  align-self: stretch;
  border-radius: 2px;
  border: 1px solid var(--login-input-default-border);
  background: var(--surface);
  
  > .type_text {
    color: var(--Neutral-Gray9);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
  
  > img {
    cursor: pointer;
  }
`