import React from "react";
import styled from "styled-components";
import { MenuItem } from "./MenuItem";

export const SideMenu = ({ items, id, onClick, ...props }) => {

    return (
        <SideMenuContainer id={id} onClick={onClick}>
            <h2>Menu</h2>
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
        </SideMenuContainer>
    );
};

const SideMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: fit-content;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: #FFFFFF;
    scroll-behavior: none;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
`;