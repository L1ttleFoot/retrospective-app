import styled from 'styled-components';
import {sizes} from '@consts/styles';

export const IconButton = styled.button<{$size: string; $withTheme?: boolean; $color?: string}>`
    background: transparent;
    border: none;
    width: ${({$size}) => sizes[$size]};
    height: ${({$size}) => sizes[$size]};
    padding: 0px;
    transition: all 0.3s ease-in-out;

    &:hover {
        opacity: 0.7;
    }

    & svg {
        width: 100%;
        height: 100%;
        fill: ${({theme, $withTheme}) => ($withTheme ? theme.color : 'none')};
        & * {
            stroke: ${({$color}) => $color};
        }
    }
`;
