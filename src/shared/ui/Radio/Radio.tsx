import {ChangeEvent} from 'react';

import * as Styled from './Radio.styled';

type RadioProps = {
	label?: string;
	value: string;
	name: string;
	checked: boolean;
	disabled?: boolean;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Radio = ({value, name, checked, disabled, onChange, label}: RadioProps) => {
	return (
		<Styled.RadioWrapper>
			<Styled.RadioLabel disabled={disabled}>
				<Styled.RadioInput
					name={name}
					value={value}
					checked={checked}
					onChange={onChange}
					disabled={disabled}
				/>
				<Styled.RadioStyled checked={checked} disabled={disabled} />
				{label && <span>{label}</span>}
			</Styled.RadioLabel>
		</Styled.RadioWrapper>
	);
};
