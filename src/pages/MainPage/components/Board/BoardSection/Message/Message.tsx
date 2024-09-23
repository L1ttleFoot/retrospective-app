import {DeleteMessage} from '../DeleteMessage';
import {VoteUp} from '../VoteUp';
import * as Styled from './Message.styled';
import {ReactNode} from 'react';

export interface IBoardSection {
    id: string;
    sectionId: string;
    sectionIndex: number;
    text: string;
    votes: number;
    color: string;
}

interface IBoardItem extends Partial<IBoardSection> {
    input?: ReactNode;
}

export const Message = (props: IBoardItem) => {
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
