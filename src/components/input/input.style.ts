import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  padding: 15px;

  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.gray};
  border: 1px solid ${(props) => props.theme.colors.darkGray};
  border-radius: ${(props) => props.theme.borderRadius};

  font-family: inherit;
  font-size: inherit;
  font-weight: 400;

  outline: none;
`;
