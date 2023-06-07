import FetchError from '@/components/display/FetchError';
import Head from 'next/head';
import ImageGallery from '@/components/ImageGallery';
import Loader from '@/components/display/Loader';
import NothingToSee from '@/components/display/NothingToSee';
import axios, { AxiosError } from 'axios';
import getHumorousHTTPMessage from '@/lib/humorousHTTPMessage';
import React, { useContext, useEffect, useState } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { SignInModalContext } from '@/context/SignInContext';
import { useSession } from 'next-auth/react';
import { useToast } from '@/context/ToastContext';
import { Gallery } from '@/type/gallery';

type LikeResponse = {
    likes: number,
    dislikes: number,
    likedBySessionUser: boolean,
    dislikedBySessionUser: boolean;
};

type Props = {
    galleryData: Gallery[];
    hasError: boolean;
};

const GalleryPage: NextPage<Props> = ({ galleryData, hasError }) => {
    const { setModalVisibility } = useContext(SignInModalContext);
    const [loadingTopicIds, setLoadingTopicIds] = useState<string[]>([]);
    const [updatedGalleryData, setUpdatedGalleryData] = useState<Gallery[] | undefined>(galleryData);
    const { data: session } = useSession();
    const toast = useToast();

    useEffect(() => {
        if (galleryData) {
            setUpdatedGalleryData(galleryData);
        }
    }, [galleryData]);

    const handleLikeDislike = async (topicId: string, isLike: boolean) => {
        if (!session) {
            setModalVisibility(true);
            return;
        }
        if (!updatedGalleryData)
            return;
        setLoadingTopicIds(prevLoadingIds => [...prevLoadingIds, topicId]);

        try {
            const { data } = await axios.post('/api/like/update', { topicId: topicId, isLike: isLike });
            const response = data as LikeResponse;
            const updatedData = updatedGalleryData.map((image) => {
                if (image.topicId === topicId) {
                    return {
                        ...image,
                        likes: response.likes,
                        dislikes: response.dislikes,
                        likedBySessionUser: response.likedBySessionUser,
                        dislikedBySessionUser: response.dislikedBySessionUser,
                    };
                }
                return image;
            });
            setUpdatedGalleryData(updatedData);
            if (response.likedBySessionUser)
                toast.showToast('🥰 Aww, you liked my post! Thank you so much! 🙌', 'success', 2000);
        } catch (error) {
            if (error instanceof AxiosError)
                toast.showToast(getHumorousHTTPMessage(error.response?.status || 0), 'error', 4000);
            else
                toast.showToast('Seriously, doesn\'t know what\'s happening.🧐👻', 'error', 2000);
        } finally {
            setLoadingTopicIds(prevLoadingIds => prevLoadingIds.filter(topicId => topicId !== topicId));
        }

    };

    return (
        <>
            <Head>
                <title>Gallery</title>
            </Head>
            <div className='flex justify-center items-center min-h-screen m-2'>
                {updatedGalleryData ?
                    updatedGalleryData.length === 0 ?
                        hasError ? <FetchError /> : <NothingToSee />
                        :
                        <ImageGallery images={updatedGalleryData} onLikeClick={(id) => handleLikeDislike(id, true)} onDislikeClick={(id) => handleLikeDislike(id, false)} loadingTopicIds={loadingTopicIds} />
                    :
                    <Loader />
                }
            </div>
        </>
    );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx;

    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/gallery`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            }
        });
        return {
            props: {
                galleryData: data,
                hasError: false,
            },
        };
    } catch (error) {
        return {
            props: {
                galleryData: [],
                hasError: true,
            },
        };
    }
};

export default GalleryPage;
