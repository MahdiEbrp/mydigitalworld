import axios, { AxiosError } from 'axios';
import useSWR from 'swr';
import { Gallery } from '@/type/gallery';
import { useMemo } from 'react';

const GALLERY_API_ROUTE = `${process.env.NEXT_PUBLIC_HOST}/api/admin/gallery/fetch`;
const INSERT_GALLERY_API_ROUTE = `${process.env.NEXT_PUBLIC_HOST}/api/admin/gallery/insert`;
const UPDATE_GALLERY_API_ROUTE = `${process.env.NEXT_PUBLIC_HOST}/api/admin/gallery/update`;

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
    const insertGallery = async (galleryPost: Gallery) => {
        const { id, title, location, src, altTag, description } = galleryPost;
        const data = { id, title, location, src, altTag, description };
        const isEmpty = Object.values(data).some(value => !value);
        if (isEmpty)
            return { error: 'Empty object' };

        galleryPost.id = id;

        try {

            let newGalleryData = [...galleryData, galleryPost];
            mutate(newGalleryData, false);
            const { data: response } = await axios.post<Gallery>(INSERT_GALLERY_API_ROUTE, data);
            newGalleryData = newGalleryData.map((image) => {
                if (image.id === id) {
                    return response;
                }
                return image;
            });
            mutate(newGalleryData, false);
            return { error: undefined };
        } catch (error) {
            const previousGalleryData = galleryData.filter((image) => image.topicId !== id);
            mutate(previousGalleryData, false);
            return { error: error };
        }
    };
    const updateGallery = async (galleryPost: Gallery) => {
        const { id, title, location, src, altTag, description } = galleryPost;
        const data = { id, title, location, src, altTag, description };
        const isEmpty = Object.values(data).some(value => !value);
        if (isEmpty)
            return { error: 'Empty object' };

        try {
            let newGalleryData = galleryData.map((image) => {
                if (image.id === id) {
                    return { ...image, title, location, src, altTag, description };
                }
                return image;
            });

            mutate(newGalleryData, false);

            const { data: response } = await axios.post<Gallery>(UPDATE_GALLERY_API_ROUTE, data);

            newGalleryData = galleryData.map((image) => {
                if (image.id === id) {
                    return response;
                }
                return image;
            });
            mutate(newGalleryData, false);
            return { error: undefined };
        } catch (error) {
            const previousGalleryData = galleryData.filter((image) => image.topicId !== id);
            mutate(previousGalleryData, false);
            return { error: error };
        }
    };
    return { galleryData, isLoading, error, adminError, mutate, insertGallery, updateGallery };
};

export default useAdminGalleryData;
