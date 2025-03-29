import styled from 'styled-components';

export const InputWrapper = styled.div`
    position: relative;
    width: 100%;
`;

export const Input = styled.input<{$error?: boolean}>`
    width: 100%;
    height: 45px;
    padding: 8px;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.28;
    box-sizing: border-box;
    background-color: transparent;
    border-radius: 10px;
    border-width: 1px;
    border-style: solid;
    border-color: ${({$error, theme}) => ($error ? theme.colors.error : theme.color)};
    color: ${({theme}) => theme.color};
    margin-bottom: 10px;
    transition: border-color 0.3s ease;

    &:focus {
        outline: none;
        border-color: ${({theme}) => theme.colors.primary};
    }

    &::placeholder {
        color: ${({theme}) => theme.secondColor};
    }

    ${({theme}) =>
        theme.currentTheme === 'win98' &&
        `
        background-color: #fff;
        border-radius: 0px;
        border: none;
        box-shadow:  inset -1px -1px #fff, inset 1px 1px grey, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;
      }
    `}
`;

export const Label = styled.label`
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    transition: all 0.3s ease;
    pointer-events: none;
    color: #aaa;
`;
