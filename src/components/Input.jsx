import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HelpTooltip } from "./HelpTooltip";
import EyeClosed from "../assets/Eye_closed_icon.svg";
import EyeOpened from "../assets/Eye_opened_icon.svg";

export const Input = ({ label, error, help, ...props }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [initialType, setInitialType] = useState(props.type);
  const input = document.getElementById(props.id) || {};

  useEffect(() => {
    if (input.disabled) {
      setShowPassword(false);
      input.type = "password";
      return;
    };
    showPassword ? input.type = "text" : input.type = "password";
  }, [showPassword]);

  useEffect(() => {
    if (input.disabled && initialType === "password") {
      setShowPassword(false);
      input.type = "password";
    }
  }, [input.disabled]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
      sendPhoto(event.target.files[0]);
    } else {
      setPreviewImage(null);
      sendPhoto('');
    }
  };

  function sendPhoto(photo) {
    props.sendPhoto(photo);
  }

  return (
    <InputWrapper>
      <InputRow>
        {label && <InputLabel>{label}</InputLabel>}
        {help && (
          <HelpTooltip>
            {help}
          </HelpTooltip>
        )}
      </InputRow>
      <PhotoContainer>
        {props.type === "file" && previewImage && (
          <InputRow>
            <PhotoPreview id="image-preview" src={previewImage} alt="Foto de perfil" />
          </InputRow>
        )
        }
        {props.type === "file" && <InputContainer {...props} error={error} onChange={handleFileSelect} />}
        {props.type !== "file" && <InputContainer {...props} error={error} />}
        {props.type === "password" && (
          <EyeIcon src={showPassword ? EyeOpened : EyeClosed} onClick={() => setShowPassword(!showPassword)} />
        )}
      </PhotoContainer>
      {error && <InputError>{error}</InputError>}
    </InputWrapper>
  );
};

const InputRow = styled.div`
    display: flex;
    flex-direction: row;
    `;

//Hacemos el ::-ms-reveal y ::-ms-clear transparentes para que no se vean los botones de mostrar y ocultar contraseña en IE y Edge
const InputContainer = styled.input`
  padding: 10px 20px;
  margin: ${props => !props.error ? "10px" : "10px 10px 0 10px"};
  border: none;
  border-radius: 5px;
  background-color: #ffffff;
  color: #333333;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  ::-ms-reveal,
  ::-ms-clear {
    display: none;
  }

  ${({ error }) =>
    error &&
    `
    border: 2px solid red;
  `}

  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: #ccc;
    color: #888;
    cursor: not-allowed;
  }
`;

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
  @media (max-width: 768px) {
    margin-left: 10px;
  }
`;

const InputError = styled.span`
  color: red;
  font-size: 14px;
  font-weight: 600;
  margin-top: 5px;
  @media (max-width: 768px) {
    margin-left: 10px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PhotoPreview = styled.img`
  height: 100px;
  width: 100px;
  margin: 10px;
  border-radius: 50%;
`;

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

const EyeIcon = styled.img`
  height: 20px;
  width: 20px;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 30px;
`;