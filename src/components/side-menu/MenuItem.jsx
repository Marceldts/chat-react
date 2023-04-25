import React from "react";
import styled from "styled-components";

export const MenuItem = ({ method, icon, text, ...props }) => {
    return (
        <MenuItemContainer onClick={method}>
            <MenuItemText>{text}</MenuItemText>
            <MenuItemIcon src={icon} alt={`${text}`} />
        </MenuItemContainer>
    );
}

const MenuItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 40px;
    cursor: pointer;
    margin-bottom: 10px;
    &:hover {
        background-color: #F2F2F2;
    };
    gap: 10px;
`;

const MenuItemIcon = styled.img`
    height: 20px;
    width: 20px;
    object-fit: contain;
    margin-right: 10px;
`;

const MenuItemText = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: #333333;
    margin-left: 10px;
`;
