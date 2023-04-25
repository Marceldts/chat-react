import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import styled from "styled-components";

import { useNavigate } from 'react-router-dom';
import { ToolbarElement } from "../components/ToolbarElement";
import { Camera, CameraResultType } from "@capacitor/camera";
import { logout, getCurrentUser, uploadTakenPhoto } from "../utils/firebase-auth";
import { addMessageToDatabase, subscribeToMessages } from "../utils/message-service";
import { onEnter } from "../utils/enter-service";

import { Toolbar } from "../components/Toolbar";
import { Input } from "../components/Input";
import { Message } from "../components/Message";
import { Spinner } from "../components/Spinner";
import { SideMenu } from "../components/side-menu/SideMenu";

import Hamburger_icon from "../assets/Hamburger_icon.svg";
import Logout_icon from "../assets/Logout_icon.svg";
import Send_icon from "../assets/Send_icon.svg";
import Camera_icon from "../assets/Camera_icon.svg";

//TO DO: Fix android logo, add  menu functionality
export const ChatPage = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [valid, setValid] = useState(false);
    const [user, setUser] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const [loading, setLoading] = useState(true);
    const [sideMenuOpen, setSideMenuOpen] = useState(false);

    const navigate = useNavigate();
    const bottomPageRef = useRef(null);
    const chatPageRef = useRef(null);


    useLayoutEffect(() => {
        document.title = 'Chat';
    }, []);

    useEffect(() => {
        const getUser = async () => {
            getCurrentUser().then((user) => {
                setUser(user);
                if (!user) {
                    navigate('/');
                }
            })
        }
        getUser()
    }, [])

    useEffect(() => {
        const unsubscribe = subscribeToMessages((subscribedMessages) => {
            let sortedMessages = subscribedMessages.sort((a, b) => {
                return a.ms - b.ms;
            });
            const newMessages = [...messages, ...sortedMessages];
            setMessages(newMessages);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const sideMenu = document.getElementById("side-menu");
        const handleOutsideClick = (event) => {
            if (sideMenuOpen && chatPageRef.current && (!sideMenu.contains(event.target) && event.target !== document.getElementById("hamburger-menu"))) {
                setSideMenuOpen(false);
            }
        };

        if (sideMenuOpen) {
            document.addEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [sideMenuOpen]);

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName);
        }
    }, [user]);

    useEffect(() => {
        setValid(message !== '');
    }, [message]);

    useEffect(() => {
        if (!bottomPageRef.current) return;
        bottomPageRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [messages]);

    const onMenuClicked = () => {
        setSideMenuOpen(true);
    };

    //We fetch the image and convert it to a blob to upload it to firebase storage
    const onTakePicture = async () => {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Uri,
                saveToGallery: true,
            });

            const file = await fetch(image.webPath);
            const blob = await file.blob();

            const src = image.path;
            uploadTakenPhoto(blob).then((url) => {
                onSend(url);
            });
        } catch (error) {
        }
    };

    const onSend = (src) => {
        if (!valid && !src) {
            return;
        }
        const date = new Date();
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const time = hours + ":" + minutes;
        let messageObject;
        if (!src) {
            messageObject = {
                message: message,
                displayName: displayName,
                time: time,
                type: 'text',
                author: user.uid,
                ms: date.getTime(),
                email: user.email
            }
        } else {
            messageObject = {
                message: src,
                displayName: displayName,
                time: time,
                type: 'image',
                author: user.uid,
                ms: date.getTime(),
                email: user.email
            }
        }
        const newMessages = [...messages, messageObject];
        addMessageToDatabase(messageObject);
        setMessages(newMessages);
        setMessage('');
    };

    const onLogout = () => {
        if (!window.confirm("¿Estás seguro que quieres cerrar sesión?")) {
            return;
        }
        logout().then(() => navigate('/'));
    };

    return (
        <div ref={chatPageRef}>
            <ChatPageContainer>
                {loading && <Spinner></Spinner>}
                <HeaderToolbar>
                    <ToolbarElement id="hamburger-menu" src={Hamburger_icon} alt="Hamburger menu icon" onClick={onMenuClicked} />
                    <h2>Chat</h2>
                    <ToolbarElement id="logout" src={Logout_icon} alt="Logout icon" onClick={onLogout} />
                </HeaderToolbar>
                {sideMenuOpen && <SideMenu id="side-menu" items={[{ method: onlanguagechange, icon: Hamburger_icon, text: "Holaa" }, { method: onlanguagechange, icon: Hamburger_icon, text: "Adios" }]} open={sideMenuOpen} />}
                <MessagesContainer >
                    {messages.map((message, index) => {
                        return (
                            < Message
                                key={index}
                                id={index}
                                email={message.email}
                                message={message.message}
                                displayName={message.displayName}
                                photo={message.photo}
                                time={message.time}
                                type={message.type}
                                own={message.author === user.uid}
                            />
                        )
                    })}
                </MessagesContainer>
                <FooterToolbar>
                    <StyledToolbarElement src={Camera_icon} onClick={onTakePicture} alt="Take picture icon" valid={true} />
                    <StyledInput placeholder="Mensaje" value={message} onChange={(e) => setMessage(e.target.value)} autoComplete="new-password" onKeyDown={(e) => onEnter(e, onSend)} />
                    <StyledToolbarElement src={Send_icon} alt="Send message icon" onClick={onSend} valid={valid} end="true" />
                </FooterToolbar>
                <div ref={bottomPageRef} style={{ height: '0px' }} />
            </ChatPageContainer>
        </div>
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
    margin-right: ${props => props.end ? '20px' : '5px'};
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
