import Navbar from '@/components/Navbar';
import SignIn from './components/modals/SignIn';
import StarParticles from '@/components/GeometricParticle';
import { CookieManager } from './lib/cookieManager';
import { ReactElement, useEffect, useState } from 'react';
import { SignInModalContext } from './context/SignInContext';
import { ThemeContext } from '@/context/Theme';
import { AuthContextProvider } from './context/AuthContext';

export const MainLayout = ({ children }: { children?: ReactElement; }) => {
    const [theme, setTheme] = useState<string>('');
    const [isModalVisible, setModalVisibility] = useState(false);

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
            <SignInModalContext.Provider value={{ isModalVisible, setModalVisibility }}>
                <AuthContextProvider>
                    <div className={`flex flex-col h-[100vh] min-h-[max(100%,100vh)] bg-gradient-to-b from-primaryBackground-300 via-primaryBackground-200 to-primaryBackground-100 ${theme}`}>
                        <nav className='flex-shrink-0'>
                            <Navbar />
                        </nav>
                        <main className='z-20 flex-grow overflow-x-hidden'>
                            <>
                                {children}
                            </>
                            <SignIn />
                        </main>
                        <footer className='bg-gray-800 text-white flex-shrink-0'>
                            Support
                        </footer>
                    </div>
                    <StarParticles />
                </AuthContextProvider>
            </SignInModalContext.Provider>
        </ThemeContext.Provider>
    );
};
export default MainLayout;
