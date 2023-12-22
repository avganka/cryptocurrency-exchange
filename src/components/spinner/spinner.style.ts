import styled from 'styled-components';

export const StyledSpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledSpinner = styled.svg`
  transform-origin: center;
  animation: spin 4s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(540deg);
    }
    100% {
      transform: rotate(1080deg);
    }
  }
`;

export const StyledSpinnerCircle = styled.circle`
  fill: transparent;
  stroke: ${(props) => props.color || props.theme.colors.background};
  stroke-width: 1px;
  stroke-linecap: round;
  stroke-dasharray: 220%;
`;
