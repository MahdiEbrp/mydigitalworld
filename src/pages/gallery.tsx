import FetchError from '@/components/display/FetchError';
import Loader from '@/components/display/Loader';
import NothingToSee from '@/components/display/NothingToSee';
import ImageGallery from '@/components/ImageGallery';
import { SignInModalContext } from '@/context/SignInContext';
import { useToast } from '@/context/ToastContext';
import useCachedAxios from '@/lib/cachedAxios';
import getHumorousHTTPMessage from '@/lib/humorousHTTPMessage';
import { Gallery } from '@/type/gallery';
import axios, { AxiosError } from 'axios';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useContext, useState } from 'react';

const Gallery: NextPage = () => {
    const { data: galleryData, error: galleryError, isLoading: isGalleryLoading } = useCachedAxios<Gallery[]>('GALLERY_DATA', '/api/gallery');
    const { setModalVisibility } = useContext(SignInModalContext);
    const [loadingTopicIds, setLoadingTopicIds] = useState<string[]>([]);
    const { data: session } = useSession();
    const toast = useToast();

    const handleLikeButton = async (id: string) => {
        if (!session) {
            setModalVisibility(true);
            return;
        }
        setLoadingTopicIds(prevLoadingIds => [...prevLoadingIds, id]);

        try {
            await axios.post('/api/like/update', { id, action: 'like' });
        } catch (error) {
            if (error instanceof AxiosError)
                toast.showToast(getHumorousHTTPMessage(error.response?.status || 0), 'error', 14000);
            else
                toast.showToast('Seriously, doesn\'t know what\'s happening.🧐👻', 'error', 2000);
        }
        finally {
            setLoadingTopicIds(prevLoadingIds => prevLoadingIds.filter(topicId => topicId !== id));
        }
    };

    return (
        <>
            <Head>
                <title>Gallery</title>
            </Head>
            <div className='flex justify-center items-center min-h-screen m-2'>
                {isGalleryLoading ?
                    <Loader />
                    :
                    <>
                        {galleryData ? <ImageGallery images={galleryData} onLikeClick={handleLikeButton} loadingTopicIds={loadingTopicIds} /> : galleryError ? <FetchError /> : <NothingToSee />}
                    </>
                }
            </div>
        </>
    );
};

export default Gallery;
