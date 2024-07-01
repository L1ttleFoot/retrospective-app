import styled from 'styled-components';

export const WorkspaceArea = styled.div`
    width: 33%;
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
