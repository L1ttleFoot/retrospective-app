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

  //box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  //box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  //box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;


  

  ${({theme}) =>
		theme.currentTheme === 'win98' &&
		`
        border-radius: 0px;
        box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px grey, inset 2px 2px #fff;
        }
    `}
`;
