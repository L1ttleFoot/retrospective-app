import {globalFontFace, globalStyle} from '@vanilla-extract/css';

import {themeVars} from './theme.css';

globalFontFace('Medeo Sans', {
	src: "url('/fonts/medeo-sans/MedeoSansVariable.woff2') format('woff2')",
	fontWeight: '100 900',
	fontStyle: 'normal',
	fontDisplay: 'swap',
});

globalFontFace('Medeo Sans', {
	src: "url('/fonts/medeo-sans/MedeoSansVariable-Italic.woff2') format('woff2')",
	fontWeight: '100 900',
	fontStyle: 'italic',
	fontDisplay: 'swap',
});

globalStyle('*', {fontFamily: "'Roboto', Arial, sans-serif"});

globalStyle('body', {color: themeVars.color});
