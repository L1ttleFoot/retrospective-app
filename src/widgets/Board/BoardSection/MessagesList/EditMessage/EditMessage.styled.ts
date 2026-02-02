import styled from 'styled-components';

export const TextArea = styled.textarea`
  border: none;
  font-size: 16px;
  height: 100%;
  resize: none;
  background: ${({theme}) => theme.backgroundThird};
  color: ${({theme}) => theme.color};

  &:focus {
    outline: none;
  }
`;
