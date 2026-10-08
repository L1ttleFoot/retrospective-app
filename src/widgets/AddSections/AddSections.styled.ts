import styled from 'styled-components';

export const AddSections = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: ${({theme}) => theme.backgroundThird};
    box-shadow: ${({theme}) => theme.boxShadow};
    padding: 12px 24px;
    width: 600px;
    
    height: 650px; 
    max-height: 800px;

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
