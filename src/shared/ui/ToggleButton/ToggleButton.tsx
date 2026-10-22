import * as style from './ToggleButton.css';

type ToggleButtonProps = {value: boolean; onToggle: () => void};

export const ToggleButton = ({value, onToggle}: ToggleButtonProps) => {
	return <button className={style.toggleButton({value})} onClick={onToggle}></button>;
};
