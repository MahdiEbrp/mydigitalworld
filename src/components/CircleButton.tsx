import React, { ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';
import Button from './Button';

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
