import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  padding: 20px;
  gap: 10px;
  background: ${({theme}) => theme.backgroundPrimary};
  color: ${({theme}) => theme.color};
`;

export const Template = styled.div`
  height: 100%;
  width: 100%;
`;

export const ChartWrapper = styled.div`
  width: min-content;
  border-radius: 10px;
  background: rgb(255, 255, 255);
  box-shadow: 0 4px 16px 0 rgba(61, 72, 108, 0.16);
  width: 70%;
  height: 500px;
`;

export const TestSandboxes = styled.div`
  min-height: 500px;
  min-width: 500px;
  border: 1px solid teal;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
`;
