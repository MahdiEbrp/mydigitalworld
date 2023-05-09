import React from 'react';
import { IconType } from 'react-icons';

type CircleButtonProps = {
    children: React.ReactElement<IconType>;
} & React.HTMLAttributes<HTMLButtonElement>;

const CircleButton: React.FC<CircleButtonProps> = ({ children, ...rest }) => {
    return (
        <button
            className='flex justify-center items-center w-8 h-8 m-1 hover:animate-pulse rounded-full bg-primaryBackground-800 hover:bg-primaryBackground-700 text-primary-800 transition-colors'
            {...rest}
        >
            {React.cloneElement(children)}
        </button>
    );
};

export default CircleButton;
