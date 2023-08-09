import Button from './Button';
import React, { HTMLAttributes, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

type ToastProps = {
    message: string;
    duration: number;
    show: boolean;
    onClose: () => void;
} & HTMLAttributes<HTMLDivElement>;

export const ANIMATION_DELAY = 500;

const Toast: React.FC<ToastProps> = ({ message, show, duration, onClose, ...rest }) => {
    const [isVisible, setIsVisible] = useState(show);
    const { className } = { ...rest };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsVisible(false);
        }, duration + ANIMATION_DELAY);

        return () => clearTimeout(timeoutId);
    }, [duration]);

    useEffect(() => {

        if (!isVisible) {
            const timeoutId = setTimeout(() => {
                onClose();
            }
                , ANIMATION_DELAY);
            return () => clearTimeout(timeoutId);
        }
    }, [isVisible, onClose]);

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        <div {...rest}
            className={`flex items-center gap-1 p-4 m-2 max-w-xs rounded shadow ${isVisible ? 'opacity-100 left-0' : 'opacity-0 left-[-200px] pointer-events-none'
                } transition-all duration-${[ANIMATION_DELAY]} bg-primary-300 text-primary-800 absolute top-20 z-[9999] animate-slideInFromTop ${className ? className : ''}`}
            role='alert'
        >
            <div className='text-sm font-normal'>{message}</div>
            <Button type='button' className='!p-1' aria-label='Close' onClick={handleClose}>
                <FaTimes />
            </Button>
        </div>
    );
};

export default Toast;
