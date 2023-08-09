import AdminError from '@/components/display/AdminError';
import Card, { CardContent, CardTitle } from '@/components/Card';
import CircleButton from '@/components/CircleButton';
import Head from 'next/head';
import Link from 'next/link';
import Loader from '@/components/display/Loader';
import React from 'react';
import Tooltip from '@/components/Tooltip';
import { BiCommentEdit } from 'react-icons/bi';
import { BsImages } from 'react-icons/bs';
import { FaBlog } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

const adminPanel = () => {

    const RenderContent = () => {
        const { data: session, status } = useSession();

        if (status === 'loading') return <Loader />;
        if (!session?.user.isAdmin)
            return <AdminError />;

        return (
            <Card>
                <CardTitle title='Admin panel' />
                <CardContent>
                    <div className='flex flex-row justify-center items-center flex-wrap'>
                        <Tooltip text='Edit posts'>
                            <Link href='/admin/editPosts'>
                                <CircleButton>
                                    <FaBlog className='w-10 h-10' />
                                </CircleButton>
                            </Link>
                        </Tooltip>
                        <Tooltip text='Update gallery'>
                            <Link href='/admin/updateGallery'>
                                <CircleButton>
                                    <BsImages className='w-10 h-10' />
                                </CircleButton>
                            </Link>
                        </Tooltip>
                        <Tooltip text='Edit comments'>
                            <Link href='/admin/editComments'>
                                <CircleButton>
                                    <BiCommentEdit className='w-10 h-10' />
                                </CircleButton>
                            </Link>
                        </Tooltip>
                    </div>
                    <p className='mt-2'>
                        Hello super user! 👋😄
                        <br/>
                        You&apos;ve entered the realm of superheroic abilities, where coding and debugging become a piece of 🍰. With your powers, bugs tremble in fear, and algorithms bow down in admiration. 💪✨
                    </p>
                </CardContent>
            </Card>
        );
    };
    return (
        <>
            <Head>
                <title>Admin-Admin Panel</title>
            </Head>
            <div className='flex justify-center items-center min-h-screen min-w-full'>
                <RenderContent />
            </div>
        </>
    );
};

export default adminPanel;