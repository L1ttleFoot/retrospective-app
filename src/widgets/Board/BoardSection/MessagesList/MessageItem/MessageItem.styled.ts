import styled from 'styled-components';

export const MessageItem = styled.div<{$color?: string; $isBeingDragged?: boolean}>`
  display: flex;
  justify-content: space-between;
  position: relative;
  min-width: 150px;
  height: 100px;
  padding: 10px;
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

export const ActionsArea = styled.div<{$color?: string}>`
  position: absolute;
	top: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	width: 12px;
	height: 100%;
	overflow: hidden;
	background-color: ${({$color}) => $color};;
	border-radius: 0 8px 8px 0;
	transition: width 0.2s ease;
  word-break: break-word;

  &:hover {
    width: 30px;
  }

  & button {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    color: white;
    opacity: 0;
    transform: scale(0.5);
    transition:
		opacity 0.2s ease,
		transform 0.2s ease;
    pointer-events: auto;
  }

  &:hover button {
    opacity: 1;
	  transform: scale(1);
    animation: delay-pointer-events 0.6s linear;
  }

  @keyframes delay-pointer-events {
    0% {
      pointer-events: none;
    }
    100% {
      pointer-events: auto;
    }
  }
`;
