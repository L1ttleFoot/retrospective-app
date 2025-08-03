import styled from 'styled-components';

export const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RadioInput = styled.input.attrs({type: 'radio'})`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

export const RadioStyled = styled.span<{checked: boolean; disabled?: boolean}>`
  width: 16px;
  height: 16px;
  display: inline-block;
  border-radius: 10px;
  border: none;
  background-color: ${({theme}) => theme.colors.primary};
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background-color: #ffffff;
    border-radius: 50%;
    display: ${({checked}) => (checked ? 'block' : 'none')};
  }

  &:disabled {
    background-color: ${({theme}) => theme.disabled};
    cursor: default;
  }

  ${({theme, checked, disabled}) =>
		theme.currentTheme === 'win98' &&
		`
        background: silver;
        border: none;
        
        box-shadow: ${
					checked
						? 'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey'
						: 'inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf'
				};
        box-sizing: border-box;

        &::after {
            background-color: transparent;
            border: 2px solid #000;
            width: 6px;
            height: 6px;
        }

        &:disabled {
            background: #C0C0C0;
            box-shadow: inset 1px 1px 0px #FFFFFF, inset -1px -1px 0px #808080;
            &::after {
                border-color: #808080;
            }
        }
    `}
`;

export const RadioLabel = styled.label<{disabled?: boolean}>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  line-height: 1.25;
  font-weight: 500;
  cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};

  ${({theme}) =>
		theme.currentTheme === 'win98' &&
		`
        color: #222;
    `}
`;
