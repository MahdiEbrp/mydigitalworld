import Animation from './Animation';
import Link from 'next/link';
import React, { ReactElement, useContext, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiBookBookmark, BiHomeHeart, BiUser } from 'react-icons/bi';
import { BsImages } from 'react-icons/bs';
import { CookieManager } from '@/lib/cookieManager';
import { FaBars, FaTimes } from 'react-icons/fa';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import { IconType } from 'react-icons/lib';
import { IoMdLogIn, IoMdPerson } from 'react-icons/io';
import { MdContactPage } from 'react-icons/md';
import { SignInModalContext } from '../context/SignInContext';
import { useSession } from 'next-auth/react';
import { useTheme } from '@/context/Theme';

const Navbar = () => {
    const { theme, setTheme } = useTheme();

    const [showMenu, setShowMenu] = useState(false);
    const { isModalVisible, setModalVisibility } = useContext(SignInModalContext);
    const toggleMenu = () => setShowMenu(prevState => !prevState);
    const toggleModal = () => setModalVisibility(!isModalVisible);
    const { data: session, status } = useSession();

    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('');
            CookieManager.setCookie('theme', 'light');
        } else {
            setTheme('dark');
            CookieManager.setCookie('theme', 'dark');

        }
    };

    const NavContainer = (props: { children: ReactElement | ReactElement[]; }) => {
        const { children } = props;
        return (
            <>
                <nav className='sticky print:hidden top-0 z-10 w-full md:max-h-20 shadow-lg p-3 bg-primary-800 '>
                    <div className='max-w-6xl mx-auto px-4'>
                        <div className='flex justify-between flex-col md:flex-row'>
                            {children}
                        </div>
                    </div>
                </nav >
            </>

        );
    };

    const HamburgerButton = () => {
        return (
            <button
                onClick={toggleMenu}
                type='button'
                className='inline-flex md:hidden items-center justify-center p-2 rounded-md text-primary-950 opacity-80 hover:opacity-100 active:-rotate-180 transition duration-500 ease-in-out hover:animate-pulse'
                aria-controls='mobile-menu'
                aria-expanded={showMenu}
            >
                {showMenu ? <FaTimes className='block h-6 w-6' /> : <FaBars className='block h-6 w-6' />}
            </button>
        );
    };
    const BrandLink = () => {
        return (
            <Link href='/' className='text-xl font-bold p-2 text-primary-950 hover:animate-pulse focus:outline-none'>
                Mebrp.com
            </Link>
        );
    };
    const ResponsiveContainer = (props: { children: ReactElement | ReactElement[]; }) => {
        const { children } = props;
        return (

            <Animation className='md:!block md:!max-h-[initial] md:!h-auto md:!w-auto' animation={`${showMenu ? 'expandTop' : 'collapseTop'}`}>
                <div className={'flex flex-col gap-2 md:translate-x-0 md:flex-row md:animate-none items-center space-x-1'}>
                    {children}
                </div>
            </Animation>
        );
    };
    const NavLink = (props: { title: string, url: string; Icon: IconType; }) => {
        const { title, url, Icon } = props;

        return (
            <Link href={url} className='p-2 font-bold text-primary-800 hover:animate-pulse focus:outline-none'>
                <span className='flex flex-row gap-1 items-end' onClick={() => setShowMenu(false)}>
                    <Icon className='h-7 w-7' />
                    {title}
                </span>
            </Link>
        );
    };
    const SwitchThemeButton = () => {
        return (
            <button
                onClick={toggleTheme}
                type='button'
                className='inline-flex items-center justify-center rounded-md text-primary-800 hover:animate-pulse active:-rotate-180 focus:outline-none transition duration-500 ease-in-out'
            >
                {theme === 'dark' ? <HiOutlineMoon className='h-8 w-8' /> : <HiOutlineSun className='h-8 w-8' />}
            </button>
        );
    };
    const LoginButton = () => {
        return (
            <button
                onClick={toggleModal}
                type='button'
                disabled={status === 'loading'}
                className='inline-flex items-center justify-center rounded-md text-primary-800 hover:animate-pulse active:-rotate-180 focus:outline-none transition duration-500 ease-in-out'
            >
                <>
                    {status === 'loading' ?
                        <AiOutlineLoading3Quarters className='text-4xl h-8 w-8 text-primary-800 opacity-70 animate-spin' />
                        :
                        <>
                            {session ? <IoMdPerson className='h-8 w-8' /> : <IoMdLogIn className='h-8 w-8' />}
                        </>
                    }
                </>

            </button>
        );
    };
    return (
        <NavContainer>
            <div className='flex items-center'>
                <HamburgerButton />
                <BrandLink />
            </div>
            <ResponsiveContainer>
                <NavLink title='Home' url='/' Icon={BiHomeHeart} />
                <NavLink title='Blog' url='/blog' Icon={BiBookBookmark} />
                <NavLink title='Gallery' url='/gallery' Icon={BsImages} />
                <NavLink title='Contact Me' url='/contact' Icon={MdContactPage} />
                <NavLink title='About Me' url='/about' Icon={BiUser} />
            </ResponsiveContainer>
            <ResponsiveContainer>
                <SwitchThemeButton />
                <LoginButton />
            </ResponsiveContainer>
        </NavContainer>

    );
};

export default Navbar;