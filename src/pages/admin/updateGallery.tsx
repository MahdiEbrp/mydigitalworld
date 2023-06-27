import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Card, { CardContent, CardTitle } from '@/components/Card';
import ComboBox, { ComboBoxOption } from '@/components/ComboBox';
import AdminError from '@/components/display/AdminError';
import FetchError from '@/components/display/FetchError';
import Loader from '@/components/display/Loader';
import NothingToSee from '@/components/display/NothingToSee';
import useAdminGalleryData from '@/helpers/useAdminGalleryData';

const INPUT_ROWS = 8;

const AdminUpdateGallery = () => {
    const srcRef = useRef<HTMLInputElement>(null);
    const locationRef = useRef<HTMLTextAreaElement>(null);

    const { galleryData, error, adminError, isLoading } = useAdminGalleryData();


    const RenderContent = () => {

        const [options, setOptions] = useState<ComboBoxOption[]>([]);
        const [selectedIndex, setSelectedIndex] = useState(0);
        useEffect(() => {
            const values = galleryData.map((image) => ({
                value: image.id,
                label: image.title,
            }));
            setOptions(values);
        }, []);
        if (isLoading) return <Loader />;
        if (adminError) return <AdminError />;
        if (error) return <FetchError />;
        if (!galleryData || galleryData.length === 0) return <NothingToSee />;

        if (srcRef.current && locationRef.current && selectedIndex > -1) {
            srcRef.current.value = galleryData[selectedIndex].src;
            locationRef.current.value = galleryData[selectedIndex].description;
        }
        const SelectionChange = (value: string, index: number) => {
            setSelectedIndex(index);
        };

        return (
            <Card className='w-[min(90vh,90%)]'>
                <CardTitle title='Admin-Update Gallery' />
                <CardContent>
                    <div className='flex flex-col gap-1'>
                        <div className='flex flex-row gap-1 w-full'>
                            <h4>Title:</h4>
                            <ComboBox options={options} onSelectionChange={SelectionChange} />
                        </div>
                        <input
                            className='block text-base resize-none shadow-sm w-full px-4 py-2 leading-5 text-input bg-input border border-primary-100 rounded focus:outline-none focus:bg-input focus:border-primary-100'
                            ref={srcRef}
                        />
                        <textarea
                            className='block text-base resize-none shadow-sm w-full px-4 py-2 leading-5 text-input bg-input border border-primary-100 rounded focus:outline-none focus:bg-input focus:border-primary-100'
                            rows={INPUT_ROWS}
                            ref={locationRef}
                        />
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <>
            <Head>
                <title>Admin-Update Gallery</title>
            </Head>
            <div className='flex justify-center items-center min-h-screen min-w-full'><RenderContent /></div>
        </>
    );
};

export default AdminUpdateGallery;
