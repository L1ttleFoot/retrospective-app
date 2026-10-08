export const theme = {
	colors: {primary: '#52b788', secondary: '#3d3bee', default: '#adb5bd', error: 'tomato'},
	currentTheme: 'light',
};

export const darkPalette = {
	backgroundPrimary: '#121212',
	backgroundSecond: '#212121',
	backgroundThird: '#303030',
	backgroundFourth: '#424242',
	backgroundFifth: '#525252',

	color: '#EbEbEb ',
	colorSecond: '#a5a5a5',

	borderColor: '#ffffff14',

	disabled: '#3a3a3a',

	boxShadow: 'none',
};

export const lightPalette = {
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
};

export const windows98Palette = {
	backgroundPrimary: '#008080',
	backgroundSecond: 'silver',
	backgroundThird: 'silver',
	backgroundFourth: 'silver',
	color: '#000',
	borderColor: ' #FFFFFF1A',
	colorSecond: 'rgba(0, 0, 0, 0.6)',
	disabled: '#f5f5f7',
};

export const themePallets = {
	light: lightPalette,
	dark: darkPalette,
	win98: windows98Palette,
} as const;
