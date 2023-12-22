import styled from 'styled-components';

export const StyledListItem = styled.li`
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

export const CurrencyCode = styled.li`
  color: ${(props) => props.theme.colors.text};
`;

export const CurrencyName = styled.li`
  color: ${(props) => props.theme.colors.textLight};
`;
