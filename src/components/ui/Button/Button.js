import styled, { css } from 'styled-components';

export default styled.button`
    background-color: #FFFFFF;
    height: 40px;
    min-width: 100px;
    font-size: 18px;
    cursor: pointer;
    font-family: 'Shadows Into Light', cursive;
    border-radius: 20px;
    float: ${ props => props.float };
    border: 2px solid black;
    color: black;

    ${ props => props.variant === 'success' && css`
        color: #4BB543;
        border-color: #4BB543;
    `};

    ${ props => props.variant === 'danger' && css`
        color: #FF2323;
        border-color: #FF2323;
    `};
`;