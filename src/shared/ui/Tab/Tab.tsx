import {ChangeEvent, useState} from 'react';
import * as Styled from './Tab.styled';

interface ITab {
    label: string;
    value: string;
    name: string;
    checked: boolean;
    disabled?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Tab = ({value, name, checked, disabled, onChange, label}: ITab) => {
    return (
        <Styled.TabWrapper>
            <Styled.TabLabel disabled={disabled}>
                <Styled.TabInput
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                />
                <Styled.TabStyled checked={checked} disabled={disabled}>
                    {<span>{label}</span>}
                </Styled.TabStyled>
            </Styled.TabLabel>
        </Styled.TabWrapper>
    );
};
