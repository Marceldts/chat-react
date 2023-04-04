import React from "react";
import styled from "styled-components";

export const Message = ({ children, ...props }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', margin: '10px' }}>
            {!props.own && <SenderPhoto src={props.photo} alt="Foto de perfil del emisor" />}
            <MessageContainer {...props}>
                <MessageHeader>
                    {!props.own && <MessageHeaderUser>{props.displayName}</MessageHeaderUser>}
                    <DeleteIcon onClick={props.deleteMessage} />
                </MessageHeader>
                {props.type === 'text' && <MessageText>{props.message}</MessageText>}
                {props.type === 'image' && <MessageImage src={props.message} alt="Imagen enviada" />}
                <MessageHeaderTime>{props.time}</MessageHeaderTime>
            </MessageContainer>
        </div>
    );
}

const DeleteIcon = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 10px;
    &:hover {
        cursor: pointer;
    }
    display: none;
`;

const MessageContainer = styled.div`
    max-width: 80%;
    min-width: 30%;
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
            display: ${props => props.own ? 'block' : 'none'};
        }
`;

const MessageHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
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
    font-weight: 600;
`;

const MessageHeaderTime = styled.span`
    font-size: 12px;
    font-weight: 400;
    padding-top: 5px;
    display: flex;
    justify-content: flex-end;
`;

const MessageText = styled.p`
    margin: 0;
`;

const MessageImage = styled.img`
    width: 100%;
    border-radius: 2px;
`;
