import {styled} from "styled-components";
// antd
import {Button} from 'antd'


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const WalletHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
`

export const Refresh = styled(Button)`
  display: flex;
  max-width: fit-content;
  max-height: fit-content;
  padding: 18px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  border-radius: 2px;
  border: 1px solid  var(--login-input-default-border);
  background: var(--surface);
  box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.06);
`

export const Title = styled.h2`
  color:  #1D1D1D;
  text-align: right;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 50px; /* 166.667% */
`

export const WalletContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  gap: 24px;


  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`