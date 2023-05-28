import Toast from '@/components/Toast';
import React, { createContext, ReactNode, useContext } from 'react';
import ReactDOM from 'react-dom';

type SeverityType = 'info' | 'warning' | 'success' | 'error';

type ToastContextProps = {
    showToast: (message: string, severity: SeverityType, duration?: number) => void;
};

export const ToastContext = createContext<ToastContextProps>({
    showToast: () => void 0,
});

export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }: { children: ReactNode; }) => {

    const showToast = (message: string, severity: SeverityType, duration = 5000) => {

        if (typeof document === 'undefined') return;

        const toastElement = document.createElement('div');
        const toastID = Math.random().toString(36).substring(2, 9);
        toastElement.id = `toast-${toastID}`;
        document.body.appendChild(toastElement);

        const handleClose = () => {
            const element = document.getElementById(`toast-${toastID}`);
            if (element) {
                document.body.removeChild(element);
            }
        };

        ReactDOM.render(
            <Toast message={message} severity={severity} show={true} duration={duration} onClose={handleClose} />,
            toastElement
        );

    };

    const value = { showToast };

    return (
        <ToastContext.Provider value={value}>
            {children}
        </ToastContext.Provider>
    );
};

export default ToastProvider;
