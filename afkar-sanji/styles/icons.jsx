import { styled } from "styled-components";

export const Icon = styled.i`
    background : url(/Icons/${p => p.name}.svg) no-repeat;
    background-size : cover;
    width : 18px;
    height : 17px;
    display : block;
    background-position: center;
    background-size: contain;
`