import styled from 'styled-components';

export const IconButton = styled.button`
  background: transparent;
  border: none;
  width: 32px;
  height: 32px;
  padding: 5px;

  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 0.7;
  }

  & svg {
    max-width: 100%;
    max-height: 100%;
  }
`;
