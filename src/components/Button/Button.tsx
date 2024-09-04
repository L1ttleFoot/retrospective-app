import * as Styled from './Button.styled';

type ButtonType = {
    fullWidth?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({...props}: ButtonType) => {
    return <Styled.Button {...props} />;
};
