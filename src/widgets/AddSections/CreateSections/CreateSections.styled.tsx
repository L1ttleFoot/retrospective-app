import styled from 'styled-components';

export const TemplateForm = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;  
  min-height: 0;  

  flex: 1;

  ${({theme}) =>
		theme.currentTheme === 'win98' &&
		`
        border-radius: 0px;
        box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px grey, inset 2px 2px #fff;
        }
    `}
`;

export const SectionsConfig = styled.div`
  margin-top: 6px;
  flex: 1;            
  overflow-y: auto;  
  min-height: 0;      
  
  padding-right: 4px;

  scrollbar-gutter: stable; 
`;

export const SectionConfigRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
  padding: 12px 16px;
  border-radius: 10px;
  background-color: ${({theme}) => theme.backgroundFourth};
  border: 2px solid;
  border-color: ${({theme}) => theme.borderColor};

  &:first-child{
    margin-top: 0px;
  }
`;

export const ControlButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 5px;
  width: 100%;
`;
