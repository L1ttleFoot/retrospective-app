import {ChangeEvent, useState} from 'react';
import * as Styled from './Radio.styled';

interface IRadio {
    label?: string;
    value: string;
    name: string;
    checked: boolean;
    disabled?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Radio = ({value, name, checked, disabled, onChange, label}: IRadio) => {
    return (
        <Styled.RadioWrapper>
            <Styled.RadioLabel disabled={disabled}>
                <Styled.RadioInput
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                />
                <Styled.RadioStyled checked={checked} disabled={disabled} />
                {label && <span>{label}</span>}
            </Styled.RadioLabel>
        </Styled.RadioWrapper>
    );
};
