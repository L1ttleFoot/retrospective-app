import React, {forwardRef} from 'react';
import * as Styled from './Input.styled';

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({...props}, ref) => {
        return <Styled.Input ref={ref} {...props} />;
    },
);
