import { ReactNode, useEffect, useState } from 'react';

type AnimationType = 'none' | 'expandTop' | 'collapseTop' | 'expandLeft' | 'collapseLeft';

type AnimationProps = {
    children: ReactNode;
    animation: AnimationType;
    className?: string;
    delay?: number;
    onAnimationDone?: () => void;
};

const getAnimationStyle = (animation: AnimationType, isAnimationDone: boolean) => {
    switch (animation) {
        case 'collapseLeft':
            return isAnimationDone ? 'max-h-0 max-w-0' : 'max-h-5 max-w-screen';
        case 'expandLeft':
            return isAnimationDone ? 'max-h-screen max-w-screen' : 'max-h-0 max-w-0';
        case 'expandTop':
            return isAnimationDone ? 'max-h-screen' : 'max-h-0';
        case 'collapseTop':
            return isAnimationDone ? 'max-h-0 max-w-screen' : 'max-h-screen';
        default:
            return '';
    }
};

const ANIMATION_DURATION = 2000;
let prevAnimation = '';

const AnimatedContainer = ({ children, animation, className = '', onAnimationDone, delay = 0 }: AnimationProps) => {
    const baseStyle = `overflow-hidden transition-all duration-${ANIMATION_DURATION}ms`;
    const isAnimationDone = prevAnimation === animation;
    const [style, setStyle] = useState(`${baseStyle} ${getAnimationStyle(animation, isAnimationDone)}`);

    useEffect(() => {
        if (isAnimationDone) {
            onAnimationDone?.();
            return;
        }
        const timeoutId = setTimeout(() => {
            setStyle(`${baseStyle} ${getAnimationStyle(animation, true)}`);
            prevAnimation = animation;
        }, delay);
        return () => clearTimeout(timeoutId);
    }, [animation, baseStyle, delay, isAnimationDone, onAnimationDone]);

    return <div className={`${className} ${style}`}>{children}</div>;
};

export default AnimatedContainer;
