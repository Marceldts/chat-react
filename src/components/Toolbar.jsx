import React from "react";
import styled from "styled-components";

export const Toolbar = ({ children, ...props }) => {
    return (
        <ToolbarContainer {...props}>{children}</ToolbarContainer>
    );
};

const ToolbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #E2B4BD;
    background-color: #413C58;
    width: 100%;
    height: 50px;
    z-index: 1;
`;