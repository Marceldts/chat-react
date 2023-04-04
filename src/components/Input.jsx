import React, { useState } from "react";
import styled from "styled-components";
import { HelpTooltip } from "./HelpTooltip";

export const Input = ({ label, error, help, ...props }) => {
  const [previewImage, setPreviewImage] = useState(null);

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
        <InputLabel>{label}</InputLabel>
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
      </PhotoContainer>
      {error && <InputError>{error}</InputError>}
    </InputWrapper>
  );
};

const InputRow = styled.div`
    display: flex;
    flex-direction: row;
    `;

const InputContainer = styled.input`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ffffff;
  color: #333333;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

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
`;

const InputError = styled.span`
  color: red;
  font-size: 14px;
  font-weight: 600;
  margin-top: 5px;
`;

const InputHelp = styled.span`
  font-size: 14px;
  margin-top: 5px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PhotoPreview = styled.img`
  height: 100px;
  margin: 10px;
  border-radius: 50%;
`;

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: row;
`;