import React from 'react';
import styled from 'styled-components';

const LI = styled.li`
    color: #FF2323;
    float: left;
`;

const errors = props => (
    <ul>
        { props.data.map(item => (
            <LI key={ item.message }>{ item.message }</LI>
        ))}
    </ul>
);

export default errors;