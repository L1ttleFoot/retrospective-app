import styled from 'styled-components';

export const Selector = styled.div<{$open: boolean}>`
    position: absolute;
    top: 80px;
    left: ${({$open}) => ($open ? '20px' : '-250px')};
    padding: 15px;
    height: calc(100% - 100px);
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    width: 250px;
    transition: left 0.5s ease-in-out;
    border-radius: 10px;
    background: rgb(255, 255, 255);
    box-shadow:
        0 4px 16px 0 rgba(61, 72, 108, 0.16),
        inset 0 -3px 28px 0 rgba(255, 255, 255, 0.4);
    z-index: 100;
`;
