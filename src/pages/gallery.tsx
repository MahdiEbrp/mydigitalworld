import CircularLoader from '@/components/CircularLoader';
import ImageGallery from '@/components/ImageGallery';
import useCachedAxios from '@/lib/cachedAxios';
import { Gallery } from '@/type/gallery';
import { NextPage } from 'next';
import Head from 'next/head';

const Gallery: NextPage = () => {
    const { data, error, isLoading } = useCachedAxios<Gallery[]>('GALLERY_DATA', '/api/gallery');
    return (
        <>
            <Head>
                <title>Gallery</title>
            </Head>
            <div className='flex justify-center items-center min-h-screen m-2'>
                {isLoading ?

                    <CircularLoader />
                    :
                    <>
                        {error && <p>error detected</p>}
                        {data && <ImageGallery images={data} />}
                    </>
                }
            </div>
        </>
    );
};
export default Gallery;
