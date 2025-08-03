import styled from 'styled-components';

export const MessageItem = styled.div<{$color?: string; $isBeingDragged?: boolean}>`
  display: flex;
  justify-content: space-between;
  position: relative;
  min-width: 150px;
  height: 110px;
  padding: 18px 18px 2px 10px;
  margin: 5px;
  font-size: 16px;
  flex-direction: column;
  border-radius: 10px;
  border: 2px solid ${({$color}) => $color};
  background: ${({theme}) => theme.backgroundThird};
  box-shadow: 0 4px 16px 0 rgba(61, 72, 108, 0.16);
  word-wrap: break-word;
  overflow-y: auto;
  opacity: ${({$isBeingDragged}) => ($isBeingDragged ? 0.6 : 1)};
  width: ${({$isBeingDragged}) => ($isBeingDragged ? 'clamp(200px,30%, 300px)' : null)};
  display: ${({$isBeingDragged}) => ($isBeingDragged ? 'none' : 'flex')};

  /* @media screen and (max-width: 955px) {
        width: 100%;
    } */

  ${({theme, $color}) =>
		theme.currentTheme === 'win98' &&
		`
        border-radius: 0px;
        border: none;
        box-shadow: inset -1px -1px ${$color}, inset 1px 1px #dfdfdf, inset -2px -2px ${$color}, inset 2px 2px #fff;
        }
    `}
`;

export const MessageItemText = styled.div``;

export const MessageItemBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 3px;
  position: sticky;
  bottom: -0px;
  background: ${({theme}) => theme.backgroundThird};
  padding-bottom: 5px;
`;
