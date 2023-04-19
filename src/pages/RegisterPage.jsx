import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { emailValidator, passwordValidator, photoValidator } from "../utils/Validators";
import { register, login } from "../utils/firebase-auth";
import { onEnter } from "../utils/enter-service";

export const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [photo, setPhoto] = useState('');
    const [photoError, setPhotoError] = useState('');
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
        validatePhoto(photo);
    }, [photo]);

    useEffect(() => {
        setValid(emailValidator(email) && passwordValidator(password) && (password === confirmedPassword) && username && photoValidator(photo));
    }, [email, password, confirmedPassword, username, photo]);

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
        } else if (password !== confirmedPassword && confirmedPassword !== '') {
            setPasswordError('Las contraseñas no coinciden');
        } else if (!passwordValidator(value)) {
            setPasswordError('La contraseña no es válida');
        } else {
            setPasswordError('');
        }
    }

    const validatePhoto = (value) => {
        if (value === '') {
            setPhotoError('');
        } else if (!photoValidator(value)) {
            setPhotoError('La foto no es válida');
        } else if (photo.size > 10000000) {
            setPhotoError('La foto es demasiado grande');
        } else if (photo.type.startsWith('image/') === false) {
            setPhotoError('El archivo no es una imagen');
        } else {
            setPhotoError('');
        }
    }

    function getPhoto(photo) {
        setPhoto(photo)
    }

    const onRegister = () => {
        if (!valid) return;
        try {
            register(email, password, username, photo)
                .then(() => {
                    login(email, password)
                })
                .then(() => {
                    navigate('/chat');
                })
        }
        catch (error) {
            alert("Ha habido un error al crear la cuenta. Por favor, vuelve a intentarlo en unos momentos.");
        }
    }

    return (
        <RegisterPageContainer>
            <h1>Crear una cuenta</h1>
            <StyledInput id="emailInput" placeholder="Correo electrónico" label="Email" type="email" error={emailError} onChange={(e) => setEmail(e.target.value)} defaultValue={email} onBlur={(e) => validateEmail(e.target.value)} onKeyDown={(e) => onEnter(e, onRegister)} />
            <StyledInput id="usernameInput" placeholder="Nombre de usuario" label="Nombre de usuario" type="text" error={usernameError} onChange={(e) => setUsername(e.target.value)} defaultValue={username} onKeyDown={(e) => onEnter(e, onRegister)} />
            <StyledFileInput
                id="photoInput"
                placeholder="Foto de perfil"
                label="Foto de perfil"
                type="file"
                error={photoError}
                defaultValue={null}
                photo={photo}
                sendPhoto={getPhoto}
                help={`La foto ha de ser de tipo png, jpg o jpeg y no puede pesar más de 10MB. La foto actual pesa ${photo ? (photo.size / 1000000).toFixed(2) : 0}MB. La foto ha de ser cuadrada para que se vea correctamente`}
            />
            <StyledInput id="passwordInput" help="La contraseña ha de tener 6 carácteres, así como 1 mayúscula, 1 minúscula y 1 número (como mínimo)" placeholder="Contraseña" label="Contraseña" type="password" error={passwordError} onChange={(e) => setPassword(e.target.value)} defaultValue={password} onBlur={(e) => validatePassword(e.target.value)} onKeyDown={(e) => onEnter(e, onRegister)} />
            <StyledInput id="confirmedPasswordInput" placeholder="Confirmar contraseña" label="Confirmar contraseña" type="password" error={passwordError} onChange={(e) => setConfirmedPassword(e.target.value)} defaultValue={confirmedPassword} onBlur={(e) => validatePassword(e.target.value)} disabled={password === ''} onKeyDown={(e) => onEnter(e, onRegister)} />
            <StyledButton label="Registrarme" onClick={onRegister} disabled={!valid} />
            <StyledButton label="Inicio de sesión" onClick={() => navigate("/login")} />
        </RegisterPageContainer>
    );
};

const StyledButton = styled(Button)`
    min-width: 200px;
`;

const StyledInput = styled(Input)`
    width: 600px;
`;

const RegisterPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;

    background-color: #E2B4BD;
`;

const getWidth = (photo) => photo ? '480px' : '600px';

const StyledFileInput = styled(Input)`
    width: ${props => getWidth(props.photo)};   
    object-fit: contain;
`;