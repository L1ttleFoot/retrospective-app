import styled from 'styled-components';

export const Backdrop = styled.div<{$isTransparent: boolean}>`
    position: absolute;
    inset: 0;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({$isTransparent}) => ($isTransparent ? 'transparent' : 'rgba(0, 0, 0, 0.2)')};
    backdrop-filter: ${({$isTransparent}) => ($isTransparent ? null : 'blur(5px)')};
    z-index: 2;
`;
