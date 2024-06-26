import * as Styled from './Button.styled'

export const Button = ({...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return(
        <Styled.Button {...props}/>
    )
}