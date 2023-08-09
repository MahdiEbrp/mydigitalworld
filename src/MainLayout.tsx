import CommentModalProvider from './context/CommentContext';
import Footer from './components/Footer';
import MessageBoxProvider from './context/MessageBoxContext';
import Navbar from '@/components/Navbar';
import SignIn from './components/modals/SignIn';
import StarParticles from '@/components/GeometricParticle';
import ToastProvider from './context/ToastContext';
import { CookieManager } from './lib/cookieManager';
import { ReactElement, useEffect, useState } from 'react';
import { SignInModalContext } from './context/SignInContext';
import { ThemeContext } from '@/context/Theme';

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
                <ToastProvider>
                    <CommentModalProvider>
                        <MessageBoxProvider>
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
                                <Footer />
                            </div>
                        </MessageBoxProvider>
                        <StarParticles />
                    </CommentModalProvider>
                </ToastProvider>
            </SignInModalContext.Provider>
        </ThemeContext.Provider>
    );
};
export default MainLayout;
