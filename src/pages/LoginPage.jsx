import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { emailValidator, passwordValidator } from "../utils/Validators";
import { login } from "../utils/firebase-auth";
import { onEnter } from "../utils/enter-service";

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

    const onLogin = async () => {
        login(email, password).then(() => {
            navigate("/chat");
        }).catch((error) => {
            if (error.code === 'auth/user-not-found') {
                setEmailError('El correo electrónico no está registrado');
            } else if (error.code === 'auth/wrong-password') {
                setPasswordError('La contraseña no es válida');
            }
        });
    }

    return (
        <LoginPageContainer>
            <h1>Iniciar sesión</h1>
            <StyledInput id="emailInput" placeholder="Correo electrónico" label="Email" type="email" error={emailError} onChange={(e) => setEmail(e.target.value)} value={email} onBlur={(e) => validateEmail(e.target.value)} onKeyDown={(e) => onEnter(e, login)} />
            <StyledInput id="passwordInput" placeholder="Contraseña" label="Contraseña" type="password" error={passwordError} onChange={(e) => setPassword(e.target.value)} value={password} onBlur={(e) => validatePassword(e.target.value)} onKeyDown={(e) => onEnter(e, login)} />
            <StyledButton label="Iniciar sesión" onClick={onLogin} disabled={!valid} />
            <StyledButton label="Registrarme" onClick={() => navigate("/register")} />
        </LoginPageContainer>
    );
};

const StyledButton = styled(Button)`
    min-width: 200px;
`;
const StyledInput = styled(Input)`
    min-width: 600px;
    @media (max-width: 768px) {
      min-width: 300px;
      font-size: 14px;
    }
`;

const LoginPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;

    background-color: #E2B4BD;
`;