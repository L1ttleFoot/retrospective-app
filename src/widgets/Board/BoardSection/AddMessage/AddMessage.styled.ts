import styled from 'styled-components';

export const Wrapper = styled.div<{$color?: string}>`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: calc(33% - 10px);
  min-width: 150px;
  height: 110px;
  padding: 16px 16px 2px 8px;
  margin: 5px;
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
