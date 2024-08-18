import styled from 'styled-components';
import {colorsList} from './ColorPicker.consts';

export const ColorPicker = styled.div<{color: string}>`
    width: 24px;
    height: 24px;
    background-color: ${({color}) => color || colorsList.gray};
    border-radius: 5px;
    padding: 0.5rem;
    cursor: pointer;
`;

export const Colors = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    background-color: white;
    border-radius: 10px;
    z-index: 1000;
    padding: 10px;
    box-shadow:
        0 4px 16px 0 rgba(61, 72, 108, 0.16),
        inset 0 -3px 28px 0 rgba(255, 255, 255, 0.4);
`;

export const Color = styled.div<{color: string; currentColor: string}>`
    width: ${({color, currentColor}) => (color === currentColor ? '22px' : '20px')};
    height: ${({color, currentColor}) => (color === currentColor ? '22px' : '20px')};
    border-radius: 5px;
    background-color: ${({color}) => color};
    transition: all 0.3s ease-in-out;
    &:hover {
        transform: ${({color, currentColor}) =>
            color === currentColor ? 'scale(1)' : 'scale(1.1)'};
    }
    box-shadow:
        0 4px 16px 0 rgba(61, 72, 108, 0.16),
        inset 0 -3px 28px 0 rgba(255, 255, 255, 0.4);
`;
