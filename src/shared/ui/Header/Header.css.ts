import {globalStyle, style} from '@vanilla-extract/css';
import {RecipeVariants, recipe} from '@vanilla-extract/recipes';

export const header = style({width: '100%'});

export const mainTitle = recipe({
	variants: {level: {1: {fontSize: '24px'}, 2: {fontSize: '16px'}}},
	defaultVariants: {level: 1},
});

export type mainTitleVariants = RecipeVariants<typeof mainTitle>;

export const subTitle = style({
	fontSize: '14px',
	color: '#97989a',
	display: 'flex',
	gap: '12px',
	width: '100%',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
});

globalStyle(`${subTitle} > *`, {
	color: 'inherit',
	fontSize: 'inherit',
	flexShrink: 0,
	display: 'inline-flex',
	alignItems: 'center',
	gap: '4px',
});
