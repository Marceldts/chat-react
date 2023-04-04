import React, { useLayoutEffect } from "react";
import styled from "styled-components";

import { useNavigate } from 'react-router-dom';
import { ToolbarElement } from "../components/ToolbarElement";
import { useEffect, useState } from "react";
import { logout } from "../utils/firebase-auth";

import { Button } from "../components/Button";
import { Toolbar } from "../components/Toolbar";
import { Input } from "../components/Input";
import { Message } from "../components/Message";

import Hamburger from "../assets/Hamburger_icon.svg";
import Logout from "../assets/Logout_icon.svg";
import Send from "../assets/Send_icon.svg";
import Camera from "../assets/Camera_icon.svg";


export const ChatPage = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(null);
    const [valid, setValid] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [photo, setPhoto] = useState('');

    const navigate = useNavigate();

    useLayoutEffect(() => {
        document.title = 'Chat';
        setMessages([{
            message: "Hola, soy un mensaje de prueba",
            displayName: "Usuario de prueba",
            photo: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
            time: "12:00",
            type: "text",
            own: false
        }, {
            message: "Hola, soy un mensaje de prueba",
            displayName: "Usuario de prueba",
            photo: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
            time: "12:00",
            type: "text",
            own: true
        }, {
            message: "Hola, soy un mensaje de prueba",
            displayName: "Usuario de prueba",
            photo: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
            time: "12:00",
            type: "text",
            own: false
        }, {
            message: "Hola, soy un mensaje de prueba",
            displayName: "Usuario de prueba",
            photo: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
            time: "12:00",
            type: "text",
            own: true
        }, {
            message: "Hola, soy un mensaje de prueba",
            displayName: "Usuario de prueba",
            photo: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
            time: "12:00",
            type: "text",
            own: false
        }, {
            message: "Hola, soy un mensaje de prueba",
            displayName: "Usuario de prueba",
            photo: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
            time: "12:00",
            type: "text",
            own: true
        }, {
            message: "Hola, soy un mensaje de prueba",
            displayName: "Usuario de prueba",
            photo: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
            time: "12:00",
            type: "text",
            own: false
        }, {
            message: "Hola, soy un mensaje de prueba",
            displayName: "Usuario de prueba",
            photo: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
            time: "12:00",
            type: "text",
            own: true
        }, {
            message: "Hola, soy un mensaje de prueba",
            displayName: "Usuario de prueba",
            photo: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
            time: "12:00",
            type: "text",
            own: false
        }, {
            message: "Hola, soy un mensaje de prueba",
            displayName: "Usuario de prueba",
            photo: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
            time: "12:00",
            type: "text",
            own: true
        }])
    }, []);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            //TO DO: Reemplazar por navigate('/login') cuando tenga bien configurado el auth
            console.log("Oye chaval si ves este log tienes algo mal porque no existe usuario en session storage")
        }
        setUser(user);
    }, []);

    useEffect(() => {
        if (!user) return;
        setDisplayName(user.displayName);
        setPhoto(user.photoURL);
    }, [user]);

    useEffect(() => {
        setValid(message !== '');
    }, [message]);

    const onMenuClicked = () => {
        alert("Hola");
    }

    const onSend = () => {
        if (!valid) {
            return;
        }
        alert(message)
        setMessage('');
    }



    const onLogout = () => {
        if (!window.confirm("¿Estás seguro que quieres cerrar sesión?")) {
            return;
        }
        logout().then(() => navigate('/'));
    }
    return (
        <ChatPageContainer>
            <HeaderToolbar>
                <ToolbarElement id="hamburger-menu" src={Hamburger} alt="Hamburger menu icon" onClick={onMenuClicked} />
                <h2>Chat</h2>
                <ToolbarElement id="logout" src={Logout} alt="Logout icon" onClick={onLogout} />
            </HeaderToolbar>
            <MessagesContainer>

                {messages.map((message, index) => {
                    return (
                        <Message
                            key={index}
                            message={message.message}
                            displayName={message.displayName}
                            photo={message.photo}
                            time={message.time}
                            type={message.type}
                            own={message.own}
                        />
                    )
                })}
            </MessagesContainer>
            <FooterToolbar>
                <StyledToolbarElement src={Camera} alt="Take picture icon" />
                <StyledInput placeholder="Mensaje" value={message} onChange={(e) => setMessage(e.target.value)} />
                <StyledToolbarElement src={Send} alt="Send message icon" onClick={onSend} valid={valid} />
            </FooterToolbar>
        </ChatPageContainer>
    );
};

const ChatPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: #E2B4BD;
`;

const HeaderToolbar = styled(Toolbar)`
    position: fixed;
    top: 0;
    height: 50px;
    margin-bottom: 20px;
`;
const StyledInput = styled(Input)`
    height: 100%;
    padding: 10px 20px;
    border: none;
    background-color: #E2B4BD;
    width: calc(100vw - 200px);
    cursor: revert;
    `;

const FooterToolbar = styled(Toolbar)`
    position: fixed;
    bottom: 0;
`;

const StyledToolbarElement = styled(ToolbarElement)`
    margin-left: 20px;
    margin-right: 20px;
    &:hover {
        cursor: ${props => props.valid === true ? 'pointer' : 'not-allowed'};
    }
`;

const MessagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: #E2B4BD;
    width: 100%;
    height: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
    `;
