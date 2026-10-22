import {style} from '@vanilla-extract/css';

import {themeVars} from '@/src/theme.css';

export const wrapper = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'flex-start',
	height: '100%',
	padding: '20px',
	gap: '10px',
	background: themeVars.backgroundPrimary,
	color: themeVars.color,
});

export const main = style({
	height: '100%',
	width: '100%',
	overflowY: 'auto',
	borderRadius: '10px',
	boxShadow: themeVars.boxShadow,
});
