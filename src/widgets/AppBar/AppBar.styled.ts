import styled from 'styled-components';

export const AppBar = styled.div`
    height: 50px;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
    background: ${({theme}) => theme.backgroundSecond};
    box-shadow: 0 4px 16px 0 rgba(61, 72, 108, 0.16);

    ${({theme}) =>
        theme.currentTheme === 'win98' &&
        `
        border-radius: 0px;
        box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px grey, inset 2px 2px #fff;
        }
    `}
`;
