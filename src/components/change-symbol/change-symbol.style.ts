import styled from 'styled-components';

export const StyledSvg = styled.svg`
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(180deg);
  }

  @media (max-width: 900px) {
    justify-self: end;
    transform: rotate(90deg);

    &:hover {
      transform: rotate(90deg) rotate(180deg);
    }
  }
`;
