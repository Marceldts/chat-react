import React from 'react';
import styled from 'styled-components';

const HelpContainer = styled.div`
  position: relative;
`;

const HelpIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #0077FF;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  position: relative; /* agregamos esta propiedad */
`;

const HelpTooltipContainer = styled.div`
  position: absolute; /* agregamos esta propiedad */
  top: 100%; /* ajusta la posición vertical */
  left: 50%; /* ajusta la posición horizontal */
  transform: translateX(-50%); /* centra el tooltip */
  padding: 8px;
  border-radius: 8px;
  background-color: #FFFFFF;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HelpTooltipText = styled.div`
  font-size: 12px;
  color: #333333;
`;

export const HelpTooltip = ({ children }) => {
    const [showTooltip, setShowTooltip] = React.useState(false);

    return (
        <HelpContainer>
            <HelpIcon
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                i
            </HelpIcon>
            {showTooltip && (
                <HelpTooltipContainer>
                    <HelpTooltipText>{children}</HelpTooltipText>
                </HelpTooltipContainer>
            )}
        </HelpContainer>
    );
};


