import {animated} from '@react-spring/web';
import styled from 'styled-components';

export const DiscussionsItem = styled(animated.div)<{$isCurrent?: boolean}>`
  padding: 10px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  background: ${({theme}) => theme.backgroundThird};
  box-shadow: 2px 4px 4px 0 rgba(61, 72, 108, 0.16);
  cursor: pointer;
  align-items: center;
  gap: 5px;
  border: ${({$isCurrent, theme}) => ($isCurrent ? `2px solid ${theme.colors.primary}` : `2px solid transparent`)};

  

  ${({theme, $isCurrent}) =>
		theme.currentTheme === 'win98' &&
		`
        border-radius: 0px;
        border: none;
        box-shadow: inset -1px -1px ${$isCurrent ? theme.colors.primary : '#0a0a0a'}, inset 1px 1px #dfdfdf, inset -2px -2px ${$isCurrent ? theme.colors.primary : 'grey'}, inset 2px 2px #fff;
      
    `}
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.span``;

export const Date = styled.span`
  font-size: 11px;
  color: ${({theme}) => theme.colorSecond};
`;
