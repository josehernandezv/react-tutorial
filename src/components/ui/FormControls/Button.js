import styled, { css } from 'styled-components';

export default styled.button`
    /* background-color: #40EEBB; */
    background-image: linear-gradient(to right, #40EEBB , #32CCBC );
    color: #FFFFFF;
    width: 176px;
    height: 40px;
    font-size: 24px;
    cursor: pointer;
    font-family: 'Shadows Into Light', cursive;
    border-radius: 8px;
    border: none;

    ${ props => props.disabled && css`
        background-color: #D3D3D3;
        background-image: none;
        color: #7e7e7e;
    `};

`;