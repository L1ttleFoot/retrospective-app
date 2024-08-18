import styled from 'styled-components';

export const Button = styled.button<{fullWidth?: boolean}>`
    max-width: ${({fullWidth}) => (fullWidth ? undefined : '180px')};
    width: 100%;
    height: 40px;
    display: block;
    border: none;
    border-radius: 10px;
    transition-property: background-color;
    text-align: center;
    font-size: 16px;
    line-height: 1.25;
    background-color: ${({theme}) => theme.colors.primary};
    color: #ffffff;
    font-weight: 500;
    position: relative;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    transition-property: background-color;

    &:disabled {
        background-color: #f5f5f7;
        color: #c0c9d8;
        cursor: default;
    }
`;
