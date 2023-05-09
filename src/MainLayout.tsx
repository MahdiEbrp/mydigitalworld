import Navbar from '@/components/Navbar';
import { ThemeContext } from '@/context/theme';
import { ReactElement, useEffect, useState } from 'react';
import StarParticles from '@/components/GeometricParticle';
import { CookieManager } from './lib/cookieManager';

export const MainLayout = ({ children }: { children?: ReactElement; }) => {
    const [theme, setTheme] = useState<string>('');

    useEffect(() => {
        const savedTheme = CookieManager.getCookie('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            setTheme('');
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className={`flex flex-col h-[100vh] min-h-[max(100%,100vh)] bg-gradient-to-b from-primaryBackground-300 via-primaryBackground-200 to-primaryBackground-100 ${theme}`}>
                <nav className='flex-shrink-0'>
                    <Navbar />
                </nav>
                <main className='z-20 flex-grow overflow-x-hidden'>
                    {children}
                </main>
                <footer className='bg-gray-800 text-white flex-shrink-0'>
                    Support
                </footer>
            </div>
            <StarParticles />
        </ThemeContext.Provider>
    );
};
export default MainLayout;
