import {ReactNode} from 'react';

import * as style from './Container.css';

type ContainerProps = {children: ReactNode};

export const Container = ({children}: ContainerProps) => {
	return <div className={style.container}>{children}</div>;
};
