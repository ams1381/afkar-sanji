import {styled} from "styled-components";

export const Bank = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  padding: 10px 15px;
  gap: 10px;
  align-self: stretch;
  border-radius: 2px;
  border: 1px solid var(--login-input-default-border);
  background: var(--surface);
  display: flex;
  align-items: center;

  & .input {
    /* Chrome, Safari, Edge, Opera */

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */

    &[type=number] {
      -moz-appearance: textfield;
    }
  }

  > .type_text {
    color: var(--Neutral-Gray9);
    font-family: IRANSans;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }

  > img {
    cursor: pointer;
  }
`