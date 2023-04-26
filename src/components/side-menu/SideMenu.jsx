import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { MenuItem } from "./MenuItem";
import { Toolbar } from "../Toolbar";
import { ToolbarElement } from "../ToolbarElement";

import Hamburger_icon from "../../assets/Hamburger_icon.svg";

export const SideMenu = ({ items, id, open, ...props }) => {

    return (
        <>
            {open && <SideMenuContainer id={id}>
                <MenuToolbar>
                    <StyledToolbarElement id="hamburger-side-menu" src={Hamburger_icon} alt="Hamburger menu icon" />
                    <h2>Chat</h2>
                </MenuToolbar>
                {items.map((item, index) => {
                    return (
                        <MenuItem
                            key={index}
                            method={item.method}
                            icon={item.icon}
                            text={item.text}
                        />
                    );
                })
                }
            </SideMenuContainer>}
        </>
    );
};

const SideMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-width: 300px;
    width: fit-content;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: #FFFFFF;
    scroll-behavior: none;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    overflow-y: auto;

    @media (max-width: 768px) {
        min-width: 200px;
`;

const MenuToolbar = styled(Toolbar)`
    margin-bottom: 20px;
    width: 100%;
    height: 50px;
    text-align: center;
    background-color: #FFFFFF;
    color: black;
    justify-content: center;
    position: absolute;
    top: 0;
`;

const StyledToolbarElement = styled(ToolbarElement)`
    background-color: #FFFFFF;
    position: absolute;
    left: 0px;
    `;