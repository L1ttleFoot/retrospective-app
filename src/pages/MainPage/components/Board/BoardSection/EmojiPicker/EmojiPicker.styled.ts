import styled from 'styled-components';

export const OpenSelector = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 5px 0 rgba(61, 72, 108, 0.16);
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }
`;

export const Emojis = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    background-color: white;
    border-radius: 10px;
    z-index: 1000;
    padding: 10px;
    box-shadow: 0 4px 16px 0 rgba(61, 72, 108, 0.16);
    max-width: 210px;
    flex-wrap: wrap;
`;
