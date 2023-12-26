import { StyledHeader, StyledSubtitle, StyledTitle } from './header.style';

import { HEADER_SUBTITLE_TEXT, HEADER_TITLE_TEXT } from '@/core/constants/header';

function Header() {
  return (
    <StyledHeader>
      <StyledTitle>{HEADER_TITLE_TEXT}</StyledTitle>
      <StyledSubtitle>{HEADER_SUBTITLE_TEXT}</StyledSubtitle>
    </StyledHeader>
  );
}

export default Header;
