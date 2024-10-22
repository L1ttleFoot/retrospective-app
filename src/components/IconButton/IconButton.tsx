import {Ref} from 'react';
import {sizes} from '../../consts/styles';
import * as Styled from './IconButton.styled';

type IconButtonType = {
    size?: keyof typeof sizes;
    withTheme?: boolean;
    innerRef?: Ref<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = ({
    children,
    size = 'medium',
    withTheme = false,
    innerRef,
    ...props
}: IconButtonType) => {
    return (
        <Styled.IconButton $size={size} $withTheme={withTheme} ref={innerRef} {...props}>
            {children}
        </Styled.IconButton>
    );
};
