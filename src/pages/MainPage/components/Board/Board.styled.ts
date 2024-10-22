import styled from 'styled-components';

export const Board = styled.div`
    padding: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    gap: 20px;
    overflow-y: auto;
    border-radius: 10px;
    background: ${({theme}) => theme.backgroundSecond};
    box-shadow: 0 4px 16px 0 rgba(61, 72, 108, 0.16);
    position: relative;

    @media screen and (max-width: 660px) {
        flex-direction: column;
        justify-content: flex-start;
    }
`;

export const EmptyBoard = styled.div`
    padding: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 20px;
    border-radius: 10px;
    background: ${({theme}) => theme.backgroundSecond};
    box-shadow: 0 4px 16px 0 rgba(61, 72, 108, 0.16);
`;
