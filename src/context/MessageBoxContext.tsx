import MessageBox from '@/components/modals/MessageBox';
import React, { createContext, ReactNode, useContext, useState } from 'react';

export type MessageBoxButton = 'ok' | 'cancel' | 'yes' | 'no';


type MessageBoxContextType = {
    showMessageBox(message: string, title: string, buttons: MessageBoxButton[]): Promise<MessageBoxButton>;
};

const MessageBoxContext = createContext<MessageBoxContextType>({
    showMessageBox: () => Promise.resolve('cancel'),
});

export const useMessageBox = (): MessageBoxContextType => useContext(MessageBoxContext);


const MessageBoxProvider = ({ children }: { children: ReactNode; }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [availableButtons, setAvailableButtons] = useState<MessageBoxButton[]>(['ok']);
    // eslint-disable-next-line no-extra-parens
    const [resolveFn, setResolveFn] = useState<(button: MessageBoxButton) => void>(() => void 0);

    const showMessageBox = async (
        message: string,
        title: string,
        buttons: MessageBoxButton[]
    ) => {
        setIsVisible(true);
        setMessage(message);
        setTitle(title);
        setAvailableButtons(buttons);
        return new Promise<MessageBoxButton>((resolve) => {
            setResolveFn(() => resolve);

        });
    };
    const closeModal = (button: MessageBoxButton) => {
        setIsVisible(false);
        resolveFn(button);
    };

    return (
        <MessageBoxContext.Provider value={{ showMessageBox }}>
            <>
                {children}
                {isVisible &&
                    <MessageBox
                        isVisible={isVisible}
                        title={title}
                        message={message}
                        buttons={availableButtons}
                        onClose={closeModal}
                    />
                }
            </>
        </MessageBoxContext.Provider>
    );
};

export default MessageBoxProvider;
