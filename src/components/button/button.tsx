import { ReactNode } from 'react';
import { StyledButton } from './button.style';

import Spinner from '@components/spinner/spinner';

interface ButtonProps {
  text: string | ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  const { text, isLoading = false, disabled, onClick, type = 'button' } = props;
  return (
    <StyledButton type={type} disabled={disabled} onClick={onClick}>
      {isLoading && <Spinner size={20} />}
      <span>{text}</span>
    </StyledButton>
  );
};

export default Button;
