import * as Styled from './AdminDashboard.styled';
import {ChangeEvent, useState} from 'react';
import {Button} from '@ui/Button';
import {useAdminDashboard} from './useAdminDashboard';
import {Table, TableProps} from '@ui/Table/Table';
import {Tab} from '@ui/Tab/Tab';

export const AdminDashboard = () => {
    const [model, setModel] = useState<'user' | 'role' | 'emoji' | undefined>(undefined);

    const {data} = useAdminDashboard({model});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setModel(e.target.value as 'user' | 'role' | 'emoji');
    };

    const tabs = [
        {label: 'Роли', value: 'role'},
        {label: 'Полльзователи', value: 'user'},
        {label: 'Эмодзи', value: 'emoji'},
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
        </Styled.AdminDashboard>
    );
};
