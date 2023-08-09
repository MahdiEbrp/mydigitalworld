import { createContext, Dispatch } from 'react';

export const SignInModalContext = createContext<{
    isModalVisible: boolean;
    setModalVisibility: Dispatch<boolean>;
}>({
    isModalVisible: false,
    setModalVisibility: () => void 0,
});
