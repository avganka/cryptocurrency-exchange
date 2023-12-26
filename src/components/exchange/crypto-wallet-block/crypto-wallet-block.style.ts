import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: flex;
  column-gap: 30px;

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 16px;
  }
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 8px;
`;

export const ButtonWrapper = styled.div`
  position: relative;

  @media (max-width: 900px) {
    width: 100%;
  }
`;
export const ErrorText = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  color: ${(props) => props.theme.colors.error};
`;
