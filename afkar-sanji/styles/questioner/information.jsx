import {styled} from "styled-components";
import {Input, Select} from "antd";
const { TextArea } = Input;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 10px;

  & .skeleton {
    margin-top: 50px;
  }
`

export const Title = styled.h2`
  color:  #525252;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px; 
  margin-top: 60px;
  margin-bottom: 40px;
`


export const Form = styled.form`
  display: flex;
  padding: 40px;
  width: 538px;
  max-width: 95%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid #D9D9D9;
  background: #FEFEFE;
  gap: 24px;
`


export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
  direction: ${p => p.direction};
`

export const FromItem = styled.div`
  width: 100% !important;

  > .title {
    color: var(--Neutral-Gray9);
    font-size: 16px;
    margin-bottom: 4px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px;

    @media screen and (max-width: 768px) {
      font-size: 12px;
    }
  }

  & .ant-select-selector {
    border-radius: 2px !important;
  }

`

export const TextAreaCom = styled(TextArea)`
  display: flex;
  padding: 8px 16px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  font-family: 'IRANSans';
  border-radius: 2px;
  border: 1px solid var(--login-input-default-border);
  background:  #FFF;
  direction: ${p => p.direction};
`


