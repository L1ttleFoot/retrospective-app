import styled from 'styled-components';

export const Container = styled.div`
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    box-shadow: ${({theme}) => theme.boxShadow};
`;
