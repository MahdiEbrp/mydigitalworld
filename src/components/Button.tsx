import { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export type ButtonProps = {
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...rest }: ButtonProps) => {
    const { className, disabled } = rest;

    return (
        <button
            {...rest}
            className={twMerge(
                'flex justify-center print:hidden items-center outline-none m-1 disabled:opacity-25 font-bold text-primary-800 p-2 rounded bg-primary-800',
                !disabled && 'hover:animate-pulse active:bg-primary-950 focus-within:animate-pulse focus:bg-primary-900',
                'transition-all',
                className
            )}
        >
            {children}
        </button>
    );
};

export default Button;