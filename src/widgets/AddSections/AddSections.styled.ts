import styled from 'styled-components';

export const AddSections = styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    background-color: ${({theme}) => theme.backgroundThird};
    box-shadow: 0 4px 16px 0 rgba(61, 72, 108, 0.16);
    padding: 20px;
    height: 500px;
    align-items: flex-start;
    gap:15px;

    animation: slideUp .3s cubic-bezier(0.00,0.00,0.20,1.00) forwards;

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(60px) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;
