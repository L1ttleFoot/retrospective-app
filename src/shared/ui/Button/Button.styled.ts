import styled, {css} from 'styled-components';

export const Button = styled.button<{$fullWidth?: boolean; $variant?: 'primary' | 'outline'}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap:10px;
  max-width: ${({$fullWidth}) => ($fullWidth ? undefined : '180px')};
  width: 100%;
  height: 45px;
  min-height: 45px;
  border: none;
  border-radius: 10px;
  text-align: center;
  font-size: 16px;
  line-height: 1.25;
  background-color: ${({theme}) => theme.colors.primary};
  color: #ffffff;
  font-weight: 500;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out,
                transform 0.1s ease-in-out;

  &:disabled {
    background-color: ${({theme}) => theme.disabled};
    color: #c0c9d8;
    cursor: default;
  }

  &:active {
    transform: scale(0.98);
  }

  ${({$variant}) =>
		$variant === 'outline' &&
		css`
    background-color:${(props) => props.theme.backgroundThird};
    color:${({theme}) => theme.color};
    border: ${({theme}) => `2px solid ${theme.colors.primary}`};
    `}


  & svg {
    & * {
      stroke: ${({theme}) => theme.colors.primary};
    }
  }
`;
