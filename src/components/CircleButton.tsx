import Button from './Button';
import React, { ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

type CircleButtonProps = {
    children: React.ReactElement<IconType>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const CircleButton: React.FC<CircleButtonProps> = ({ children, ...rest }) => {
    return (
        <Button
            className='rounded-full'
            {...rest}
        >
            {React.cloneElement(children)}
        </Button>
    );
};

export default CircleButton;
