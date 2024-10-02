import styled from 'styled-components';

export const CurrentEmojis = styled.div<{$selected: boolean}>`
    font-size: 14px;
    border-radius: 10px;
    padding: 2px 4px;
    cursor: pointer;
    box-shadow: 0 4px 5px 0 rgba(61, 72, 108, 0.16);
    transition: background-color 0.3s ease-in-out;
    user-select: none;
    border: ${({$selected}) => ($selected ? '1px solid #52b788' : '1px solid white')};

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;
