import styled from 'styled-components';

export const Table = styled.table`
    background-color: #fff;
    border-collapse: collapse;
`;

export const Head = styled.thead``;

export const Body = styled.tbody``;

export const Row = styled.tr``;

export const HeadCell = styled.th`
    background: silver;
    box-shadow:
        inset -1px -1px #0a0a0a,
        inset 1px 1px #fff,
        inset -2px -2px grey,
        inset 2px 2px #dfdfdf;
    box-sizing: border-box;
    font-weight: 400;
    height: 17px;
    padding: 0 6px;
    position: sticky;
    top: 0;
`;

export const Cell = styled.td`
    padding: 0 6px;
`;
