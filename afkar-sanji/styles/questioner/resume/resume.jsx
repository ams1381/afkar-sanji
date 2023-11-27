// ant design
import {Input, Button,Steps,Select} from "antd";
// style
import {styled} from "styled-components";


export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 60vh;
  gap: 60px;
  position: relative;
  width: 1140px;
  max-width: 95%;
  margin: 50px auto;

  @media screen and (500px <= width <= 868px) {
    height: 90vh;
    margin: 0 auto;
  }

  @media screen and (max-width: 390px) {
    height: 90vh;
    margin: 0 auto;
  }

  & .container_box {
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    display: flex;
    margin-top: 120px;


    .head {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin-top: 180px;
      display: none;

      @media screen and (max-width: 868px) {
        display: flex;
      }
    }

  }


  @media screen and (max-width: 868px) {
    .container_box {
      flex-direction: column;
      margin-top: 0;
      height: 100vh;
    }
  }

  .ant-select-selector {
    border-radius: 2px !important;
  }
`

export const ContainerResumeIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 60vh;
  gap: 60px;
  position: relative;
  width: 1140px;
  max-width: 95%;
  margin: 50px auto;

  & .btnContainer {
    margin-right: 0;
    width: 100%;
    display: flex;
    justify-content: end;
    margin-top: 5rem;
    @media screen and (max-width: 686px) {
      display: none;
    }

    & .bottom {
      display: flex;
      padding: 0 15px;
      align-items: center;
      gap: 5px;
   
    }
  }


  @media screen and (max-width: 898px) {
    height: 70vh;
    margin: 0 auto;
  }

  & .container_box {
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    display: flex;
    margin-top: 120px;


    & .bottom_mobile_container {
      display: none;
      @media screen and (max-width: 686px) {
        margin-right: 0;
        width: 100%;
        display: flex;
        justify-content: end;
      }

      & .bottom_mobile {
        @media screen and (max-width: 686px) {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin-bottom: 20px;
          gap: 10px;
        }
      }
    }

    .head {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin-top: 180px;
      display: none;

      > .title {
        text-align: center;
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

      @media screen and (max-width: 898px) {
        display: flex;
      }
    }

  }


  @media screen and (max-width: 898px) {
    .container_box {
      flex-direction: column;
      height: 100vh;
    }
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
  
  @media screen and (max-width: 898px) {
    display: none;
  }
  

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
  
  @media screen and (max-width: 898px) {
    width: 50%;
  }
  @media screen and (max-width: 686px) {
    width: 100%;
  }
  
  & .ant-upload.ant-upload-select {
    width: 100%;
  }
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

export const BtnCom = styled(Button)`
  border-radius: 0px 2px 2px 0px;
  border-top: 1px solid var(--neutral-5, #D9D9D9);
  border-right: 1px solid var(--neutral-5, #D9D9D9);
  border-bottom: 1px solid var(--neutral-5, #D9D9D9);
  background: var(--neutral-2, #FAFAFA);
  height:40px;
  width:45px;
  display:flex;
  align-items:center;
  justify-content:center;
  line-height:42px;
  transform:rotate(180deg);
`

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
  width: 100% !important;
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

export const LoadingMaker = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;

  @media screen and (max-width: 470px) {
    display: none;
  }
`

export const LoadingMakerMobile = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;

  @media screen and (max-width: 470px) {
    display: flex;
  }
`


export const Row = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 1114px) {
    flex-wrap: wrap;
  }
  gap: 24px;
  width: 100%;
  direction: ${p => p.direction};
`

export const StepForm = styled(Steps)`
  position: fixed;
  max-width: fit-content;
  top: 20px;
  right: 20px;
  @media screen and (max-width: 1114px) {
    display: none !important;
  }
`

export const StepFormMobile = styled(Steps)`
  max-width: fit-content;
  display: none !important;
  @media screen and (max-width: 1114px) {
    display: inline-block !important;
    flex-wrap: nowrap;
    margin-top: 60px;
    margin-bottom: 20px;
  }
`

export const StepText = styled.span`
  text-align: right;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
`

export const FromStep = styled.form`
  width: 646px;
  max-width: 95%;
  margin-top: 50px;

  @media screen and (max-width: 1114px) {
    margin-top: -70px;
  }

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
  flex-wrap: wrap;
  flex-direction: ${p => p.flexDirection};
  gap: 12px;
  margin: 10px 0;

  > .css-dev-only-do-not-override-pr0fja {
    display: flex !important;
    padding: 20px !important;
    border-radius: 100% !important;
    width: 45px;
    height: 45px;
  }

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
  
  > .css-dev-only-do-not-override-pr0fja
  {
    display: flex !important;
    padding: 20px !important;
    border-radius: 100% !important;
    width: 45px;
    height: 45px;
  }
`

export const BtnComponent = styled(Button)`
  display: flex;
  padding: 15px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--login-input-default-border);
  background: #FFF;
  box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.06);
  cursor: pointer;
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
  margin-bottom: 9px;
  
  > .text {
    color: ${p => p.color} ;
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

export const ResumeActiveBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  border: 3px solid var(--primary-color);
  background: rgba(83, 96, 237, 0.05);
  backdrop-filter: blur(4px);
  position: absolute;
  z-index: 2;
  
  & .text {
    color: var(--primary-color);
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
  }
`