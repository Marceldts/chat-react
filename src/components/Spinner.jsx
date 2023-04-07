import React from "react";
import styled from "styled-components";
import Spinner_icon from "../assets/Spinner.svg";

export const Spinner = ({ loading, ...props }) => {
    return (
        <SpinnerContainer>
            <SpinnerLogo src={Spinner_icon} alt="Spinner carga" />
            <SpinnerText>Cargando...</SpinnerText>
        </SpinnerContainer>
    );
}

const SpinnerContainer = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 200px;
    top: 40%;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.5);
`;


const SpinnerLogo = styled.img`
    width: 50px;
    height: 50px;
`;

const SpinnerText = styled.p`
    font-size: 16px;
    font-weight: 600;
    color: #E2B4BD;
    `;