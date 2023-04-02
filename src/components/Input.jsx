import React from "react";
import styled from "styled-components";
import { HelpTooltip } from "./HelpTooltip";

export const Input = ({ label, error, help, ...props }) => {
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
            <InputContainer {...props} error={error} />
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


