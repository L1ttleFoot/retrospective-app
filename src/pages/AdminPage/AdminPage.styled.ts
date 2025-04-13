import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding: 20px;
    gap: 10px;
    background: ${({theme}) => theme.backgroundPrimary};
    color: ${({theme}) => theme.color};
`;

export const AdminPage = styled.div`
    height: 100%;
    width: 100%;
`;
