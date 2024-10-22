import styled from 'styled-components';

export const ToggleButton = styled.button<{$value: boolean}>`
    background-color: #52b788;
    border: none;
    border-radius: 99px;
    width: 40px;
    height: 24px;
    cursor: pointer;
    position: relative;

    &::after {
        content: '';
        height: 16px;
        width: 16px;
        background-color: white;
        border-radius: 99px;
        transform: translateY(-50%);
        left: ${({$value}) => ($value ? '3px' : '19px')};
        position: absolute;
        transition: left 0.1s ease-in-out;
    }
`;
