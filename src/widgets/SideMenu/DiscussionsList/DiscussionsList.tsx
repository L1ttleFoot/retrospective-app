import {createSearchParams, useNavigate} from 'react-router-dom';
import * as Styled from './DiscussionsList.styled';
import {DiscussionsItem} from './DiscussionsItem';
import {useEffect} from 'react';
import {useDiscussionData} from './useDiscussionsData';
import {useTransition} from 'react-spring';
import {Discussion, useDiscussions} from '@store/useDiscussions';

export const DiscussionsList = () => {
    const {discussionsData} = useDiscussionData();

    const navigate = useNavigate();

    const {currentDiscussionId, setCurrentDiscussionId} = useDiscussions();

    /* useEffect(() => {
        if (currentDiscussionId) {
            navigate({
                pathname: '/',
                search: createSearchParams({id: currentDiscussionId ?? ''}).toString(),
            });
        }
    }, [currentDiscussionId, navigate]); */

    const setCurrent = (id: string) => {
        if (currentDiscussionId === id) return;

        setCurrentDiscussionId(id.toString());

        navigate({
            pathname: '/',
            search: createSearchParams({id: id ?? ''}).toString(),
        });
    };

    const transitions = useTransition(discussionsData ?? [], {
        key: (item: Discussion) => item.id,
        from: {x: '-20rem', opacity: 0},
        enter: {x: '0rem', opacity: 1},
        leave: {x: '-20rem', opacity: 0},
        config: {duration: 300},
    });

    return (
        <Styled.DiscussionsList>
            {transitions((style, item) => (
                <DiscussionsItem
                    key={item.id}
                    setCurrent={() => setCurrent(item.id)}
                    style={style}
                    item={item}
                />
            ))}
        </Styled.DiscussionsList>
    );
};
