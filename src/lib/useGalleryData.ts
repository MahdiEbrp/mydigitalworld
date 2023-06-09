import axios from 'axios';
import useSWR from 'swr';
import { Gallery } from '@/type/gallery';

const API_ROUTE = `${process.env.NEXT_PUBLIC_HOST}/api/gallery`;

const fetcher = async (url: string) => {
    const { data } = await axios.get(url, {
        withCredentials: true,
        headers: {
            Cookie: document.cookie
        }
    });
    return data;
};

const useGalleryData = () => {
    const { data:galleryData, error } = useSWR(API_ROUTE, (url) => fetcher(url));

    const data = galleryData as Gallery[];
    const isLoading = !galleryData && !error;
    const hasError = galleryData !== undefined;

    return { data, isLoading, hasError };
};

export default useGalleryData;
