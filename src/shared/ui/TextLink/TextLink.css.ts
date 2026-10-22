import {style} from '@vanilla-extract/css';

import {themeVars} from '@/src/theme.css';

export const textLink = style({
	color: themeVars.colors.primary,
	textDecoration: 'none',

	':hover': {textDecoration: 'underline'},
});
