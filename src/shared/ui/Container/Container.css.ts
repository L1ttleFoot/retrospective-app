import {style} from '@vanilla-extract/css';

import {themeVars} from '@/src/theme.css';

export const container = style({
	borderRadius: '10px',
	backgroundColor: 'rgb(225,225,225)',
	boxShadow: themeVars.boxShadow,
});
