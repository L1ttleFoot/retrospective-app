import styled from 'styled-components';

export const TemplatesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width:100%;
    margin-top:10px;
`;

export const TemplateItem = styled.div<{$isSelected?: boolean}>`
  padding: 10px;
  height: 45px;
  width: 100%;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  background: ${({theme}) => theme.backgroundFourth};
  box-shadow: 2px 4px 4px 0 rgba(61, 72, 108, 0.16);
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  border: ${({$isSelected, theme}) => ($isSelected ? `2px solid ${theme.colors.primary}` : '2px solid transparent')};

  ${({theme, $isSelected}) =>
		theme.currentTheme === 'win98' &&
		`
        border-radius: 0px;
        border: none;
        box-shadow: inset -1px -1px ${$isSelected ? theme.colors.primary : '#0a0a0a'}, inset 1px 1px #dfdfdf, inset -2px -2px ${$isSelected ? theme.colors.primary : 'grey'}, inset 2px 2px #fff;
      }
    `}
`;
