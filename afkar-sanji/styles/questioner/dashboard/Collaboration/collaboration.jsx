import {styled} from "styled-components";

export const Collaboration = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const CollaborationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: space-between;
`


export const TimePickerContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${p => p.Error ? 'red' : 'var(--neutral-5, #D9D9D9)'};
  border-radius: 2px;
  padding: 5px var(--radius-XL, 12px);
  gap: var(--radius-none, 0px);
  height: 40px;
  width: 350px;
  flex-direction: row-reverse;
  justify-content: flex-end;
  background: transparent;

  & input {
    width: 100%;
    text-align: right;
    border: none;
    transition: 0.3s;
    outline: none;
    background: transparent;
    color: ${p => p.active ? 'black' : 'rgba(0, 0, 0, 0.25)'};
    pointer-events: ${p => p.active ? 'all' : 'none'};
  }

  & input::placeholder {
    color: var(--Neutral-Gray6);
  }
`

export const FilterBox = styled.div`
  display: flex;
  padding: 4px 0px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 2px;
  border: 1px solid var(--login-input-default-border);
  background: #FFF;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
  cursor: pointer;
  width: 5%;
`

export const CollaborationBody = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 16px;
  margin-top: 24px;
`


export const CollaborationItem = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  border-radius: var(--radius-XS, 2px);
  background: var(--surface);
  cursor: pointer;
`


export const CollaborationItemRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  direction: rtl;
  
  > .title {
    color: var(--Neutral-Gray9);
    text-overflow: ellipsis;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px; 
  }
  
  > .caption {
    color: var(--Neutral-Gray9);
    text-overflow: ellipsis;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px; 
    position: relative;
    width: fit-content;
    
    &::before {
      position: absolute;
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 100px;
      background: ${p => p.color};
      border: none;
      outline: none;
      left: -10px;
    }
  }
`

export const CollaborationItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 17px;

  > .price {
    display: flex;
    align-items: center;
    gap: 10px;

    > .text {
      color: var(--Neutral-Gray9);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
    }


  }

  > .result {
    display: flex;
    align-items: center;
    gap: 10px;

    > .text {
      color: var(--primary-color);
      text-align: right;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
    }

  }
`

export const DropDownItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  padding: 5px 0;
  
  > .text {
    color: var(--On-Surface, #525252);
    text-align: right;
    font-family: IRANSansX;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: 24px; /* 171.429% */
  }
  
  
`