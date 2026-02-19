import {ReactNode} from 'react';

import * as Styled from './Box.styled';

type BoxProps = {children: ReactNode; m?: string; p?: string};

export const Box = ({m, p, children}: BoxProps) => {
	return (
		<Styled.Box $m={m} $p={p}>
			{children}
		</Styled.Box>
	);
};
