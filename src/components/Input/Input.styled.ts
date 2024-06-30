import styled from 'styled-components';

export const Input = styled.input`
    display: block;
    width: 100%;
    height: 32px;
    padding: 8px 0;
    font-family: 'PT Root UI', 'Roboto', Arial, sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.28;
    box-sizing: border-box;
    background-color: transparent;
    border: 0 solid transparent;
    border-bottom: 1px solid #3d486c;
    color: #3d486c;
    margin: 10px;

    &:focus {
        outline: none;
    }
`;
