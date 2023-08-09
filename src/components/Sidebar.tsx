import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import Animation from './Animation';

export interface LinkType {
    title: string;
    link: string;
    Icon: IconType;
}

const Sidebar = ({ sidebarTitle = 'Sidebar', sidebarItems = [] }: { sidebarTitle?: string; sidebarItems?: LinkType[]; }) => {

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => setShowMenu(prevState => !prevState);

    const SidebarItem = ({ title, link, Icon }: LinkType) => {
        return (
            <li key={link}>
                <Link href={link} className='p-2 font-bold text-primary-800 hover:animate-pulse focus:outline-none' onClick={() => setShowMenu(false)}>
                    <span className='flex flex-row gap-1 items-center'>
                        <Icon className='h-7 w-7' />
                        <Animation animation={showMenu ? 'expandLeft' : 'collapseLeft'} >
                            <span className='font-bold p-2 text-primary-950'>{title}</span>
                        </Animation>
                    </span>
                </Link>
            </li>
        );
    };

    const SidebarToggle = () => {
        return (
            <button
                onClick={toggleMenu}
                type='button'
                className='inline-flex items-center justify-center p-2 rounded-md text-primary-950 opacity-80 hover:opacity-100 active:-rotate-180 transition duration-500 ease-in-out'
                aria-controls='mobile-menu'
                aria-expanded={showMenu}
            >
                {showMenu ? <FaTimes className='block h-6 w-6' /> : <FaBars className='block h-6 w-6' />}
            </button>
        );
    };

    return (
        <div className='sticky print:hidden'>

            <aside className={`${showMenu ? 'fixed' : 'sticky'} w-1/2 h-[max(100%,100vh)]`}>
                <div className='flex flex-col items-center shadow-lg p-3 bg-primary-700 min-h-full w-fit max-w-fit z-40' >
                    <SidebarToggle />
                    <Animation animation={showMenu ? 'expandLeft' : 'collapseLeft'} >
                        <h1 className='font-bold p-2 text-primary-950'>{sidebarTitle}</h1>
                    </Animation>
                    <nav>
                        <ul>
                            {sidebarItems.map((item, index) =>
                                <SidebarItem {...item} key={index} />
                            )}
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>

    );
};

export default Sidebar;
