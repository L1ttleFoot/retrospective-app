import styled from 'styled-components';
import {sizes} from '@consts/styles';

export const IconButton = styled.button<{$size: keyof typeof sizes; $withTheme?: boolean; $color?: string}>`
    background: transparent;
    border: none;
    width: ${({$size}) => sizes[$size]};
    height: ${({$size}) => sizes[$size]};
    padding: 0;
    transition: all 0.3s ease-in-out;
    min-width: ${({$size}) => sizes[$size]};
    min-height: ${({$size}) => sizes[$size]};

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
