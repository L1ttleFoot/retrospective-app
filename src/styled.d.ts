import 'styled-components';

import {lightPalette, theme} from './theme';

type themeType = typeof theme & typeof lightPalette;

declare module 'styled-components' {
	export interface DefaultTheme extends themeType {}
}
