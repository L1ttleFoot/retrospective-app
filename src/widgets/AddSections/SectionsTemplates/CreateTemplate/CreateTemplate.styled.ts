import styled from 'styled-components';

export const CreateTemplate = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    border-radius: 10px;
    padding: 5px;
    transition: background-color 0.3s ease-in-out,
                transform 0.1s ease-in-out;
    

    &:hover{
        background-color: #62fab323;
    }
`;
