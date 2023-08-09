import Head from 'next/head';
import React, { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { FaBullseye, FaHeadphonesAlt, FaTv, FaFilm, FaBook } from 'react-icons/fa';

const sidebarItems = [
    {
        title: 'Goals',
        link: '/about/goals',
        Icon: FaBullseye,
    },
    {
        title: 'Favorite Songs',
        link: '/about/favoriteSongs',
        Icon: FaHeadphonesAlt,
    },
    {
        title: 'Favorite TV Shows',
        link: '/about/favoriteTVShows',
        Icon: FaTv,
    },
    {
        title: 'Favorite Movies',
        link: '/about/favoriteMovies',
        Icon: FaFilm,
    },
    {
        title: 'Favorite Books',
        link: '/about/favoriteBooks',
        Icon: FaBook,
    },
];
const AboutLayout = (props: { children: ReactNode; }) => {
    const { children } = props;
    return (
        <>
            <Head>
                <title>About me</title>
            </Head>
            <div className='flex animate-fadeIn min-h-screen'>
                <Sidebar sidebarItems={sidebarItems} sidebarTitle='About Me' />
                <div className='flex-auto flex flex-col sm:flex-row justify-center items-center sm:flex-wrap'>
                    {children}
                </div>
            </div>
        </>
    );
};

export default AboutLayout;