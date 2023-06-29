import React, { RefObject } from 'react';

type TextAreaProps = {
    children?: React.ReactNode;
    inputRef?: RefObject<HTMLTextAreaElement>;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = ({ children, inputRef, ...rest }: TextAreaProps) => {

    const { className } = { ...rest };

    return (
        <textarea
            {...rest} className={`${className ? className : ''} border border-primary-100 rounded block text-base resize-none shadow-sm w-full px-4 py-2 leading-5 text-input bg-input  focus:outline-none focus:bg-input focus:border-primary-100 placeholder:text-placeholder`}
            ref={inputRef}
        >
            {children}
        </textarea>
    );
};

export default TextArea;