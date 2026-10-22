import React from 'react';
import {Link} from 'react-router-dom';

import * as style from './TextLink.css';

type TextLinkProps = {to: string; children: React.ReactNode};

export const TextLink = ({to, children}: TextLinkProps) => {
	return (
		<Link className={style.textLink} to={to}>
			{children}
		</Link>
	);
};
