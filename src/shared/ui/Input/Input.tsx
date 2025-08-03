import {forwardRef} from 'react';

import * as Styled from './Input.styled';

type InputProps = {error?: boolean} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({error, ...props}, ref) => {
	return (
		<Styled.InputWrapper>
			<Styled.Input id={props.name} ref={ref} $error={error} {...props} />
			{/* <Styled.Label htmlFor={props.name}>Логин</Styled.Label> */}
		</Styled.InputWrapper>
	);
});
