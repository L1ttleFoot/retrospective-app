import styled from 'styled-components';

export const WorkspaceArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const WorkspaceAreaHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const WorkspaceAreaBody = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

export const Input = styled.textarea`
    border: none;
    font-size: 16px;
    height: 100%;
    resize: none;

    &:focus {
        outline: none;
    }
`;

/*export const Input = styled.input`
    width:30%;
    height: 100px;
    padding: 20px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 4px 16px 0 rgba(61, 72, 108, 0.16), inset 0 -3px 28px 0 rgba(255, 255, 255, 0.4);
    border: none;
    font-size: 16px;

    &:focus {
        outline: none;
    }
`*/
