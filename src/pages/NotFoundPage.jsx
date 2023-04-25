import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import { Button } from "../components/Button";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";


export const NotFoundPage = () => {
    const navigate = useNavigate();

    useLayoutEffect(() => {
        document.title = '404 - La página a la que intentabas acceder no existe';
    }, []);
    return (
        <NotFoundPageContainer>
            <h2>Parece que la ruta a la que intentabas acceder no existe 😓</h2>
            <h3>Puedes probar a ir a alguna de las siguientes páginas:</h3>
            <StyledButton label="Iniciar sesión" onClick={() => navigate('/login')} />
            <StyledButton label="Registrarme" onClick={() => navigate('/register')} />
        </NotFoundPageContainer>
    );
};

const StyledButton = styled(Button)`
    min-width: 200px;
`;

const NotFoundPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;

    @media (max-width: 768px) {
        padding: 0 20px;
    }
`;