import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import { Button } from "../components/Button";
import { useNavigate } from 'react-router-dom';
import Spinner from "../assets/Spinner.svg";
import { useEffect } from "react";


export const HomePage = () => {
    const navigate = useNavigate();

    useLayoutEffect(() => {
        document.title = 'Inicio';
    }, []);
    return (
        <HomePageContainer>
            <h1>¡Bienvenido a este chat!</h1>
            <StyledButton label="Iniciar sesión" onClick={() => navigate('/login')} />
            <StyledButton label="Registrarme" onClick={() => navigate('/register')} />
        </HomePageContainer>
    );
};

const StyledButton = styled(Button)`
    min-width: 200px;
`;

const HomePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    background-color: #E2B4BD;
`;