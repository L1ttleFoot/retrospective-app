import styled from 'styled-components';

export const Selector = styled.div<{$open: boolean}>`
  position: absolute;
  top: 80px;
  left: ${({$open}) => ($open ? '20px' : '-285px')};
  padding: 15px;
  height: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
  width: 280px;
  transition: left 0.5s ease-in-out;
  border-radius: 10px;
  background: ${({theme}) => theme.backgroundSecond};
  box-shadow: 0 4px 16px 0 rgba(61, 72, 108, 0.16);
  z-index: 100;

  ${({theme}) =>
		theme.currentTheme === 'win98' &&
		`
        border-radius: 0px;
        box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px grey, inset 2px 2px #fff;
        }
    `}
`;
