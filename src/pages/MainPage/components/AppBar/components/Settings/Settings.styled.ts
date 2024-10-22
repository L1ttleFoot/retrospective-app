import styled from 'styled-components';

export const Modal = styled.div`
    background: ${({theme}) => theme.backgroundThird};
    border-radius: 10px;
    padding: 10px;
    max-width: 210px;
    box-shadow: 0 4px 16px 0 rgba(61, 72, 108, 0.16);
`;
