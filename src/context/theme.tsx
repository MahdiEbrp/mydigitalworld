import { createContext, Dispatch } from 'react';

export const ThemeContext = createContext<{
    theme: string;
    setTheme: Dispatch<string>;
}>({
    theme: '',
    setTheme: () => void 0,
});