import {styled} from "styled-components";
import {Input, Select} from "antd";
const { TextArea } = Input;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  margin-bottom: 80px;
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
    font-style: normal;
    font-weight: 500;
    line-height: 30px; 
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


