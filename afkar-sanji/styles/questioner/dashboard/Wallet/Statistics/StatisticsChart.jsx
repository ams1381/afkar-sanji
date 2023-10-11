import {styled} from "styled-components";

export const CharContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  border-radius: 0px 0px 12px 12px;
  background: var(--surface);
`

export const ChartBody = styled.div`
  padding: 10px 24px;
  width: 100%;
`

export const ChartHeader = styled.div`
  padding: 8px 0;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #eee;

  > .text {
    color: #474747;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
  }
`


export const ChartFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`


export const ChartFilterRight = styled.div`
  display: flex;
  flex-direction: column;
`

export const ChartFilterRightText = styled.div`
  text-align: right;
  color: var(--Neutral-Gray9);
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: 24px;
  position: relative;
  margin-right: 10px;
  
  &::after{
    position: absolute;
    content: '';
    width: 14px;
    height: 14px;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 100px;
    background: ${p => p?.color};
  }
`


//left
export const ChartFilterLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius:  2px;
  border: 1px solid rgba(143, 143, 143, 0.20);
`

export const Income = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 7px 18px;
  background: ${p => p.background};
  cursor: pointer;
  transition: all 0.5s ease;
  width: 100%;

  > .text {
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: space-between;
    width: 100%;
    color: ${p => p.color};
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    transition: all 0.5s ease;
    line-height: 24px;


    > .icon {
      filter: ${p => p.filter};
    }
  }
`

export const Cost = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 7px 18px;
  background: ${p => p.background};
  cursor: pointer;
  transition: all 0.5s ease;
  width: 100%;

  > .text {
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: space-between;
    width: 100%;
    color: ${p => p.color};
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    transition: all 0.5s ease;

    > .icon {
      filter: ${p => p.filter};
    }
  }
`

export const ChartBox = styled.div`
  position: relative;
  margin-top: 20px;

  .text {
    position: absolute;
    top: 53%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--primary-color);
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
  }
`