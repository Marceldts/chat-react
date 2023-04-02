import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { emailValidator, passwordValidator } from "../utils/Validators";

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [valid, setValid] = useState(false);

    const navigate = useNavigate();

    useLayoutEffect(() => {
        document.title = 'Inicio de sesión';
    }, []);

    useEffect(() => {
        setValid(emailValidator(email) && passwordValidator(password));
    }, [email, password]);

    const login = () => {
        if (emailValidator(email) && passwordValidator(password)) {
            navigate('/chat');
        } else {
            if (!emailValidator(email)) {
                setEmailError('El correo electrónico no es válido');
            }
            if (!passwordValidator(password)) {
                setPasswordError('La contraseña no es válida');
            }
        }
    }

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
        setPassword(value);
        if (value === '') {
            setPasswordError('');
        } else if (!passwordValidator(value)) {
            setPasswordError('La contraseña no es válida');
        } else {
            setPasswordError('');
        }
    }

    return (
        <LoginPageContainer>
            <h1>Iniciar sesión</h1>
            <StyledInput id="emailInput" placeholder="Correo electrónico" label="Email" type="email" error={emailError} onChange={(e) => setEmail(e.target.value)} value={email} onBlur={(e) => validateEmail(e.target.value)} />
            <StyledInput id="passwordInput" help="Como sea esto me mato" placeholder="Contraseña" label="Contraseña" type="password" error={passwordError} onChange={(e) => setPassword(e.target.value)} value={password} onBlur={(e) => validatePassword(e.target.value)} />
            <StyledButton label="Iniciar sesión" onClick={login} disabled={!valid} />
            <StyledButton label="Registrarme" onClick={() => navigate('/register')} />
        </LoginPageContainer>
    );
};

const StyledButton = styled(Button)`
    min-width: 200px;
`;
const StyledInput = styled(Input)`
    min-width: 600px;
`;

const LoginPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    background-color: #E2B4BD;
`;