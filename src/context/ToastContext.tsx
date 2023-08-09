import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import Toast from '@/components/Toast';
import { useTheme } from './Theme';

type ToastProps = {
    message: string;
    severity: SeverityType;
    duration: number;
    show: boolean;
    onClose: () => void;
};

type ToastQueueItem = {
    id: number;
    props: ToastProps;
};

type SeverityType = 'info' | 'warning' | 'success' | 'error';

type ToastContextProps = {
    showToast: (message: string, severity: SeverityType, duration?: number) => void;
};


const ToastContext = createContext<ToastContextProps>({
    showToast: () => void 0,
});

export const useToast = () => useContext(ToastContext);

let toastIdCounter = 0;

export const ToastProvider = ({ children }: { children: ReactNode; }) => {
    const [toastQueue, setToastQueue] = useState<ToastQueueItem[]>([]);
    const { theme } = useTheme();

    const showToast = useCallback((message: string, severity: SeverityType, duration = 3000) => {
        const toastId = ++toastIdCounter;
        const toastProps: ToastProps = {
            message,
            severity,
            duration,
            show: true,
            onClose: () => {
                setToastQueue(queue => queue.filter(item => item.id !== toastId));
            },
        };
        setToastQueue(queue => [...queue, { id: toastId, props: toastProps }]);
    }, []);
    useEffect(() => {
        if (!toastQueue.length) {
            toastIdCounter = 0;
        }
    }, [toastQueue]);

    const value = { showToast };
    return (
        <ToastContext.Provider value={value}>
            {children}
            {toastQueue.map(({ id, props }) => {
                const { severity, ...rest } = props;
                const style = `${severity}${theme === 'dark' ? '_dark' : ''}`;
                return (
                    <div key={id} className={style}>
                        <Toast {...rest} />
                    </div>
                );
            })}
        </ToastContext.Provider>
    );
};


export default ToastProvider;
