import {createSearchParams, useNavigate} from 'react-router-dom';
import * as Styled from './DiscassionsList.styled';
import {WorkspaceListItem} from './componets/WorkspaceListItem';
import {useDiscassions} from '../../../../../store/useDiscassions';
import {useEffect} from 'react';

export const DiscassionsList = () => {
    const navigate = useNavigate();

    const {discassionsData, currentDiscassionId, setCurrentDiscassionId} = useDiscassions();

    useEffect(() => {
        if (currentDiscassionId) {
            navigate({
                pathname: '/',
                search: createSearchParams({id: currentDiscassionId ?? ''}).toString(),
            });
        }
    }, [currentDiscassionId, navigate]);

    const setCurrent = (id: string) => {
        if (currentDiscassionId === id) return;

        setCurrentDiscassionId(id.toString());
    };

    return (
        <Styled.DiscassionsList>
            {discassionsData.map((item) => (
                <WorkspaceListItem
                    key={item.id}
                    setCurrent={() => setCurrent(item.id)}
                    item={item}
                />
            ))}
        </Styled.DiscassionsList>
    );
};
