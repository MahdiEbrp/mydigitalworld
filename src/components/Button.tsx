import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonProps = {
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...rest }: ButtonProps) => {
    const { className } = { ...rest };
    const { disabled } = { ...rest };
    return (
        <button {...rest} className={`${className ? className : ''} flex justify-center print:hidden items-center outline-none m-1 disabled:opacity-25 font-bold text-primary-800 p-2 rounded bg-primary-800 ${!disabled ? 'hover:animate-pulse active:bg-primary-950 focus-within:animate-pulse focus:bg-primary-900' : ''} transition-all`}>
            {children}
        </button>
    );
};

export default Button;
