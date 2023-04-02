import React from 'react';
import styled from 'styled-components';

const HelpContainer = styled.div`
  position: relative;
  margin-left: 10px;
  bottom: 3px;
`;

const HelpIcon = styled.div`
  display: inline-flex;
  align-items: top;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #413C58;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  position: relative;
`;

const HelpTooltipContainer = styled.div`
  position: absolute;
  top: 100%; 
  left: 50%; 
  transform: translateX(-50%); 
  padding: 8px;
  border-radius: 8px;
  background-color: #FFFFFF;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
  z-index: 1;
  width: max-content;
  max-width: 300px;
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


