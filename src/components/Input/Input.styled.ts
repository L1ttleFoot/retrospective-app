import styled from 'styled-components';

export const Input = styled.input<{$error?: boolean}>`
    display: block;
    width: 100%;
    height: 32px;
    padding: 8px 0;
    font-family: 'PT Root UI', 'Roboto', Arial, sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.28;
    box-sizing: border-box;
    background-color: transparent;
    border: 0 solid transparent;
    border-bottom: 1px solid ${({$error, theme}) => ($error ? theme.colors.error : theme.color)};
    color: ${({theme}) => theme.color};
    margin: 10px;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: ${({theme}) => theme.secondColor};
    }
`;
