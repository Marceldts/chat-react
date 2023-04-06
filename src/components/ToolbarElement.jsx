import React from "react";
import styled from "styled-components";

export const ToolbarElement = ({ children, ...props }) => {
    return <ToolbarElementContainer {...props} src={props.src} alt={props.alt} valid={props.valid} />;
}

const ToolbarElementContainer = styled.img`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #E2B4BD;
    background-color: #413C58;
    height: 30px;
    margin: 10px;

    &:hover {
        cursor: ${props => !props.valid || props.valid === false ? 'pointer' : 'not-allowed'};
    }

    border: none;
`;