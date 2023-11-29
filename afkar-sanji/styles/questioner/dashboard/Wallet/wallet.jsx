import {styled} from "styled-components";
// antd
import {Button} from 'antd'


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const ModalContainer = styled.div`
  & .ant-modal-content {
    text-align: center;
    padding: 12px;
    direction: rtl;
  }

  & .modal_title {
    color: var(rgba(0, 0, 0, 0.85));
    text-align: center;
    font-family: IRANSans;
    font-size: 16px;
    line-height: 30px;
  }

  & .anticon.anticon-close.ant-modal-close-icon {
    display: none;
  }


  & .bodyOfWalletModal {
    margin: 22px 0;

    & .head {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;

      & .icon {
        font-size: 14px;
      }

      & .input {
        direction: ltr;
        width: 96px;
        height: 42px;
        border-radius: 2px;
        text-align: center;
        font-family: IRANSans;

        & .ant-input.css-dev-only-do-not-override-pr0fja {
          text-align: center;
        }
      }
    }

    & .body {
      & .title {
        padding: 10px 0;
        color: var(--Neutral-Gray6);
        text-align: center;
        font-family: IRANSans;
        font-size: 12px;
      }

      & .offers {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
    }
  }
`

export const WalletHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;

  @media screen and (max-width: 768px) {
    width: 95%;
  }

  @media screen and (max-width: 768px) {
    & .wallet_head_btn {
      & .text {
        display: none;
      }
    }
  }

`

export const Refresh = styled(Button)`
  display: flex;
  max-width: fit-content;
  max-height: fit-content;
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 2px;
  border: 1px solid  var(--login-input-default-border);
  background: var(--surface);
  box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.06);
`

export const Title = styled.h2`
  color: #1D1D1D;
  text-align: right;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 50px; /* 166.667% */

  @media screen and (max-width: 400px) {
    font-size: 20px;
  }
`

export const WalletContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  gap: 24px;
  margin-top: 50px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    width: 95%;
    margin-bottom: 80px;
  }

`