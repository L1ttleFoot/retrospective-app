import styled from 'styled-components';

export const BoardSection = styled.div`
  min-width: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const BoardSectionHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const BoardSectionBody = styled.div<{$isDraggingOver: boolean}>`
  width: 100%;
  height: 100%;
  min-height: 50px;
  display: grid;
	grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	gap: 10px;
  align-content: start;
  transition:
    background-color 200ms ease-in-out,
    min-height 200ms ease-in-out;
  padding: 10px;
  border-radius: 10px;

  ${({$isDraggingOver}) =>
		$isDraggingOver &&
		`
    background:rgba(0,128,128,0.1);
    min-height:120px;
    
  `};

  @media screen and (max-width: 955px) {
    justify-content: center;
  }
`;
