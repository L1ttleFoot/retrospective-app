import {animated} from '@react-spring/web';
import styled from 'styled-components';

export const BoardsItem = styled(animated.div)<{$isCurrent?: boolean}>`
  padding: 10px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  background: ${({theme}) => theme.backgroundFourth};
  box-shadow: ${({theme}) => theme.boxShadow};
  cursor: pointer;
  align-items: center;
  gap: 5px;
  border: 2px solid ${({$isCurrent, theme}) => ($isCurrent ? `${theme.colors.primary}` : `transparent`)};

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
