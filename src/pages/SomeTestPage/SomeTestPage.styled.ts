import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: teal;
  height: 100%;
  display: flex;
`;

export const Main = styled.div`
  margin: 20px;
  padding: 10px;
  background-color: white;
  flex: 1;
  border-radius: 10px;
  position: relative;
`;

export const Block = styled.div.attrs((props) => ({style: {left: props.x, top: props.y}}))<{
	x: number;
	y: number;
}>`
  position: absolute;
  width: 100px;
  height: 100px;
  border: 3px solid teal;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: grab;
`;

export const Text = styled.p`
  user-select: none;
`;
