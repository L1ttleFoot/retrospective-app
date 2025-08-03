import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {useAuth} from '@/store/useAuth';
import {useDiscussions} from '@/store/useDiscussions';

import {CreateDiscussion} from './CreateDiscassion';
import {DiscussionsList} from './DiscussionsList';
import * as Styled from './SideMenu.styled';

export const SideMenu = ({open}: {open: boolean}) => {
	const {isAuth} = useAuth();

	const {search} = useLocation();
	const {setCurrentDiscussionId} = useDiscussions();

	const params = Object.fromEntries(new URLSearchParams(search));

	useEffect(() => {
		setCurrentDiscussionId(params.id);
	}, [params.id, setCurrentDiscussionId]);

	return (
		<Styled.Selector $open={open}>
			{isAuth && (
				<>
					<CreateDiscussion />
					<DiscussionsList />
				</>
			)}
		</Styled.Selector>
	);
};
