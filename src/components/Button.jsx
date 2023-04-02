import React from "react";
import styled from "styled-components";

export const Button = ({ children, ...props }) => {
    return <ButtonContainer {...props}>{props.label}{children}</ButtonContainer>;
}

const ButtonContainer = styled.button`
    padding: 10px 20px;
    margin: 10px;
    border: none;
    border-radius: 5px;
    background-color: ${({ disabled }) => disabled ? '#ccc' : '#413C58'};
    color: ${({ disabled }) => disabled ? '#888' : '#E2B4BD'};
    font-size: 16px;
    font-weight: 600;
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};

    transition: all 0.3s ease;
    transform: scale(1);
    &:hover {
        transform: ${({ disabled }) => disabled ? 'none' : 'scale(1.1)'};
        background-color: ${({ disabled }) => disabled ? '#ccc' : '#524B69'};
        color: ${({ disabled }) => disabled ? '#888' : '#EFE1E6'};
    }
`;