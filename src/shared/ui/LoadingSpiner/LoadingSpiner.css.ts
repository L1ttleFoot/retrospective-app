import {keyframes, style} from '@vanilla-extract/css';

const spin = keyframes({'0%': {transform: 'rotate(0deg)'}, '100%': {transform: 'rotate(360deg)'}});

export const wrapper = style({
	width: '100%',
	height: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	position: 'absolute',
	top: 0,
	left: 0,
});

export const spinner = style({
	border: '16px solid #f3f3f3',
	borderTop: '16px solid #52b788',
	borderRadius: '50%',
	width: '100px',
	height: '100px',
	animation: `${spin} 1s ease-in-out infinite`,
});
