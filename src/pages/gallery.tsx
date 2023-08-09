import FetchError from '@/components/display/FetchError';
import Head from 'next/head';
import ImageGallery from '@/components/ImageGallery';
import Loader from '@/components/display/Loader';
import NothingToSee from '@/components/display/NothingToSee';
import React, { useContext, useMemo, useState } from 'react';
import axios, { AxiosError } from 'axios';
import getHumorousHTTPMessage from '@/lib/humorousHTTPMessage';
import useGalleryData from '@/helpers/useGalleryData';
import { Gallery } from '@/type/gallery';
import { GetServerSidePropsContext } from 'next';
import { SignInModalContext } from '@/context/SignInContext';
import { useCommentModal } from '@/context/CommentContext';
import { useSession } from 'next-auth/react';
import { useToast } from '@/context/ToastContext';

type Props = {
    serverData: Gallery[];
    hasError: boolean;
};

const GalleryPage = ({ serverData, hasError }: Props) => {
    const [disabledTopicIds, setDisabledTopicIds] = useState<string[]>([]);
    const { galleryData: galleryDataFromApi, updateGallery, isLoading, mutate } = useGalleryData();
    const { showCommentModal } = useCommentModal();
    const toast = useToast();
    const { data: session } = useSession();
    const { setModalVisibility } = useContext(SignInModalContext);

    const updatedGalleryData = useMemo(() => {
        return isLoading && galleryDataFromApi.length === 0 ? serverData : galleryDataFromApi;
    }, [isLoading, galleryDataFromApi, serverData]);


    const handleLikeDislike = async (topicId: string, isLike: boolean) => {

        if (!session) {
            setModalVisibility(true);
            return;
        }

        if (!updatedGalleryData)
            return;

        setDisabledTopicIds(prevDisableIds => [...prevDisableIds, topicId]);
        const currentTopic = updatedGalleryData.find(image => image.topicId === topicId);
        if (!currentTopic?.likedBySessionUser && isLike)
            toast.showToast('🥰 Aww, you liked my post! Thank you so much! 🙌', 'success', 2000);
        const { error } = await updateGallery(topicId, isLike);

        if (error) {
            if (error instanceof AxiosError)
                toast.showToast(getHumorousHTTPMessage(error.response?.status || 0), 'error', 4000);
            else
                toast.showToast('Seriously, doesn\'t know what\'s happening.🧐👻', 'error', 2000);

        }

        setDisabledTopicIds(prevDisableIds => prevDisableIds.filter(id => id !== topicId));
    };

    const handleComment = async (topicId: string) => {

        if (!updatedGalleryData)
            return;
        const count = await showCommentModal(topicId);
        await mutate(
            updatedGalleryData.map(image => {
                if (image.topicId === topicId) {
                    image.comments = count;
                }
                return image;
            })
            , false);
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
                onCommentClick={handleComment}
                disabledTopicIds={disabledTopicIds}
                suppressHydrationWarning
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
                serverData: data,
                hasError: false,
            },
        };
    } catch (error) {
        return {
            props: {
                serverData: [],
                hasError: true,
            },
        };
    }
};

export default GalleryPage;