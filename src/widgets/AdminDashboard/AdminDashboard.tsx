import {useState} from 'react';

import {Button} from '@/ui/Button';
import {Input} from '@/ui/Input';
import {Tab} from '@/ui/Tab/Tab';
import {Table, TableProps} from '@/ui/Table/Table';

import * as Styled from './AdminDashboard.styled';
import {CreateReaction} from './CreateReaction';
import {useAdminDashboard} from './useAdminDashboard';

export const AdminDashboard = () => {
	const [model, setModel] = useState<'user' | 'role' | 'reaction' | undefined>('role');

	const {data} = useAdminDashboard({model});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setModel(e.target.value as 'user' | 'role' | 'reaction');
	};

	const tabs = [
		{label: 'Роли', value: 'role'},
		{label: 'Полльзователи', value: 'user'},
		{label: 'Реакции', value: 'reaction'},
	] as const;

	return (
		<Styled.AdminDashboard>
			<Styled.DashboarHeader>Admin Dashboard</Styled.DashboarHeader>
			<Styled.DashboardBody>
				<Styled.Tabs>
					{tabs.map((tab) => (
						<Tab
							key={tab.value}
							name="AdminTabs"
							value={tab.value}
							checked={model === tab.value}
							label={tab.label}
							onChange={handleChange}
						/>
					))}
				</Styled.Tabs>
				{data && <Table data={data as unknown as TableProps['data']} />}
			</Styled.DashboardBody>

			{model === 'role' && (
				<Styled.CreateWrapper>
					<h3>Создать роль</h3>
					<Styled.CreateActions>
						<Input />
						<Button>Создать</Button>
					</Styled.CreateActions>
				</Styled.CreateWrapper>
			)}
			{model === 'user' && (
				<Styled.CreateWrapper>
					<h3>Создать пользователя</h3>
					<Styled.CreateActions>
						<Input />
						<Input />
						<Input />
						<Button>Создать</Button>
					</Styled.CreateActions>
				</Styled.CreateWrapper>
			)}
			{model === 'reaction' && <CreateReaction />}
		</Styled.AdminDashboard>
	);
};
