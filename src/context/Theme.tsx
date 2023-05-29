import { createContext, Dispatch, useContext } from 'react';

export const ThemeContext = createContext<{
    theme: string;
    setTheme: Dispatch<string>;
}>({
    theme: '',
    setTheme: () => void 0,
});

export const useTheme = () => useContext(ThemeContext);

