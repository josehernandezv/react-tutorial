import styled, { css } from 'styled-components';

export default styled.button`
    background-color: #FFFFFF;
    height: 40px;
    min-width: 100px;
    font-size: 18px;
    cursor: pointer;
    font-family: 'Shadows Into Light', cursive;
    border-radius: 20px;
    border: 2px solid black;
    color: black;
    float: ${ props => props.float };
    
    ${ props => props.variant === 'success' && css`
        border-color: green;
        color: green;
    `}

    ${ props => props.variant === 'danger' && css`
        border-color: red;
        color: red;
    `}
`;