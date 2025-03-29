import * as Styled from './SideMenu.styled';
import {useLocation} from 'react-router-dom';
import {CreateDiscussion} from './CreateDiscassion';
import {DiscussionsList} from './DiscussionsList';
import {useEffect} from 'react';

import {useDiscussions} from '@store/useDiscussions';
import {useAuth} from '@store/useAuth';

export const SideMenu = ({open}: {open: boolean}) => {
    const {userData} = useAuth();

    const {search} = useLocation();
    const {setCurrentDiscussionId} = useDiscussions();

    let params = Object.fromEntries(new URLSearchParams(search));

    useEffect(() => {
        setCurrentDiscussionId(params.id);
    }, [params.id, setCurrentDiscussionId]);

    return (
        <Styled.Selector $open={open}>
            {userData && (
                <>
                    <CreateDiscussion />
                    <DiscussionsList />
                </>
            )}
        </Styled.Selector>
    );
};
