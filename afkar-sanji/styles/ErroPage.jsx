const { styled } = require("styled-components");

export const ErrorPageTitle = styled.h1`
    color: var(--primary-color);
    font-family: Gilory;
    font-weight: bolder;
    font-size: 10rem;
    -webkit-text-stroke: 11.5px var(--primary-color);
    text-align: center;
    letter-spacing: 9px;
`
export const ErrorContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 32%;
    height: 60%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: IRANSans;
    justify-content: center;
    color : var(--Neutral-Gray9);

    & button
    {
        font-family: 'IRANSANS';
        margin-top: 1rem;
        border-radius: 2px;
    }
`