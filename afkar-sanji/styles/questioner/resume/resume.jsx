// ant design
import {Input, Button,Steps,Select} from "antd";
// style
import {styled} from "styled-components";


export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 60vh;
  gap: 60px;
  margin-top: 50px;
  position: relative;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

  .ant-select-selector {
    border-radius: 2px !important;
  }
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 80px;

  > .title {
    color: var(--Neutral-Gray9);
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px;
  }

  > .caption {
    color: var(--Error-color);
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
  }
`

export const ResumeBox = styled.div`
  transform: scale(${p => p.scale});
  background: var(--surface);
  width: 331px;
  height: 182px;
  padding: ${p => p.padding ? '24px' : '0'};
  border-radius: 6px;
`

export const ResumeBg = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background: var(--questioner-text-white);
  overflow: hidden !important;
  position: absolute;
  z-index: -1;

  > .one, .two, .three, .four, .five {
    position: absolute;
    flex-shrink: 0;
    background: transparent;
    top: 50%;
    border-radius: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.1;
  }

  > .one {
    width: 261px;
    height: 261px;
    border: 7px solid rgba(83, 96, 237, 0.46);
  }

  > .two {
    width: 223.714px;
    height: 223.714px;
    border: 6px solid rgba(83, 96, 237, 0.38);
  }

  > .three {
    width: 186.429px;
    height: 186.429px;
    border: 6px solid rgba(83, 96, 237, 0.29);
  }

  > .four {
    width: 149.143px;
    height: 149.143px;
    border: 6px solid rgba(83, 96, 237, 0.2);
  }

  > .five {
    width: 111.857px;
    height: 111.857px;
    border: 6px solid rgba(83, 96, 237, 0.2);
  }
`

export const Email = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  > .icon {
    margin: 0 auto;
    text-align: center;
    display: flex;
  }

  .email {
    > .title {
      text-align: right;
      color: var(--Neutral-Gray9);
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 30px;
      margin-bottom: 4px;
    }
  }
`

export const InputCom = styled(Input)`
  font-family: 'IRANSans';
  display: flex;
  padding: 8px 12px;
  align-items: center;
  gap: 4px;
  flex: 1 0 0;
  border-radius: 2px;
  border: 1px solid var(--login-input-default-border);
  background: #FFF;
  direction: ${p => p.direction};
`

// resume
export const CreateResume = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  > .button {
    padding: 24px;
  }

  .resume {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 24px;

    > .title {
      text-align: center;
      color: var(--Neutral-Gray9);
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 30px;
      margin-bottom: 4px;
    }

    > .caption {
      color: var(--Neutral-Gray9);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 30px;
    }
  }
`

// uploader
export const Uploader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

export const UploaderHeader =  styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  
  > .title {
    color: var(--Neutral-Gray9);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px; 
  }
  
  > .fileSize {
    color: var(--Neutral-Gray9);
    font-family: "IRANSans";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px; 
  }
`

export const ButtonUploader = styled(Button)`
  display: flex;
  width: 283px;
  padding: 19px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 2px;
  border: 1px solid var(--login-input-default-border);
  background: #FFF;

  /* drop-shadow/button-secondary */
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
  
 > .text {
  color: var(--Neutral-Gray9);
  text-align: right;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}
`


// make page
export const MakeHead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 20px;

  .title {
    color: var(--Neutral-Gray9);
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: 50px;
  }

  > .caption {
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`

export const StepForm = styled(Steps)`
  position: fixed;
  max-width: fit-content;
  top: 20px;
  right: 20px;
`

export const StepText = styled.span`
  text-align: right;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
`

// step
export const FromStep = styled.form`
  width: 646px;
  margin-top: 50px;
  
  > .title {
    color: #000;
    text-align: right;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px;
    margin-bottom: 12px;
  }
`

export const FromStepScroll = styled.div`
  width: 100%;
  max-height: 300px;

  overflow: auto;
  &::-webkit-scrollbar{
    display: none;
  }
`

export const FromResumeItem = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: ${p => p.flexDirection};
  gap: 12px;
  margin: 10px 0;

  > .close {
    display: flex;
    padding: 15px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--login-input-default-border);
    background: #FFF;
    box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.06);
    cursor: pointer;
  }
`

export const RowCom = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin: 10px 0;
  width: 100%;
  > .close {
    display: flex;
    padding: 15px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--login-input-default-border);
    background: #FFF;
    box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.06);
    cursor: pointer;
  }
`

export const ButtonContainer = styled.div
`
  display: flex;
  align-items: center;
  justify-content: ${p => p.justify};
`

export const AddBtn = styled(Button)`
  display: flex;
  height: 36px;
  padding: 4px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 2px;
  border: 1px solid  #D9D9D9;
  background:  #FFF;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
  margin-top: 24px;
  
  > .text {
    color: var(--primary-color);
    text-align: right;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; 
  }
  
`

export const ResumeInputCom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1 0 0;
  width: 100%;

  > .title {
    color: #000;
    text-align: right;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
`

// step
