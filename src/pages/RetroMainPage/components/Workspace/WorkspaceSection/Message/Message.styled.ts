import styled from 'styled-components';

export const Message = styled.div<{color?: string}>`
    position: relative;
    width: calc(33% - 10px);
    min-width: 150px;
    height: 100px;
    padding: 10px;
    margin: 5px;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border: 2px solid ${({color}) => color};
    background: rgba(255, 255, 255, 0.7);
    box-shadow:
        0 4px 16px 0 rgba(61, 72, 108, 0.16),
        inset 0 -3px 28px 0 rgba(255, 255, 255, 0.4);
    word-wrap: break-word;
    overflow: hidden;
`;
