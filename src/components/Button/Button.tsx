import { ForwardedRef, forwardRef, MouseEventHandler, ReactElement } from 'react';
import { ButtonSeeAll, StyledButton } from './styled';

interface ButtonProps {
  type?: string;
  children?: ReactElement | string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ButtonComponent = (
  { type, children, className, onClick }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
): ReactElement => {
  let ButtonComponent: typeof ButtonSeeAll | typeof StyledButton;

  switch (type) {
    case 'see_all':
      ButtonComponent = ButtonSeeAll;
      break;
    default:
      ButtonComponent = StyledButton;
  }

  return (
    <ButtonComponent className={className} onClick={onClick} ref={ref}>
      {children}
    </ButtonComponent>
  );
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(ButtonComponent);
