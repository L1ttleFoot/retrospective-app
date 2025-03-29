import styled from 'styled-components';

export const Button = styled.button<{$fullWidth?: boolean}>`
    max-width: ${({$fullWidth}) => ($fullWidth ? undefined : '180px')};
    width: 100%;
    height: 40px;
    display: block;
    border: none;
    border-radius: 10px;
    transition-property: background-color;
    text-align: center;
    font-size: 14px;
    line-height: 1.25;
    background-color: ${({theme}) => theme.colors.primary};
    color: #ffffff;
    font-weight: 500;
    position: relative;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    transition-property: background-color;

    &:disabled {
        background-color: ${({theme}) => theme.disabled};
        color: #c0c9d8;
        cursor: default;
    }

    ${({theme}) =>
        theme.currentTheme === 'win98' &&
        `
        background: silver;
        border: none;
        border-radius: 0;
        box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf;
        box-sizing: border-box;
        color: transparent;
        min-height: 23px;
        min-width: 75px;
        padding: 0 12px;
        text-shadow: 0 0 #222;

        &:focus {
            outline: 1px dotted #000;
            outline-offset: -4px;
        }

        &:not(:disabled):active {
            box-shadow: inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey;
            text-shadow: 1px 1px #222;
        }

        &:disabled {
            background: #C0C0C0;
            color: #808080;
            cursor: default;
            box-shadow: inset 1px 1px 0px #FFFFFF, inset -1px -1px 0px #808080;
            text-shadow: 1px 1px 0 #fff;
        }
      }
    `}
`;
