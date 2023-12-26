import styled from 'styled-components';

export const StyledButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  cursor: pointer;
  padding: 15px 20px;

  background-color: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.background};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius};

  font-family: inherit;
  font-size: inherit;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.48px;
  text-transform: uppercase;
  white-space: nowrap;
  transition: background-color 0.3s ease;

  &:hover,
  &:active {
    background-color: ${(props) => props.theme.colors.accentHover};
  }

  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
    background-color: ${(props) => props.theme.colors.accentDisabled};
  }
`;
