import {style} from '@vanilla-extract/css';

export const table = style({backgroundColor: '#fff', borderCollapse: 'collapse'});

export const headCell = style({
	background: 'silver',
	boxShadow:
		'inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf',
	boxSizing: 'border-box',
	fontWeight: 400,
	height: '17px',
	padding: '0 6px',
	position: 'sticky',
	top: 0,
});

export const cell = style({padding: '0 6px'});
