import styled from 'styled-components';

export const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RadioInput = styled.input.attrs({type: 'radio'})`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

export const RadioStyled = styled.span<{checked: boolean; disabled?: boolean}>`
  width: 16px;
  height: 16px;
  display: inline-block;
  border-radius: 10px;
  border: none;
  background-color: ${({theme}) => theme.colors.primary};
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background-color: #ffffff;
    border-radius: 50%;
    display: ${({checked}) => (checked ? 'block' : 'none')};
  }

  &:disabled {
    background-color: ${({theme}) => theme.disabled};
    cursor: default;
  }

`;

export const RadioLabel = styled.label<{disabled?: boolean}>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  line-height: 1.25;
  font-weight: 500;
  cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};
`;
