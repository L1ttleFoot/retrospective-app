import styled from 'styled-components';

export const AdminDashboard = styled.div`
    margin: 20px;
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
    border-radius: 10px;
    background: ${({theme}) => theme.backgroundSecond};
    box-shadow: 0 4px 16px 0 rgba(61, 72, 108, 0.16);

    @media screen and (max-width: 660px) {
        flex-direction: column;
        justify-content: flex-start;
    }

    ${({theme}) =>
        theme.currentTheme === 'win98' &&
        `
        border-radius: 0px;
        box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px grey, inset 2px 2px #fff;
      }
    `}
`;

export const DashboarHeader = styled.div`
    text-align: center;
`;
export const DashboardBody = styled.div``;

export const Tabs = styled.div`
    display: flex;
    height: 40px;
    align-items: end;
`;
