import {DeleteMessage} from '../DeleteMessage';
import {VoteUp} from '../VoteUp';
import * as Styled from './Message.styled';
import {ReactNode} from 'react';

export interface IWorkspaceSection {
    id: string;
    areaId: string;
    areaIndex: number;
    text: string;
    votes: number;
    color: string;
}

interface IWorkspaceItem extends Partial<IWorkspaceSection> {
    input?: ReactNode;
}

export const Message = (props: IWorkspaceItem) => {
    const {id, text, input, votes, color} = props;

    if (input) {
        return (
            <Styled.Message color={color} input={!!input}>
                {input}
            </Styled.Message>
        );
    }

    return (
        <Styled.Message color={color}>
            {text}
            <DeleteMessage id={id} />
            <VoteUp id={id} votes={votes} />
        </Styled.Message>
    );
};
