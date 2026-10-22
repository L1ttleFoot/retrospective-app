import {RecipeVariants, recipe} from '@vanilla-extract/recipes';

import {themeVars} from '@/src/theme.css';

export const buttonRecipe = recipe({
	base: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: '10px',
		width: '100%',
		height: '45px',
		minHeight: '45px',
		border: 'none',
		borderRadius: '10px',
		textAlign: 'center',
		fontSize: '16px',
		lineHeight: 1.25,
		backgroundColor: themeVars.colors.primary,
		color: '#ffffff',
		fontWeight: 500,
		position: 'relative',
		cursor: 'pointer',
		transition: 'background-color 0.3s ease-in-out, transform 0.1s ease-in-out',

		':disabled': {backgroundColor: themeVars.disabled, color: '#c0c9d8', cursor: 'default'},

		':active': {transform: 'scale(0.98)'},
	},

	variants: {
		fullWidth: {true: {maxWidth: '100%'}, false: {maxWidth: '180px'}},
		variant: {
			primary: {},
			outline: {
				backgroundColor: themeVars.backgroundThird,
				color: themeVars.color,
				border: `2px solid ${themeVars.colors.primary}`,
			},
		},
	},

	defaultVariants: {fullWidth: false, variant: 'primary'},
});

export type ButtonVariants = RecipeVariants<typeof buttonRecipe>;
