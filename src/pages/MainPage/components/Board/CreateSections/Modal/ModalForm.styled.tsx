import styled from 'styled-components';

export const ModalForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
    box-shadow:
        0 4px 16px 0 rgba(61, 72, 108, 0.16),
        inset 0 -3px 28px 0 rgba(255, 255, 255, 0.4);
`;

export const SectionNameInput = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px 0;
`;

export const ControlButtons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
    margin-top: 10px;
    width: 100%;
`;
