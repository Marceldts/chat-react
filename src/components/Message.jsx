import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getImage } from "../utils/firebase-auth";
import User from "../assets/User_icon.svg";
import Delete from "../assets/Delete_icon.svg";

export const Message = ({ children, ...props }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function setImage(email, id) {
            getImage(email, id);
            setLoading(false);
        }
        setImage(props.email, props.id)
    }, []);

    return (
        <MessageWrapper>
            {!props.own && <SenderPhoto src={User} id={props.id} alt="Foto de perfil del emisor" />}
            <MessageContainer {...props}>
                <MessageHeader own={props.own}>
                    {!props.own && <MessageHeaderUser>{props.displayName}</MessageHeaderUser>}
                    {props.own && <DeleteIcon onClick={props.deleteMessage} src={Delete} alt="Borrar mensaje" />}
                </MessageHeader>
                {props.type === 'text' && <MessageText>{props.message}</MessageText>}
                {props.type === 'image' && <MessageImage src={props.message} alt="Imagen enviada" />}
                <MessageHeaderTime>{props.time}</MessageHeaderTime>
            </MessageContainer>
        </MessageWrapper>
    );
}

const DeleteIcon = styled.img`
    width: 20px;
    height: 20px;
    &:hover {
        cursor: pointer;
    }
    visibility: hidden;
`;

const MessageContainer = styled.div`
    max-width: 80%;
    min-width: 10%;
    overflow-wrap: break-word;
    padding: 10px;
    margin: 5px;
    margin-top: 0;
    border-radius: 5px;
    background-color: ${props => props.own ? '#819595' : '#413C58'};
    color: ${props => props.own ? '#242230' : '#E2B4BD'};
    margin-left: ${props => props.own ? 'auto' : '0'};
    margin-right: ${props => props.own ? '0' : 'auto'};
    font-size: 16px;
    font-weight: 600;

    &:hover {
        ${DeleteIcon} {
            visibility: visible;
        }
    }
    @media (max-width: 768px) {
        max-width: 75%;
    }
`;

const MessageHeader = styled.div`
    display: flex;
    flex-direction: ${props => props.own ? 'row-reverse' : 'row'};
    margin-bottom: ${props => props.own ? '0' : '10px'};
    align-items: center;
    width: 100%;
`;

const SenderPhoto = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
    object-position: center;
`;

const MessageHeaderUser = styled.h3`
    margin: 0;
    font-size: 16px;
    font-weight: bold;

    @media (max-width: 768px) {
        font-size: 15px;
    }
`;

const MessageHeaderTime = styled.span`
    font-size: 12px;
    font-weight: 400;
    padding-top: 5px;
    display: flex;
    justify-content: flex-end;

    @media (max-width: 768px) {
        font-size: 11px;
    }
`;

const MessageText = styled.p`
    font-weight: 500;
    margin: 0;
    font-size: 16px;

    @media (max-width: 768px) {
        font-size: 15px;
    }
`;

const MessageImage = styled.img`
    width: 100%;
    border-radius: 2px;
`;

const MessageWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin: 10px;
`;