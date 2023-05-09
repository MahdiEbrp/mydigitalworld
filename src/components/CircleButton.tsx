import React, { ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

type CircleButtonProps = {
    children: React.ReactElement<IconType>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const CircleButton: React.FC<CircleButtonProps> = ({ children, ...rest }) => {
    return (
        <button
            className='flex justify-center items-center w-8 h-8 m-1 disabled:opacity-25 rounded-full bg-primaryBackground-800 hover:bg-primaryBackground-700 text-primary-800 transition-all'
            {...rest}
        >
            {React.cloneElement(children)}
        </button>
    );
};

export default CircleButton;
