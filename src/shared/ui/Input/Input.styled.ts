import styled from 'styled-components';

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Input = styled.input<{$error?: boolean}>`
  width: 100%;
  height: 45px;
  padding: 8px;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.28;
  box-sizing: border-box;
  background-color: transparent;
  border-radius: 10px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({$error, theme}) => ($error ? theme.colors.error : theme.borderColor)};
  color: ${({theme}) => theme.color};
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({theme}) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({theme}) => theme.colorSecond};
  }

`;

export const Label = styled.label`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  pointer-events: none;
  color: #aaa;
`;
