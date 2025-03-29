import * as Styled from './Button.styled';

type ButtonType = {
    fullWidth?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({fullWidth, ...props}: ButtonType) => {
    return <Styled.Button {...props} $fullWidth={fullWidth} />;
};
