import styled from 'styled-components';

export const TabWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TabInput = styled.input.attrs({type: 'Radio'})`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

export const TabStyled = styled.span<{checked: boolean; disabled?: boolean}>`
  padding: 6px;
  display: inline-block;
  border: none;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  background-color: ${({theme}) => theme.colors.primary};
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  z-index: 1;

  ${({checked}) =>
		checked &&
		`
        background-color: silver;
        margin-left: -3px;
        padding-bottom: 2px;
        position: relative;
        height: 34px;
        z-index: 8;
    `}

  box-shadow: inset -1px 0 #0a0a0a, inset 1px 1px #dfdfdf, inset -2px 0 grey, inset 2px 2px #fff;

  &:disabled {
    background-color: ${({theme}) => theme.disabled};
    cursor: default;
  }

  ${({theme, checked, disabled}) =>
		theme.currentTheme === 'win98' &&
		`
        background: silver;
        border: none;
        
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

export const TabLabel = styled.label<{disabled?: boolean}>`
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
