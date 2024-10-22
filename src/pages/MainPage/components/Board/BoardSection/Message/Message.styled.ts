import styled from 'styled-components';

export const Message = styled.div<{$color?: string; $input?: boolean}>`
    display: flex;
    justify-content: space-between;
    position: relative;
    width: calc(33% - 10px);
    min-width: 150px;
    height: 110px;
    padding: 10px 10px 0px 10px;
    margin: 5px;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border: 2px ${({$input}) => ($input ? 'dashed' : 'solid')} ${({$color}) => $color};
    background: ${({theme}) => theme.backgroundThird};
    box-shadow: 0 4px 16px 0 rgba(61, 72, 108, 0.16);
    word-wrap: break-word;
    overflow-y: auto;

    @media screen and (max-width: 955px) {
        width: 100%;
    }
`;

export const MessageText = styled.div``;

export const MessageBottom = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 3px;
    position: sticky;
    bottom: -0px;
    background: ${({theme}) => theme.backgroundThird};
    padding-bottom: 5px;
`;
