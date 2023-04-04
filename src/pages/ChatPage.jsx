import React, { useLayoutEffect } from "react";
import styled from "styled-components";

import { useNavigate } from 'react-router-dom';
import { ToolbarElement } from "../components/ToolbarElement";
import { useEffect, useState, useRef } from "react";
import { logout } from "../utils/firebase-auth";
import { getMessagesFromDatabase, addMessageToDatabase } from "../utils/message-service";

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
    const bottomPageRef = useRef(null);


    useLayoutEffect(() => {
        document.title = 'Chat';
    }, []);

    useEffect(() => {
        const messagesArray = [];
        getMessagesFromDatabase().then((messages) => {
            Object.entries(messages).forEach(([key, value]) => {
                messagesArray.push(value);
            });
            // setMessages(messages);
            setMessages(messagesArray);
        });
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

    useEffect(() => {
        if (!bottomPageRef.current) return;
        bottomPageRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [messages]);

    const onMenuClicked = () => {
        alert("Hola");
    }

    const onSend = () => {
        if (!valid) {
            return;
        }
        const date = new Date();
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const time = hours + ":" + minutes;
        const messageObject = {
            message: message,
            displayName: "fulanito",
            photo: "fotichuela",
            time: time,
            type: 'text',
            author: "ese soy yo"
        }
        const newMessages = [...messages, messageObject];
        addMessageToDatabase(messageObject);
        setMessages(newMessages);
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
            <MessagesContainer >
                {messages.map((message, index) => {
                    return (
                        <Message
                            key={index}
                            message={message.message}
                            displayName={message.displayName}
                            photo={message.photo}
                            time={message.time}
                            type={message.type}
                            own={message.author === ''}
                        />
                    )
                })}
            </MessagesContainer>
            <FooterToolbar>
                <StyledToolbarElement src={Camera} alt="Take picture icon" />
                <StyledInput placeholder="Mensaje" value={message} onChange={(e) => setMessage(e.target.value)} autoComplete="new-password" />
                <StyledToolbarElement src={Send} alt="Send message icon" onClick={onSend} valid={valid} end />
            </FooterToolbar>
            <div ref={bottomPageRef} style={{ height: '0px' }} />
        </ChatPageContainer>
    );

    // We use auto-complete="new-password" to avoid that the browser suggests the last message sent (edge stills suggests it with autocomplete="off")
};

const ChatPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;

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
    margin: 10px;
    border: none;
    background-color: #E2B4BD;
    width: calc(100vw - 175px);
    cursor: revert;
    `;

const FooterToolbar = styled(Toolbar)`
    position: fixed;
    bottom: 0;
`;

const StyledToolbarElement = styled(ToolbarElement)`
    height: 30px;
    margin-right: ${props => props.end ? '20px' : '0px'};
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
    min-height: calc(100vh - 100px);
    padding-top: 50px;
    padding-bottom: 50px;
    `;
