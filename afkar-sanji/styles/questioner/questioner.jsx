import {styled} from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  direction: rtl;
  
  > .close {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
`

export const QuestionBox = styled.div`
  width: 85vw;
  height: 90%;
  position: relative;
  padding: 40px;
`

export const ImageWallpaper = styled.img`
  position: absolute;
  bottom: 3rem;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  mix-blend-mode: multiply;
  z-index: -1;
`

export const AfterBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: var(--primary-color);
  z-index: -1;
  border-radius: 12px;
`


export const Header = styled.div`
  width: 100%;
  display: flex;
  //align-items: center;
  flex-direction: row;
  gap: 40px;
  padding-top: 20px;
  z-index: 2;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`

export const RightHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;


  > p {
    color: var(--questioner-text-white);
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px;
  }

  > h2 {
    color: var(--questioner-text-white);
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: 50px;
  }

  > .bottom {
    font-family: IRANSans;
    display: flex;
    max-width: fit-content;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    margin-top: 50px;
    border-radius: 2px;
    border: 1px solid var(--login-input-default-border);
  }

  @media screen and (max-width: 768px) {
    > .bottom {
      margin-top: 10px;
    }
  }
`

export const LeftHeader = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 33px;
  
  > li {
    display: flex;
    align-items: center;
    gap: 20px;
    
    > .text {
      color: var(--questioner-text-white);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 30px;
    }
    
  }
`

