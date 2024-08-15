import styled from 'styled-components';

export const Button = styled.button`
    //width: 0;
    height: 40px;
    display: block;
    border: none;
    border-radius: 10px;
    transition-property: background-color;
    text-align: center;
    font-size: 16px;
    line-height: 1.25;
    background-color: #3d3bee;
    color: #ffffff;
    min-width: 180px;
    font-weight: 500;
    position: relative;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    transition-property: background-color;

    &:disabled {
        background-color: #f5f5f7;
        color: #c0c9d8;
        cursor: default;
    }
`;
