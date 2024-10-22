import 'styled-components';
import {ligthPalette, theme} from './theme';

type themeType = typeof theme & typeof ligthPalette;

declare module 'styled-components' {
    export interface DefaultTheme extends themeType {}
}
