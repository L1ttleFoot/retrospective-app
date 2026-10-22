import {ChangeEvent} from 'react';

import * as styles from './Radio.css';

type RadioProps = {
	label?: string;
	value: string;
	name: string;
	checked: boolean;
	disabled?: boolean;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Radio = ({value, name, checked, disabled = false, onChange, label}: RadioProps) => {
	return (
		<div className={styles.radioWrapper}>
			<label className={styles.radioLabel({disabled})}>
				<input
					type="radio"
					className={styles.radioInput}
					name={name}
					value={value}
					checked={checked}
					onChange={onChange}
					disabled={disabled}
				/>
				<span className={styles.radioStyled({checked, disabled})} />
				{label && <span>{label}</span>}
			</label>
		</div>
	);
};
