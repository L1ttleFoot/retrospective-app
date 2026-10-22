import {style} from '@vanilla-extract/css';

import {themeVars} from '@/src/theme.css';

export const wrapper = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%',
	background: themeVars.backgroundPrimary,
	color: themeVars.color,
});

export const formWarpper = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	boxSizing: 'border-box',
	width: '350px',
	borderRadius: '10px',
	background: themeVars.backgroundSecond,
	boxShadow: themeVars.boxShadow,
});

export const form = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	padding: '25px',
	gap: '15px',
});

export const errorMessage = style({
	color: themeVars.colors.error,
	fontSize: '12px',
	margin: '0px 0px 5px 0px',
});

export const footer = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	marginBottom: '20px',
});
