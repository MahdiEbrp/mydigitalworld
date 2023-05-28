import React, { useContext, useEffect, useMemo, useState } from 'react';
import Button from './Button';
import { FaTimes } from 'react-icons/fa';
import { ThemeContext } from '@/context/Theme';

type ToastProps = {
    message: string;
    severity: 'info' | 'warning' | 'success' | 'error';
    duration: number;
    show: boolean;
    onClose: () => void;
};

export const ANIMATION_DELAY = 500;

const Toast: React.FC<ToastProps> = ({ message, severity, show, duration, onClose }) => {
    const [isVisible, setIsVisible] = useState(show);
    const { theme } = useContext(ThemeContext);

    const totalDuration = duration + ANIMATION_DELAY;
    const darkSeverity = severity + '_dark';

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsVisible(false);
        }
            , totalDuration);
        return () => clearTimeout(timeoutId);
    }, [totalDuration]);

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

    const style = useMemo(
        () => `${theme === 'dark' ? darkSeverity : severity} flex items-center gap-1 p-4 m-2 max-w-xs rounded shadow ${isVisible ? 'opacity-100 left-0' : 'opacity-0 left-[-200px] pointer-events-none'} transition-all duration-${[ANIMATION_DELAY]} bg-primary-300 text-primary-800 absolute top-20 z-[9999] animate-slideInFromTop`,
        [theme, darkSeverity, severity, isVisible]
    );

    return (
        <div className={style} role='alert'>
            <div className='text-sm font-normal'>{message}</div>
            <Button type='button' className='!p-1' aria-label='Close' onClick={handleClose}>
                <FaTimes />
            </Button>
        </div>
    );
};

export default Toast;
