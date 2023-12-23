/* eslint-disable max-len */
import styled from 'styled-components';

import Input from '@components/input/input';

export const StyledValueInput = styled(Input)`
  padding-right: 188px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const StyledCurrencyButton = styled.button`
  position: absolute;
  width: 150px;
  height: 100%;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 8px 15px 30px;

  cursor: pointer;
  border-radius: 0 ${(props) => props.theme.borderRadius} ${(props) => props.theme.borderRadius} 0;
  background-color: transparent;
  color: ${(props) => props.theme.colors.text};
  border: none;

  font-family: inherit;
  font-size: inherit;
  font-weight: 400;
  line-height: 1;
  white-space: nowrap;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.borderDark};
  }

  &:hover::before {
    background-color: transparent;
  }

  &::before {
    content: '';
    position: absolute;
    width: 1px;
    height: 30px;
    top: 50%;
    left: 0;
    display: block;
    transform: translateY(-50%);
    background-color: ${(props) => props.theme.colors.darkGray};
  }

  &::after {
    content: '';
    width: 16px;
    height: 16px;
    display: inline-block;
    margin-left: auto;

    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'%3E%3Cpath fill='%2380A2B6' d='M8.01 11c.22 0 .44-.1.6-.25l4.14-4.24a.9.9 0 0 0 0-1.25.85.85 0 0 0-1.22 0L8 8.87 4.47 5.26a.86.86 0 0 0-.6-.26.85.85 0 0 0-.62.26.89.89 0 0 0-.25.63.9.9 0 0 0 .25.62l4.14 4.24a.86.86 0 0 0 .62.25Z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }
`;
