import React, {forwardRef} from 'react';
import * as Styled from './Input.styled';

type InputProps = {error?: boolean} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({error, ...props}, ref) => {
    return <Styled.Input ref={ref} $error={error} {...props} />;
});
