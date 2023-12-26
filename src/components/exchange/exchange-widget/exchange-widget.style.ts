import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  column-gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    row-gap: 16px;
    align-items: end;
  }
`;
