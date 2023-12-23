/* eslint-disable max-len */
import styled from 'styled-components';

import Input from '@components/input/input';

export const StyledCurrencySearch = styled(Input)<{ $open?: boolean }>`
  padding-right: 62px;

  border-color: ${({ theme, $open }) => `
    ${$open ? theme.colors.borderDark : theme.colors.darkGray} 
    ${$open ? theme.colors.borderDark : theme.colors.darkGray} 
    ${theme.colors.darkGray}
    ${$open ? theme.colors.borderDark : theme.colors.darkGray} 
  `};
  border-radius: ${({ theme, $open }) => `
    ${theme.borderRadius} ${theme.borderRadius} 
    ${$open ? '0' : theme.borderRadius} 
    ${$open ? '0' : theme.borderRadius}
  `};

  &::placeholder {
    color: ${(props) => props.theme.colors.textLight};
  }
`;

export const StyledCurrencyCloseButton = styled.button`
  position: absolute;
  height: 100%;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 8px;

  cursor: pointer;
  background-color: transparent;
  color: ${(props) => props.theme.colors.text};
  border: none;

  font-family: inherit;
  font-size: inherit;
  font-weight: 400;
  line-height: 1;
  white-space: nowrap;
  transition: background-color 0.3s ease;

  &::after {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'%3E%3Cpath fill='%2380A2B6' stroke='%2380A2B6' d='M12.18 3.26 8 7.44 3.82 3.26l-.56.56L7.44 8l-4.18 4.18.56.56L8 8.56l4.18 4.18.56-.56L8.56 8l4.18-4.18-.56-.56Z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }
`;
