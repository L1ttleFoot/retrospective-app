import {keyframes} from '@vanilla-extract/css';
import {RecipeVariants, recipe} from '@vanilla-extract/recipes';

const fadeIn = keyframes({from: {opacity: 0}, to: {opacity: 1}});

export const backdropRecipe = recipe({
	base: {
		position: 'absolute',
		inset: 0,
		backgroundColor: 'black',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 2,
		animation: `${fadeIn} .3s ease forwards`,
	},

	variants: {
		isTransparent: {
			true: {backgroundColor: 'transparent'},
			false: {backgroundColor: 'rgba(0,0,0,0.2)'},
		},
	},

	defaultVariants: {isTransparent: true},
});

export type BackdropVariants = RecipeVariants<typeof backdropRecipe>;
