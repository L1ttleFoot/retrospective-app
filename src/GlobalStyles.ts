import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
   
    * {
        font-family: ${({theme}) =>
            theme.currentTheme === 'win98'
                ? "'Pixel', sans-serif"
                : "'PT Root UI', 'Roboto', Arial, sans-serif"};
    }
   
    @font-face {
        font-family: "Pixel";
        src: url('./fonts/high.ttf') format("truetype");
    }
`;
