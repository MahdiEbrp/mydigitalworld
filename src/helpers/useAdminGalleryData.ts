import axios, { AxiosError } from 'axios';
import useSWR from 'swr';
import { Gallery } from '@/type/gallery';
import { useMemo, useState } from 'react';

const PUBLIC_HOST = process.env.NEXT_PUBLIC_HOST;
const GALLERY_API_ROUTE = `${PUBLIC_HOST}/api/admin/gallery/fetch`;
const INSERT_GALLERY_API_ROUTE = `${PUBLIC_HOST}/api/admin/gallery/insert`;
const UPDATE_GALLERY_API_ROUTE = `${PUBLIC_HOST}/api/admin/gallery/update`;
const DELETE_GALLERY_API_ROUTE = `${PUBLIC_HOST}/api/admin/gallery/delete`;
const IMPORT_GALLERY_API_ROUTE = `${PUBLIC_HOST}/api/admin/gallery/importData`;

const fetcher = async (url: string) => {
    const { data } = await axios.get(url, {
        withCredentials: true,
    });
    return data;
};


const useAdminGalleryData = () => {
    const { data: galleryData = [], error, isLoading, mutate } = useSWR<Gallery[]>(GALLERY_API_ROUTE, fetcher);
    const [isUpdating, setUpdating] = useState(false);
    const adminError = useMemo(() => {
        return error instanceof AxiosError && error.response?.status === 403;
    }, [error]);

    const insertGallery = async (gallery: Gallery) => {
        const { id, title, location, src, altTag, description } = gallery;
        const updatedData = { id, title, location, src, altTag, description };

        const isDataEmpty = Object.values(updatedData).some(value => !value);
        if (isDataEmpty)
            return { error: 'Empty object' };

        const currentGalleryData = [...galleryData];

        try {
            setUpdating(true);

            mutate([...currentGalleryData, gallery], false);

            const { data: response } = await axios.post<Gallery>(INSERT_GALLERY_API_ROUTE, updatedData);
            mutate([...currentGalleryData, response], false);

            return { error: undefined };
        } catch (error) {
            mutate(currentGalleryData, false);
            return { error };
        } finally {
            setUpdating(false);
        }
    };

    const updateGallery = async (galleryPost: Gallery) => {
        const { id, title, location, src, altTag, description } = galleryPost;
        const updatedData = { id, title, location, src, altTag, description };

        const isDataEmpty = Object.values(updatedData).some(value => !value);
        if (isDataEmpty)
            return { error: 'Empty object' };

        const existingPost = galleryData.find(image => image.id === id);
        const newGalleryData = galleryData.filter(image => image.id !== id);

        if (!existingPost)
            return { error: 'Post not found!' };

        try {
            setUpdating(true);

            const updatedPost = { ...existingPost, ...updatedData };
            mutate([...newGalleryData, updatedPost], false);

            const { data: response } = await axios.post<Gallery>(UPDATE_GALLERY_API_ROUTE, updatedData);
            mutate([...newGalleryData, response], false);

            return { error: undefined };
        } catch (error) {
            mutate([...newGalleryData, existingPost], false);
            return { error };
        } finally {
            setUpdating(false);
        }
    };

    const deleteGallery = async (id: string) => {

        if (!id || id.length === 0)
            return { error: 'id Not found!' };

        const post = galleryData.find(image => image.id === id);
        if (!post)
            return { error: 'Post Not found!' };
        const newGalleryData = galleryData.filter(image => image.id !== id);
        try {
            setUpdating(true);
            mutate(newGalleryData, false);

            await axios.post<{ id: string; }>(DELETE_GALLERY_API_ROUTE, { id });

            return { error: undefined };
        } catch (error) {

            mutate([...newGalleryData, post], false);
            return { error: error };
        }
        finally {
            setUpdating(false);
        }
    };
    const importGallery = async () => {
        try {
            setUpdating(true);
            const { data: newGalleryData } = await axios.get<Gallery[]>(IMPORT_GALLERY_API_ROUTE);
            mutate(newGalleryData, false);
            return { error: undefined };
        } catch (error) {

            return { error: error };
        }
        finally {
            setUpdating(false);
        }
    };
    return { galleryData, isLoading, error, adminError, mutate, isUpdating, insertGallery, updateGallery, deleteGallery, importGallery };
};

export default useAdminGalleryData;
