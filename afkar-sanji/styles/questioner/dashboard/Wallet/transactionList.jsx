import {styled} from "styled-components";

export const TransactionContainer = styled.div`
  width: 33%;
  height: 60vh;

    @media screen and (max-width:768px) {
    width: 100%;
  }

  & .transactioContainer {
    margin-top: 24px;
    max-height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    &::-webkit-scrollbar{
      display: none;
    }
  }
`

export const FilterParent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  
  & .rmdp-container {
    width: 100%;
  }
`

