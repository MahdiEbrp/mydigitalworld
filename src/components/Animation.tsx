import React, { useRef, ReactNode, useEffect, useLayoutEffect } from 'react';

type AnimationType = 'none' | 'expandTop' | 'collapseTop' | 'expandLeft' | 'collapseLeft';
type Props = {
    children: ReactNode;
    animation: AnimationType;
    className?: string;
    duration?: number;
};

const CAN_USE_DOM = Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);

const useIsomorphicLayoutEffect = CAN_USE_DOM ? useLayoutEffect : useEffect;

const AnimatedDiv = ({ children, animation, className, duration = 300 }: Props) => {
    const mainDiv = useRef<HTMLDivElement>(null);

    useIsomorphicLayoutEffect(() => {
        if (!mainDiv.current) return;

        switch (animation) {
            case 'expandLeft':
                mainDiv.current.style.maxWidth = '0';
                mainDiv.current.style.maxHeight = '';
                mainDiv.current.style.transition = `all ${duration}ms`;
                setTimeout(() => {
                    if (mainDiv.current) {
                        mainDiv.current.style.maxWidth = '100vw';
                    }
                }, 0);
                break;
            case 'collapseLeft':
                if (mainDiv.current) {
                    mainDiv.current.style.transition = `all ${duration}ms`;
                    mainDiv.current.style.maxWidth = '0';
                    setTimeout(() => {
                        if (mainDiv.current) {
                            setTimeout(() => {
                                if (mainDiv.current) {
                                    mainDiv.current.style.maxHeight = '0';
                                    mainDiv.current.style.transition = '';
                                }
                            }, duration);
                        }
                    }, 0);
                }
                break;
            case 'expandTop':
                mainDiv.current.style.maxHeight = '0';
                mainDiv.current.style.transition = `all ${duration}ms`;
                setTimeout(() => {
                    if (mainDiv.current) {
                        mainDiv.current.style.maxHeight = '100vh';
                    }
                }, 0);
                break;
            case 'collapseTop':
                if (mainDiv.current) {
                    mainDiv.current.style.maxHeight = '100vh';
                    setTimeout(() => {
                        if (mainDiv.current) {
                            mainDiv.current.style.maxHeight = '0';
                            mainDiv.current.style.transition = `all ${duration}ms`;
                            setTimeout(() => {
                                if (mainDiv.current) {
                                    mainDiv.current.style.width = '0';
                                    mainDiv.current.style.height = '0';
                                    mainDiv.current.style.transition = '';
                                }
                            }, duration);
                        }
                    }, 0);
                }
                break;
            default: // 'none'
                mainDiv.current.style.maxHeight = '';
                mainDiv.current.style.maxWidth = '';
                mainDiv.current.style.transition = '';
                break;
        }

    }, [animation, duration]);

    return (
        <div ref={mainDiv} className={className} style={{ overflow: 'hidden' }}>
            {children}
        </div>
    );
};

export default AnimatedDiv;
