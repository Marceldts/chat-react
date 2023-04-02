import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { emailValidator, passwordValidator } from "../utils/Validators";

export const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [valid, setValid] = useState(false);

    const navigate = useNavigate();

    useLayoutEffect(() => {
        document.title = 'Registro';
    }, []);

    useEffect(() => {
        setValid(emailValidator(email) && passwordValidator(password));
    }, [email, password]);

    const validateEmail = (value) => {
        setEmail(value);
        if (value === '') {
            setEmailError('');
        } else if (!emailValidator(value)) {
            setEmailError('El correo electrónico no es válido');
        } else {
            setEmailError('');
        }
    }

    const validatePassword = (value) => {
        if (value === '') {
            setPasswordError('');
        } else if (!passwordValidator(value)) {
            setPasswordError('La contraseña no es válida');
        } else if (password !== confirmedPassword && confirmedPassword !== '') {
            setPasswordError('Las contraseñas no coinciden');
        }
        else {
            setPasswordError('');
        }
    }

    return (
        <RegisterPageContainer>
            <h1>¡Bienvenido a este chat!</h1>
            <StyledInput id="emailInput" placeholder="Correo electrónico" label="Email" type="email" error={emailError} onChange={(e) => setEmail(e.target.value)} value={email} onBlur={(e) => validateEmail(e.target.value)} />
            <StyledInput id="passwordInput" placeholder="Contraseña" label="Contraseña" type="password" error={passwordError} onChange={(e) => setPassword(e.target.value)} value={password} onBlur={(e) => validatePassword(e.target.value)} />
            <StyledInput id="confirmedPasswordInput" placeholder="Confirmar contraseña" label="Confirmar contraseña" type="password" error={passwordError} onChange={(e) => setConfirmedPassword(e.target.value)} value={confirmedPassword} onBlur={(e) => validatePassword(e.target.value)} />

            <StyledButton label="Registrarme" onClick={() => navigate('/chat')} disabled={!valid} />
            <StyledButton label="Inicio de sesión" onClick={() => navigate('/login')} />
        </RegisterPageContainer>
    );
};

const StyledButton = styled(Button)`
    min-width: 200px;
`;

const StyledInput = styled(Input)`
    min-width: 600px;
`;

const RegisterPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    background-color: #E2B4BD;
`;