import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
   
    * {
        font-family: ${({theme}) => (theme.currentTheme === 'win98' ? "'Pixel', sans-serif" : "'Roboto', Arial, sans-serif")};
        color: ${({theme}) => theme.color};
    }


    @font-face {
        font-family: "Pixel";
        src: url('./fonts/high.ttf') format("truetype");
    }

    @font-face {
        font-family: "Pixel1";
        src: url('./fonts/pixel.otf') format("opentype");
    }
`;
