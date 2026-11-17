import {style} from '@vanilla-extract/css';

import {themeVars} from '@/src/theme.css';

export const errorState = style({
	padding: '20px',
	width: '100%',
	height: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '10px',
	backgroundColor: themeVars.backgroundSecond,
	boxShadow: themeVars.boxShadow,
	color: themeVars.colors.error,
});
