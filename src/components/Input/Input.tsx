import React from "react";
import * as Styled from './Input.styled'

export const Input = ({...props}: React.InputHTMLAttributes<HTMLInputElement>) => {
    return(
        <Styled.Input {...props}/>
    )
}