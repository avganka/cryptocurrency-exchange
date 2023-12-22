import { StyledSpinner, StyledSpinnerCircle, StyledSpinnerWrapper } from './spinner.style';

interface SpinnerProps {
  classname?: string;
  color?: string;
  size?: number;
}

const Spinner = ({ color, size = 24 }: SpinnerProps) => {
  return (
    <StyledSpinnerWrapper>
      <StyledSpinner width={size} height={size}>
        <StyledSpinnerCircle cx='50%' cy='50%' r='44%' color={color} />
      </StyledSpinner>
    </StyledSpinnerWrapper>
  );
};

export default Spinner;
