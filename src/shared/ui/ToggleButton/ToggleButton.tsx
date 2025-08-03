import * as Styled from './ToggleButton.styled';

type ToggleButtonProps = {value: boolean; onToggle: () => void};

export const ToggleButton = ({value, onToggle}: ToggleButtonProps) => {
	return <Styled.ToggleButton $value={value} onClick={onToggle}></Styled.ToggleButton>;
};
