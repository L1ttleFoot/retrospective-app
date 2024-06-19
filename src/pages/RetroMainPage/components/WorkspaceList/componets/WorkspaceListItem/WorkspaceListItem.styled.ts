import styled from "styled-components";

export const WorkspaceListItem = styled.div<{isCurrent: boolean}>`
    padding: 10px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 4px 16px 0 rgba(61, 72, 108, 0.16), inset 0 -3px 28px 0 rgba(255, 255, 255, 0.4);
    justify-content: center;
    cursor: pointer;
    gap:5px;
    border: ${({ isCurrent }) => (isCurrent ? "1px solid #3d3bee" : null)};
`

export const Label = styled.span`

`

export const Date = styled.span`
    font-size: 11px;
    color: rgba(0, 0, 0, 0.6)
`