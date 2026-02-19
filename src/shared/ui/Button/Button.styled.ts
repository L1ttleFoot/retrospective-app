import styled, {css} from 'styled-components';

export const Button = styled.button<{$fullWidth?: boolean; $variant?: 'primary' | 'outline'}>`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: ${({$fullWidth}) => ($fullWidth ? undefined : '180px')};
  width: 100%;
  height: 45px;
  min-height: 45px;
  border: none;
  border-radius: 10px;
  text-align: center;
  font-size: 16px;
  line-height: 1.25;
  background-color: ${({theme}) => theme.colors.primary};
  color: #ffffff;
  font-weight: 500;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out,
                transform 0.1s ease-in-out;

  &:disabled {
    background-color: ${({theme}) => theme.disabled};
    color: #c0c9d8;
    cursor: default;
  }

  &:active {
    transform: scale(0.98);
  }

  ${({$variant}) =>
		$variant === 'outline' &&
		css`
    background-color:${(props) => props.theme.backgroundThird};
    color:${({theme}) => theme.color};
    border: ${({theme}) => `2px solid ${theme.colors.primary}`};
    `}


  & svg {
    & * {
      stroke: ${({theme}) => theme.colors.primary};
    }
  }

  ${({theme}) =>
		theme.currentTheme === 'win98' &&
		`
        background: silver;
        border: none;
        border-radius: 0;
        box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf;
        box-sizing: border-box;
        color: transparent;
        min-height: 23px;
        min-width: 75px;
        padding: 0 12px;
        text-shadow: 0 0 #222;

        &:focus {
            outline: 1px dotted #000;
            outline-offset: -4px;
        }

        &:not(:disabled):active {
            box-shadow: inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey;
            text-shadow: 1px 1px #222;
        }

        &:disabled {
            background: #C0C0C0;
            color: #808080;
            cursor: default;
            box-shadow: inset 1px 1px 0px #FFFFFF, inset -1px -1px 0px #808080;
            text-shadow: 1px 1px 0 #fff;
        }
      }
    `}
`;
