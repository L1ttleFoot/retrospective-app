import {style} from '@vanilla-extract/css';
import {recipe} from '@vanilla-extract/recipes';

import {themeVars} from '@/src/theme.css';

export const radioWrapper = style({display: 'flex', alignItems: 'center', gap: '8px'});

export const radioInput = style({position: 'absolute', opacity: 0, width: 0, height: 0});

export const radioLabel = recipe({
	base: {
		display: 'flex',
		alignItems: 'center',
		gap: '8px',
		fontSize: '14px',
		lineHeight: 1.25,
		fontWeight: 500,
		color: themeVars.color,
		cursor: 'pointer',
	},
	variants: {disabled: {true: {cursor: 'default', color: themeVars.colorSecond}}},
});

export const radioStyled = recipe({
	base: {
		width: '16px',
		height: '16px',
		display: 'inline-block',
		borderRadius: '10px',
		backgroundColor: themeVars.colors.primary,
		position: 'relative',
		cursor: 'pointer',
		transition: 'background-color 0.3s ease-in-out',

		selectors: {
			'&::after': {
				content: '""',
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: '10px',
				height: '10px',
				backgroundColor: '#ffffff',
				borderRadius: '50%',
				display: 'none',
			},
		},
	},
	variants: {
		checked: {true: {selectors: {'&::after': {display: 'block'}}}},
		disabled: {true: {backgroundColor: themeVars.disabled, cursor: 'default'}},
	},
});
