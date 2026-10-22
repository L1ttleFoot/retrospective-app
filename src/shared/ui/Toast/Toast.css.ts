import {style} from '@vanilla-extract/css';
import {recipe} from '@vanilla-extract/recipes';

import {themeVars} from '@/src/theme.css';

export const toastCard = recipe({
	base: {
		padding: '16px',
		borderRadius: '8px',
		boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
		fontSize: '14px',
		border: '2px solid',
	},
	variants: {
		type: {
			success: {
				color: themeVars.toast.success.color,
				backgroundColor: themeVars.toast.success.backgroundColor,
				borderColor: themeVars.toast.success.borderColor,
			},
			error: {
				color: themeVars.toast.error.color,
				backgroundColor: themeVars.toast.error.backgroundColor,
				borderColor: themeVars.toast.error.borderColor,
			},
			warning: {
				color: themeVars.toast.warning.color,
				backgroundColor: themeVars.toast.warning.backgroundColor,
				borderColor: themeVars.toast.warning.borderColor,
			},
			info: {
				color: themeVars.toast.info.color,
				backgroundColor: themeVars.toast.info.backgroundColor,
				borderColor: themeVars.toast.info.borderColor,
			},
		},
	},
});

export const toastMessage = style({color: 'inherit'});

export const toastDescription = style({
	fontSize: '12px',
	color: 'color-mix(in srgb, currentColor 70%, transparent)',
});

export const toastsContainer = style({
	position: 'fixed',
	right: '30px',
	bottom: '30px',

	display: 'flex',
	flexDirection: 'column',
	gap: '10px',

	zIndex: '9999',
});
