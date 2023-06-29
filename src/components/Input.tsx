import React, { RefObject } from 'react';

type InputProps = {
    children?: React.ReactNode;
    inputRef?: RefObject<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ children, inputRef, ...rest }: InputProps) => {

    const { className } = { ...rest };

    return (
        <input
            {...rest} className={`${className ? className : ''} block text-base resize-none shadow-sm w-full px-4 py-2 leading-5 text-input bg-input  focus:outline-none focus:bg-input focus:border-primary-100 placeholder:text-placeholder`}
            ref={inputRef}
        >
            {children}
        </input>
    );
};

export default Input;