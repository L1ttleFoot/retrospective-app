import * as Styled from './SideMenu.styled';
import {useLocation} from 'react-router-dom';
import {CreateDiscussion} from './CreateDiscassion';
import {DiscussionsList} from './DiscussionsList';
import {useEffect} from 'react';
import {getCurrentUser} from '@utils/getCurrentUser';
import {useDiscussions} from '@store/useDiscussions';

export const SideMenu = ({open}: {open: boolean}) => {
    const currentUser = getCurrentUser();

    const {search} = useLocation();
    const {setCurrentDiscussionId} = useDiscussions();

    let params = Object.fromEntries(new URLSearchParams(search));

    useEffect(() => {
        setCurrentDiscussionId(params.id);
    }, [params.id, setCurrentDiscussionId]);

    return (
        <Styled.Selector $open={open}>
            {currentUser && (
                <>
                    <CreateDiscussion />
                    <DiscussionsList />
                </>
            )}
        </Styled.Selector>
    );
};
