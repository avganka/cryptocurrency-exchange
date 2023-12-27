import styled from 'styled-components';

export const ListContainer = styled.div`
  position: absolute;
  top: 50px;
  left: 0;

  width: 100%;

  overflow-y: auto;
  z-index: 10;
`;

export const StyledList = styled.ul<{ $open?: boolean }>`
  position: relative;

  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.gray};
  border: 1px solid ${(props) => (props.$open ? props.theme.colors.borderDark : props.theme.colors.darkGray)};
  border-top-color: transparent;
`;

export const StyledListItem = styled.li`
  position: absolute;
  top: 0;

  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 13px 16px 12px;
  list-style: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.inputHover};
  }
`;

export const CurrencyCode = styled.span`
  color: ${(props) => props.theme.colors.text};
`;

export const CurrencyName = styled.span`
  color: ${(props) => props.theme.colors.textLight};
`;
