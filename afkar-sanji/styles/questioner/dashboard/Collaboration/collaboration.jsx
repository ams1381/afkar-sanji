import {styled} from "styled-components";
import {QuestionerContentBox} from "@/styles/common";

export const Container = styled(QuestionerContentBox)`
  width: 84%;
  display: flex;
  flex-direction: column-reverse;
`

export const Collaboration = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }

  @media screen and (max-width: 550px) {
    width: 100%;
  }

  @media screen and (max-width: 450px) {
    width: 100%;
  }

  & .ant-tabs-nav-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: IRANSans;

    & .ant-tabs-tab-btn {
      font-size: 14px;
    }
  }
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
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;


  .infinite-scroll-component__outerdiv {
    width: 100%;

  }

  .infinite-scroll-component {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }

  & #scrollableDiv::-webkit-scrollbar {
    display: none;
  }
`


export const CollaborationItem = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  flex-direction: column;
  border-radius: var(--radius-XS, 2px);
  background: var(--surface);
  cursor: pointer;

  & .user_data {
    & .user_data_container {
      & .name {
        position: relative;
        color: #999;

        &::after {
          position: absolute;
          content: '';
          width: 6px;
          height: 6px;
          background: ${p => p.isActive ? 'var(--primary-color)' : 'var(--Error-color)'};
          top: 40%;
          left: -12px;
          clip-path: circle();
        }
      }
    }
  }
`
export const CollaborationHeaderTopPart = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  color: var(--Neutral-Gray9);

  & .title_container {
    & .title {
      font-size: 20px;
      @media screen and (max-width: 768px) {
        font-size: 14px;
      }
    }
  }


`
export const CollaborationResultButton = styled.div`
  display: flex;
  padding: 0px 7px;
  align-items: center;
  color: var(--primary-color);
  font-size: 14px;
  gap: 10px;
`
export const AddResultButton = styled.button`
  border-radius: var(--radius-XS, 2px);
  border: 1px solid var(--Outline, #D9D9D9);
  background: var(--Surface, #FEFEFE);
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
  display: flex;
  height: 34px;
  align-items: center;
  width: 34px;
  overflow: hidden;
  transition: 0.3s;
  flex-direction: row-reverse;
  cursor: pointer;

  &:hover {
    width: 100%;
    transition: 0.5s;
    border: 1px solid var(--primary-color);
  }

  &:hover i {
    filter: invert(37%) sepia(74%) saturate(1045%) hue-rotate(210deg) brightness(91%) contrast(105%);
  }
`
export const AddResultButtonContainer = styled.div`
  width: 34px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;


`
export const CollaborationItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex: 1 0 0;
  border-radius: var(--radius-XS, 2px);
  background: var(--surface);
  cursor: pointer;
  width: 100%;
`

export const TabSection = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: inline-block;
  }
`

export const CollaborationResult = styled.div`
  width: 100%;
  margin: 10px 0;
`


export const CollaborationItemRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  direction: rtl;
  width: 100%;


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
    opacity: 0.8;
  }

  @media screen and (max-height: 768px) {
    > .caption {
      font-size: 13px;
    }

    // &::before {
    //   position: absolute;
    //   content: '';
    //   width: 6px;
    //   height: 6px;
    //   border-radius: 100px;
      //   background: ${p => p.color};
    //   border: none;
    //   outline: none;
    //   left: -10px;
    // }
  }
`

export const CollaborationItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 17px;
  width: 100%;

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

export const ModalContainer = styled.div`
  > .ant-modal-content {
    padding: 0;


    > .ant-modal-close {
      top: 1.8rem;
    }
  }
`

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px;
  align-items: center;
  align-self: stretch;
  box-shadow: 0px -1px 0px 0px #F0F0F0 inset;
  width: 96%;

  & .name {
    color: #525252;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px;
    margin-right: 10px;
  }
`

export const ModalBody = styled.div`
  max-height: 400px;
  overflow: auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: .6rem;
`

export const GetResult = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  direction: rtl;

  > .title {
    color: var(--Neutral-Gray9);
    text-align: right;
    font-family: 'IRANSans';
    font-size: 16px;
    font-style: normal;
    font-weight: 900;
    line-height: 30px;
  }

  > .data {
    color: var(--Neutral-Gray9);
    text-align: right;
    font-family: IRANSansX;
    font-size: 16px;
    font-style: normal;
    font-weight: 900;
    line-height: 30px;
  }

  @media screen and (max-height: 768px) {
    > .title {
      font-size: 13px;
    }

    > .data {
      font-size: 13px;
    }
  }
`

export const Level = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  direction: rtl;
  width: 100%;
  justify-content: flex-end;

  > .title {
    color: var(--primary-color);
    text-align: right;
    font-family: IRANSans;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }

  & img {
    width: 14px;
    height: 18px;
  }
`

export const ColumnOfData = styled(GetResult)`
  > .title {
    font-weight: 400;
    opacity: 0.8;
  }

  > .data {
    font-weight: 400;
    opacity: 0.8;
  }

  @media screen and (max-height: 768px) {
    & .title {
      font-size: 13px;
    }

    > .data {
      font-size: 13px;
    }
  }
`


export const CollapseTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  color: var(--Neutral-Gray9);
  text-align: right;
  font-family: IRANSans;
  font-size: 16px;
  font-style: normal;
  font-weight: 900;
  line-height: 30px;
  margin-top: .8rem;
`

export const CollapseItem = styled.div`
  display: flex;
  padding: 12px 24px;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  align-self: stretch;
  box-shadow: 0px -1px 0px 0px #F0F0F0 inset;

  > .text {
    color: var(--Neutral-Gray9);
    font-family: IRANSans;
    font-size: 12px;
    font-style: normal;
    font-weight: 300;
    line-height: 24px;
  }
`

export const ModalBtnParent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: .3rem;
  gap: 10px;
  border-radius: var(--radius-XS, 2px);
  border: 1px solid var(--login-confirm-btn-border);
  padding-top: .1rem;
  padding-bottom: .1rem;
  margin-top: 10px;

  > .chat {
  }

  > img {
    width: 100%;
    height: 100%;
  }
`


export const AddBtnContainer = styled.div`
  margin-top: -2rem;

  > .ant-btn.css-dev-only-do-not-override-pr0fja.ant-btn-default.addBtn {
    display: flex;
    gap: 17px;
    direction: rtl;
    width: 34px;
    overflow: hidden;
    transition: all .8s ease;
    padding: 8.5px;
    align-items: center;

    &:hover {
      padding: 10px;
      width: 130px;
      gap: 10px;
    }
  }
`