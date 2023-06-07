import FetchError from '@/components/display/FetchError';
import Head from 'next/head';
import ImageGallery from '@/components/ImageGallery';
import Loader from '@/components/display/Loader';
import NothingToSee from '@/components/display/NothingToSee';
import axios, { AxiosError } from 'axios';
import getHumorousHTTPMessage from '@/lib/humorousHTTPMessage';
import React, { useContext, useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
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

const GalleryPage = ({ galleryData, hasError }: Props) => {
    const { setModalVisibility } = useContext(SignInModalContext);
    const [updatedGalleryData, setUpdatedGalleryData] = useState<Gallery[]>(galleryData ?? []);
    const [disableTopicIds, setDisableTopicIds] = useState<string[]>([]);

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

        if (!updatedGalleryData) {
            return;
        }
        setDisableTopicIds(prevDisableIds => [...prevDisableIds, topicId]);

        try {
            const newGalleryData = updatedGalleryData.map((image) => {
                if (image.topicId === topicId) {
                    const alreadyLiked = image.likedBySessionUser;
                    const alreadyDisliked = image.dislikedBySessionUser;
                    image.likes += alreadyLiked ? -1 : isLike ? 1 : 0;
                    image.dislikes += alreadyDisliked ? -1 : !isLike ? 1 : 0;
                    image.likedBySessionUser = !alreadyLiked && isLike;
                    image.dislikedBySessionUser = !alreadyDisliked && !isLike;

                    if (image.likedBySessionUser) {
                        toast.showToast('🥰 Aww, you liked my post! Thank you so much! 🙌', 'success', 2000);
                    }
                }

                return image;
            });

            setUpdatedGalleryData(newGalleryData);

            const { data: response } = await axios.post<LikeResponse>('/api/like/update', { isLike, topicId });

            const updatedData = newGalleryData.map((image) => {
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

        } catch (error) {

            if (error instanceof AxiosError)
                toast.showToast(getHumorousHTTPMessage(error.response?.status || 0), 'error', 4000);
            else
                toast.showToast('Seriously, doesn\'t know what\'s happening.🧐👻', 'error', 2000);

            setUpdatedGalleryData(galleryData ?? []);
        }
        finally {
            setDisableTopicIds(prevDisableIds => prevDisableIds.filter(id => id !== topicId));
        }
    };

    const renderContent = () => {
        if (!updatedGalleryData)
            return <Loader />;

        if (updatedGalleryData.length === 0)
            return hasError ? <FetchError /> : <NothingToSee />;

        return (
            <ImageGallery
                images={updatedGalleryData}
                onLikeClick={(id) => handleLikeDislike(id, true)}
                onDislikeClick={(id) => handleLikeDislike(id, false)}
                disabledTopicIds={disableTopicIds}
            />
        );
    };

    return (
        <>
            <Head>
                <title>Gallery</title>
            </Head>
            <div className='flex justify-center items-center min-h-screen m-2'>{renderContent()}</div>
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
