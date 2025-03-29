import {Emoji, Role, User} from '@src/shared/types/models';
import * as Styled from './Table.styled';

export interface TableProps {
    data: Record<string, string | number | object>[];
}

export const Table = ({data}: TableProps) => {
    if (!data.length) {
        return null;
    }

    const headers = Object.keys(data[0]);
    const values = data.map((item) => Object.values(item).map((item) => item.toString()));

    return (
        <Styled.Table>
            <Styled.Head>
                <Styled.Row>
                    {headers.map((head) => (
                        <Styled.HeadCell>{head}</Styled.HeadCell>
                    ))}
                </Styled.Row>
            </Styled.Head>
            <Styled.Body>
                {values.map((row) => (
                    <Styled.Row>
                        {row.map((cell) => (
                            <Styled.Cell>{cell}</Styled.Cell>
                        ))}
                    </Styled.Row>
                ))}
            </Styled.Body>
        </Styled.Table>
    );
};
