import styled from 'styled-components';

export const CurrentReactions = styled.div<{
	$isSelected: boolean;
	$color?: string;
	$isMoreThenOne: boolean;
}>`
  display: flex;
  align-items: flex-end;
  font-size: 14px;
  border-radius: 8px;
  padding: ${({$isMoreThenOne}) => ($isMoreThenOne ? '2px 6px 2px 2px' : '2px')};;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  user-select: none;
  color: ${({$isSelected, theme}) => ($isSelected ? 'white' : theme.color)};
  border: 2px solid ${({$isSelected, $color}) => ($isSelected ? `${$color}BF` : `${$color}BF`)};
  background-color: ${({$isSelected, $color, theme}) => ($isSelected ? `color-mix(in srgb, ${$color}, black 10%);` : theme.backgroundThird)};

  &:hover {
    background-color: ${({$isSelected, $color, theme}) => ($isSelected ? `${$color}FF` : theme.currentTheme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.9)')};
    color: ${({$isSelected}) => ($isSelected ? `white` : 'black')};
  }
`;

export const ReactionValue = styled.div`
  filter: drop-shadow(rgba(0, 0, 0, 0.5) 0px 0px 1px); 
  font-size: 16px
`;

export const ReactionCount = styled.div`
  color: inherit;
`;
