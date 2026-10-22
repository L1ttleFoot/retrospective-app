import styled from 'styled-components';

export const AdminDashboard = styled.div`
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
  border-radius: 10px;
  background: ${({theme}) => theme.backgroundSecond};
  box-shadow: ${({theme}) => theme.boxShadow};

  @media screen and (max-width: 660px) {
    flex-direction: column;
    justify-content: flex-start;
  }

 
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

export const CreateWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CreateActions = styled.div`
  display: flex;
  gap:20px
`;
