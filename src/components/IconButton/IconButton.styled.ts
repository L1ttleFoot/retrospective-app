import styled from 'styled-components';
import {sizes} from '../../consts/styles';

export const IconButton = styled.button<{$size: string}>`
    background: transparent;
    border: none;
    width: 32px;
    height: 32px;
    padding: 5px;
    transition: opacity 0.3s ease-in-out;

    &:hover {
        opacity: 0.7;
    }

    & svg {
        max-width: ${({$size}) => sizes[$size]};
        max-height: ${({$size}) => sizes[$size]};
    }
`;
