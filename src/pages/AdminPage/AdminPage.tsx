import {AdminDashboard} from '@/src/widgets/AdminDashboard';
import {AppBar} from '@/src/widgets/AppBar';

import * as Styled from './AdminPage.styled';

export const AdminPage = () => {
	return (
		<Styled.Wrapper>
			<AppBar />
			<Styled.AdminPage>
				<AdminDashboard />
			</Styled.AdminPage>
		</Styled.Wrapper>
	);
};
