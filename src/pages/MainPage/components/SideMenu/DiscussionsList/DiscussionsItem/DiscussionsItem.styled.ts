import styled from 'styled-components';
import {animated} from 'react-spring';

export const DiscussionsItem = styled(animated.div)<{$isCurrent?: boolean}>`
    padding: 10px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    background: ${({theme}) => theme.backgroundThird};
    box-shadow: 2px 4px 4px 0 rgba(61, 72, 108, 0.16);
    cursor: pointer;
    align-items: center;
    gap: 5px;
    border: ${({$isCurrent, theme}) => ($isCurrent ? `1px solid ${theme.colors.primary}` : null)};
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.span``;

export const Date = styled.span`
    font-size: 11px;
    color: ${({theme}) => theme.colorSecond};
`;
