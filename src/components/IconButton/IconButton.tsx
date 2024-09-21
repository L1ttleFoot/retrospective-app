import * as Styled from './IconButton.styled';

type IconButtonType = {
    size?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = ({children, size = 'medium', ...props}: IconButtonType) => {
    return (
        <Styled.IconButton $size={size} {...props}>
            {children}
        </Styled.IconButton>
    );
};
