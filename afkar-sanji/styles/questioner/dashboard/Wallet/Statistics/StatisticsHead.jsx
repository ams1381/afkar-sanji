import {styled} from "styled-components";

export const StatisticsHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 60px;
  padding: 10px;
  gap: 10px;
  align-self: stretch;
  border-radius: 12px 12px 0px 0px;
  border: 1px solid var(--primary-color);
  background: var(--questioner-text-white);
  
  > .text {
    color: var(--primary-color);
    text-align: right;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px; 
  }
`