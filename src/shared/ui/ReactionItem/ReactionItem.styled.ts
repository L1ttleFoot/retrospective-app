import styled from 'styled-components';

export const ReactionItem = styled.span`
  cursor: pointer;
  min-width: 22px;
  transition: background-color .3s ease;
  border-radius: 5px;

  &:hover {
    background-color: ${({theme}) => (theme.currentTheme === 'light' ? '#d6dfe9' : '#666666')};
  }


`;
