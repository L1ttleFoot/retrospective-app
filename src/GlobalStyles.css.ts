import {globalStyle} from '@vanilla-extract/css';

import {themeVars} from './theme.css';

globalStyle('*', {fontFamily: "'Roboto', Arial, sans-serif"});

globalStyle('body', {color: themeVars.color});
