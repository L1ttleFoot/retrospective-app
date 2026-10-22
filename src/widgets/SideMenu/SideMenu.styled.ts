import styled from 'styled-components';

export const Selector = styled.div<{$open: boolean}>`
  position: absolute;
  top: 80px;
  left: ${({$open}) => ($open ? '20px' : '-285px')};
  padding: 12px 18px;
  height: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
  width: 280px;
  transition: left 0.5s ease-in-out;
  border-radius: 10px;
  background: ${({theme}) => theme.backgroundThird};
  box-shadow: ${({theme}) => theme.boxShadow};
  
  border: 1px solid ${({theme}) => (theme.currentTheme === 'light' ? 'transparent' : '#ffffff14')};
  z-index: 100;

 
`;
