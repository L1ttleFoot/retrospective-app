import {ReactNode} from 'react';

import * as style from './Header.css';
import {mainTitleVariants} from './Header.css';

type HeaderProps = {title: string; subtitle?: ReactNode} & mainTitleVariants;

export const Header = ({title, subtitle, level}: HeaderProps) => {
	return (
		<div className={style.header}>
			<div className={style.mainTitle({level})}>{title}</div>
			{subtitle && <div className={style.subTitle}>{subtitle}</div>}
		</div>
	);
};
