import styled from 'styled-components';

export const LoadingSpiner = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #52b788;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
`;
