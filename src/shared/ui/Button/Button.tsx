import * as Styled from './Button.styled';

type ButtonType = {
	fullWidth?: boolean;
	variant?: 'outline';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({fullWidth, variant, ...props}: ButtonType) => {
	return <Styled.Button {...props} $fullWidth={fullWidth} $variant={variant} />;
};
