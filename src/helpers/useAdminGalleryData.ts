import axios, { AxiosError } from 'axios';
import useSWR from 'swr';
import { Gallery } from '@/type/gallery';
import { useMemo } from 'react';

const GALLERY_API_ROUTE = `${process.env.NEXT_PUBLIC_HOST}/api/admin/gallery/fetch`;

const fetcher = async (url: string) => {
    const { data } = await axios.get(url, {
        withCredentials: true,
    });
    return data;
};


const useAdminGalleryData = () => {
    const { data: galleryData = [], error, isLoading, mutate } = useSWR<Gallery[]>(GALLERY_API_ROUTE, fetcher);

    const adminError = useMemo(() => {
        return error instanceof AxiosError && error.response?.status === 403;
    }, [error]);


    return { galleryData, isLoading, error, adminError, mutate };
};

export default useAdminGalleryData;
