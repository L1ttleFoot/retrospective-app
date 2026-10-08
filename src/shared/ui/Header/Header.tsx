import {ReactNode} from 'react';

import * as Styled from './Header.styled';

type HeaderProps = {title: string; subtitle?: ReactNode; level?: number};

export const Header = ({title, subtitle, level = 1}: HeaderProps) => {
	return (
		<Styled.Title>
			<Styled.MainTitle $level={level}>{title}</Styled.MainTitle>
			{subtitle && <Styled.SubTitle>{subtitle}</Styled.SubTitle>}
		</Styled.Title>
	);
};
