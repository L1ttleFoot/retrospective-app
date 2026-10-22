import clsx from 'clsx';

import {type ButtonVariants, buttonRecipe} from './Button.css';

type ButtonProps = ButtonVariants & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({fullWidth, variant, ...props}: ButtonProps) => {
	return <button className={clsx(buttonRecipe({fullWidth, variant}))} {...props} />;
};
