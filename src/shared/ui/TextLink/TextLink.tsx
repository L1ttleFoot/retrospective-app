import React from 'react';
import * as Styled from './TextLink.styled';

interface TextLinkProps {
    to: string;
    children: React.ReactNode;
}

export const TextLink: React.FC<TextLinkProps> = ({to, children}) => {
    return <Styled.TextLink to={to}>{children}</Styled.TextLink>;
};
