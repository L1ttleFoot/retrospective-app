import styled from 'styled-components';

export const TemplatesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width:100%;
    margin-top:10px;
    position: relative;
`;

export const TemplateItem = styled.div<{$isSelected?: boolean}>`
  padding: 10px;
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  background: ${({theme}) => theme.backgroundFifth};
  box-shadow: 2px 4px 4px 0 rgba(61, 72, 108, 0.16);
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  border: 2px solid ${({$isSelected, theme}) => ($isSelected ? `${theme.colors.primary}` : 'transparent')};

  border-color: ${({theme}) => theme.borderColor};
  
 
`;

export const DD = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px 0px;
    padding: 12px 16px;
    border-radius: 10px;
    background-color: rgb(66, 66, 66);
    border: 2px solid rgba(255, 255, 255, 0.08);
    justify-content: space-between;
    cursor: pointer;
    background: ${({theme}) => theme.backgroundFourth};
    border-color: ${({theme}) => theme.borderColor};
`;

export const DDD = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:10px;
`;

export const List = styled.div`
  position: absolute;
  top:70px;
  z-index: 3;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap:10px;
  background: ${({theme}) => theme.backgroundFourth};
  border: 1px solid #ffffff14;
  box-shadow: 2px 4px 4px 0 rgba(61, 72, 108, 0.16);
  border-color: ${({theme}) => theme.borderColor};
`;
