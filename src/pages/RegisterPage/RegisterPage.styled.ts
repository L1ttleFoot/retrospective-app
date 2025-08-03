import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  height: 100%;
  background: ${({theme}) => theme.backgroundPrimary};
  color: ${({theme}) => theme.color};
`;

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  width: 350px;
  border-radius: 10px;
  background: ${({theme}) => theme.backgroundSecond};
  box-shadow: 0 4px 16px 0 rgba(61, 72, 108, 0.16);

  ${({theme}) =>
		theme.currentTheme === 'win98' &&
		`
        border-radius: 0px;
        box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px grey, inset 2px 2px #fff;
        }
    `}
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 25px;
`;

export const Error = styled.div`
  color: ${({theme}) => theme.colors.error};
  font-size: 12px;
  margin: 0px 0px 5px 0px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`;
