import {createTheme, createThemeContract} from '@vanilla-extract/css';

export const themeVars = createThemeContract({
	colors: {primary: null, secondary: null, default: null, error: null},

	backgroundPrimary: null,
	backgroundSecond: null,
	backgroundThird: null,
	backgroundFourth: null,
	backgroundFifth: null,

	color: null,
	colorSecond: null,

	borderColor: null,

	disabled: null,

	boxShadow: null,

	toast: {
		success: {backgroundColor: null, color: null, borderColor: null},
		error: {backgroundColor: null, color: null, borderColor: null},
		warning: {backgroundColor: null, color: null, borderColor: null},
		info: {backgroundColor: null, color: null, borderColor: null},
	},
});

const baseColors = {primary: '#52b788', secondary: '#3d3bee', default: '#adb5bd', error: 'tomato'};

export const lightTheme = createTheme(themeVars, {
	colors: baseColors,
	backgroundPrimary: '#ffffff',
	backgroundSecond: 'rgb(255, 255, 255)',
	backgroundThird: 'rgb(255, 255, 255)',
	backgroundFourth: 'rgb(255, 255, 255)',
	backgroundFifth: 'rgb(255, 255, 255)',
	color: '#000',
	colorSecond: 'rgba(0, 0, 0, 0.6)',
	borderColor: '#ebebeb',
	disabled: '#f5f5f7',
	boxShadow: '0 4px 16px 0 rgba(61, 72, 108, 0.16)',
	toast: {
		success: {backgroundColor: '#edf7ed', color: '#1e4620', borderColor: '#c3e6cb'},
		error: {backgroundColor: '#fdeded', color: '#5f2120', borderColor: '#f5c6cb'},
		warning: {backgroundColor: '#fff4e5', color: '#663c00', borderColor: '#ffeeba'},
		info: {backgroundColor: '#e5f6fd', color: '#014361', borderColor: '#bee5eb'},
	},
});

export const darkTheme = createTheme(themeVars, {
	colors: baseColors,
	backgroundPrimary: '#121212',
	backgroundSecond: '#212121',
	backgroundThird: '#303030',
	backgroundFourth: '#424242',
	backgroundFifth: '#525252',
	color: '#EbEbEb',
	colorSecond: '#a5a5a5',
	borderColor: '#ffffff14',
	disabled: '#3a3a3a',
	boxShadow: 'none',
	toast: {
		success: {backgroundColor: '#303030', color: '#4ade80', borderColor: 'rgba(74, 222, 128, 0.4)'},
		error: {backgroundColor: '#303030', color: '#f87171', borderColor: 'rgba(248, 113, 113, 0.4)'},
		warning: {backgroundColor: '#303030', color: '#fbbf24', borderColor: 'rgba(251, 191, 36, 0.4)'},
		info: {backgroundColor: '#303030', color: '#60a5fa', borderColor: 'rgba(96, 165, 251, 0.4)'},
	},
});

export const themes = {light: lightTheme, dark: darkTheme} as const;
