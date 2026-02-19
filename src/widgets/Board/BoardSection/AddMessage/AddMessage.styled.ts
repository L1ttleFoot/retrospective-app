import styled from 'styled-components';

export const Wrapper = styled.div<{$color?: string}>`
  display: flex;
  justify-content: space-between;
  position: relative;
  min-width: 150px;
  height: 100px;
  padding: 10px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 2px dashed ${({$color}) => $color};
  background: ${({theme}) => theme.backgroundThird};
  box-shadow: 0 4px 16px 0 rgba(61, 72, 108, 0.16);
  word-wrap: break-word;
  overflow-y: auto;

  @media screen and (max-width: 955px) {
    width: 100%;
  }

  ${({theme}) =>
		theme.currentTheme === 'win98' &&
		`
        border-radius: 0px;
        box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px grey, inset 2px 2px #fff;
        }
    `}
`;

export const Input = styled.textarea`
  border: none;
  font-size: 16px;
  height: 100%;
  resize: none;
  background: ${({theme}) => theme.backgroundThird};
  color: ${({theme}) => theme.color};

  &:focus {
    outline: none;
  }
`;

export const ActionsArea = styled.div<{$color?: string}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 30px;
  height: 100%;
  overflow: hidden;
  background-color: ${({$color}) => $color};;
  border-radius: 0 8px 8px 0;
  word-break: break-word;

  & button {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    color: white;
  }
`;
