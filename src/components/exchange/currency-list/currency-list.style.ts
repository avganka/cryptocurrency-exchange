import styled from 'styled-components';

export const StyledList = styled.ul<{ $open?: boolean }>`
  position: absolute;
  top: 50px;
  left: 0;

  width: 100%;
  max-height: 227px;

  overflow-y: auto;

  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.gray};
  border: 1px solid ${(props) => (props.$open ? props.theme.colors.borderDark : props.theme.colors.darkGray)};
  border-top-color: transparent;

  z-index: 10;
`;
