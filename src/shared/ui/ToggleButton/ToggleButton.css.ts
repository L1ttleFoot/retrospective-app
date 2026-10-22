import {recipe} from '@vanilla-extract/recipes';

export const toggleButton = recipe({
	base: {
		backgroundColor: '#52b788',
		border: 'none',
		borderRadius: '99px',
		width: '40px',
		height: '24px',
		cursor: 'pointer',
		position: 'relative',
		display: 'flex',
		alignItems: 'center',

		selectors: {
			'&::after': {
				content: '""',
				position: 'absolute',
				height: '16px',
				width: '16px',
				backgroundColor: 'white',
				borderRadius: '99px',
				top: '4px',

				transition: 'left 0.2s ease-in-out, width 0.2s ease-in-out',
			},
			'&:active::after': {width: '22px'},
		},
	},
	variants: {
		value: {
			true: {selectors: {'&::after': {left: '20px'}, '&:active::after': {left: '14px'}}},
			false: {selectors: {'&::after': {left: '4px'}, '&:active::after': {left: '4px'}}},
		},
	},
	defaultVariants: {value: true},
});
