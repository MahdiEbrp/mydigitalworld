import FetchError from '@/components/display/FetchError';
import Head from 'next/head';
import ImageGallery from '@/components/ImageGallery';
import Loader from '@/components/display/Loader';
import NothingToSee from '@/components/display/NothingToSee';
import axios, { AxiosError } from 'axios';
import getHumorousHTTPMessage from '@/lib/humorousHTTPMessage';
import React, { useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useToast } from '@/context/ToastContext';
import { Gallery } from '@/type/gallery';
import useGalleryData from '@/helpers/useGalleryData';
import { useCommentModal } from '@/context/CommentContext';



type Props = {
    galleryData: Gallery[];
    hasError: boolean;
};

const GalleryPage = ({ galleryData, hasError }: Props) => {
    const [updatedGalleryData, setUpdatedGalleryData] = useState<Gallery[]>(galleryData ?? []);
    const [disabledTopicIds, setDisabledTopicIds] = useState<string[]>([]);
    const { galleryData: galleryDataFromApi, updateGallery } = useGalleryData();
    const commentModal = useCommentModal();
    const toast = useToast();

    useEffect(() => {
        if (galleryData) {
            setUpdatedGalleryData(galleryData);
        }
    }, [galleryData]);
    useEffect(() => {
        if (galleryDataFromApi) {
            setUpdatedGalleryData(galleryDataFromApi);
        }
    }, [galleryDataFromApi]);

    const handleLikeDislike = async (topicId: string, isLike: boolean) => {

        if (!updatedGalleryData)
            return;

        setDisabledTopicIds(prevDisableIds => [...prevDisableIds, topicId]);
        const currentTopic = updatedGalleryData.find(image => image.topicId === topicId);
        if (!currentTopic?.likedBySessionUser && isLike)
            toast.showToast('🥰 Aww, you liked my post! Thank you so much! 🙌', 'success', 2000);
        const error = await updateGallery(topicId, isLike);

        if (error) {
            if (error instanceof AxiosError)
                toast.showToast(getHumorousHTTPMessage(error.response?.status || 0), 'error', 4000);
            else
                toast.showToast('Seriously, doesn\'t know what\'s happening.🧐👻', 'error', 2000);

            setUpdatedGalleryData(galleryData ?? []);
        }

        setDisabledTopicIds(prevDisableIds => prevDisableIds.filter(id => id !== topicId));
    };

    const handleComment = (topicId: string) => {

        if (!updatedGalleryData)
            return;

        commentModal.showCommentModal(topicId);
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