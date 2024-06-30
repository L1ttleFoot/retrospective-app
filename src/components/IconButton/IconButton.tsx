import * as Styled from './IconButton.styled';

export const IconButton = ({children, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return <Styled.IconButton {...props}>{children}</Styled.IconButton>;
};
