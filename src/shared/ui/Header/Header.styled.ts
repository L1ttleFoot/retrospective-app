import styled from 'styled-components';

export const Title = styled.div`
    width: 100%;
`;

export const MainTitle = styled.div<{$level: number}>`
    font-size: 24px;

    font-size: ${({$level}) => ($level === 1 ? 24 : 16)}px;
`;

export const SubTitle = styled.div`
    font-size: 14px;
    color:#97989a;

    display: flex;
    gap: 12px;
    width: 100%;
    
    /* Магия троеточия для ВСЕЙ строки на уровне контейнера */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    & * {
        color: inherit;
        font-size: inherit;

           /* Запрещаем тегам сжиматься, чтобы текст внутри них не ломался */
        flex-shrink: 0; 
        
        /* Если внутри тега есть свой display: flex (например, для точки и текста), 
           нужно сделать его inline-flex, чтобы троеточие контейнера работало корректно */
        display: inline-flex;
        align-items: center;
        gap: 4px;
    }

    
`;
