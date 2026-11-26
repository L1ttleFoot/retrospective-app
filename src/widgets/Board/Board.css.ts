import {style} from '@vanilla-extract/css';

import {themeVars} from '@/src/theme.css';

export const board = style({
	padding: '20px',
	width: '100%',
	height: '100%',
	gap: '20px',
	overflowY: 'auto',
	borderRadius: '10px',
	background: themeVars.backgroundSecond,
	boxShadow: themeVars.boxShadow,
	position: 'relative',
});

export const title = style({textAlign: 'center', fontSize: '22px'});

export const sections = style({
	display: 'flex',
	justifyContent: 'space-around',
	alignItems: 'stretch',
});
