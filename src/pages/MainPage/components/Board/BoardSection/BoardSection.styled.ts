import styled from 'styled-components';

export const BoardSection = styled.div`
    min-width: 180px;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const BoardSectionHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const BoardSectionBody = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    @media screen and (max-width: 955px) {
        justify-content: center;
    }
`;
