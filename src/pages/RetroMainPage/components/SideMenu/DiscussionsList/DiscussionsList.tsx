import {createSearchParams, useNavigate} from 'react-router-dom';
import * as Styled from './DiscussionsList.styled';
import {DiscussionsItem} from './DiscussionsItem';
import {useDiscussions} from '../../../../../store/useDiscussions';
import {useEffect} from 'react';
import {useDiscussionData} from './useDiscussionsData';

export const DiscussionsList = () => {
    useDiscussionData();

    const navigate = useNavigate();

    const {discussionsData, currentDiscussionId, setCurrentDiscussionId} = useDiscussions();

    useEffect(() => {
        if (currentDiscussionId) {
            navigate({
                pathname: '/',
                search: createSearchParams({id: currentDiscussionId ?? ''}).toString(),
            });
        }
    }, [currentDiscussionId, navigate]);

    const setCurrent = (id: string) => {
        if (currentDiscussionId === id) return;

        setCurrentDiscussionId(id.toString());
    };

    return (
        <Styled.DiscussionsList>
            {discussionsData.map((item) => (
                <DiscussionsItem key={item.id} setCurrent={() => setCurrent(item.id)} item={item} />
            ))}
        </Styled.DiscussionsList>
    );
};
