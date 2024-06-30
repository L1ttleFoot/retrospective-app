import styled from 'styled-components';

export const Workspace = styled.div`
    padding: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    gap: 20px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow:
        0 4px 16px 0 rgba(61, 72, 108, 0.16),
        inset 0 -3px 28px 0 rgba(255, 255, 255, 0.4);
`;

export const EmptyWorkspace = styled.div`
    padding: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 20px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow:
        0 4px 16px 0 rgba(61, 72, 108, 0.16),
        inset 0 -3px 28px 0 rgba(255, 255, 255, 0.4);
`;
