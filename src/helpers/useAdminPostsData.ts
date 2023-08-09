import axios, { AxiosError } from 'axios';
import useSWR from 'swr';
import { Post } from '@/type/posts';
import { useMemo, useState } from 'react';

const PUBLIC_HOST = process.env.NEXT_PUBLIC_HOST;
const POSTS_API_ROUTE = `${PUBLIC_HOST}/api/admin/posts/fetch`;
const INSERT_POSTS_API_ROUTE = `${PUBLIC_HOST}/api/admin/posts/insert`;
const UPDATE_POSTS_API_ROUTE = `${PUBLIC_HOST}/api/admin/posts/update`;
const DELETE_POSTS_API_ROUTE = `${PUBLIC_HOST}/api/admin/posts/delete`;
const IMPORT_POSTS_API_ROUTE = `${PUBLIC_HOST}/api/admin/posts/importData`;

const fetcher = async (url: string) => {
    const { data } = await axios.get(url, {
        withCredentials: true,
    });
    return data;
};


const useAdminPostsData = () => {
    const { data: postsData = [], error, isLoading, mutate } = useSWR<Post[]>(POSTS_API_ROUTE, fetcher);
    const [isUpdating, setUpdating] = useState(false);
    const adminError = useMemo(() => {
        return error instanceof AxiosError && error.response?.status === 403;
    }, [error]);

    const insertPost = async (post: Post) => {
        const { fileName, thumbnail, title, keywords, description, isVisible } = post;
        const updatedData = { fileName, thumbnail, title, keywords, description, isVisible };

        const isDataEmpty = Object.values(updatedData).some(value => typeof value === undefined || value.toString().trim().length === 0);
        if (isDataEmpty)
            return { error: 'Empty object' };

        const currentPostsData = [...postsData];

        try {
            setUpdating(true);

            mutate([...currentPostsData, post], false);

            const { data: response } = await axios.post<Post>(INSERT_POSTS_API_ROUTE, updatedData);
            mutate([...currentPostsData, response], false);

            return { error: undefined };
        } catch (error) {
            mutate(currentPostsData, false);
            return { error };
        } finally {
            setUpdating(false);
        }
    };

    const updatePost = async (post: Post) => {
        const { title, thumbnail, keywords, fileName, description, isVisible } = post;
        const updatedData = { title, thumbnail, keywords, fileName, description, isVisible };

        const isDataEmpty = Object.values(updatedData).some(value => typeof value === undefined || value.toString().trim().length === 0);
        if (isDataEmpty)
            return { error: 'Empty object' };

        const existingPost = postsData.find(post => post.fileName === fileName);
        const newPostsData = postsData.filter(post => post.fileName !== fileName);

        if (!existingPost)
            return { error: 'Post not found!' };

        try {
            setUpdating(true);

            const updatedPost = { ...existingPost, ...updatedData };
            mutate([...newPostsData, updatedPost], false);

            const { data: response } = await axios.post<Post>(UPDATE_POSTS_API_ROUTE, updatedData);
            mutate([...newPostsData, response], false);

            return { error: undefined };
        } catch (error) {
            mutate([...newPostsData, existingPost], false);
            return { error };
        } finally {
            setUpdating(false);
        }
    };

    const deletePost = async (fileName: string) => {

        if (!fileName || fileName.length === 0)
            return { error: 'fileName Not found!' };

        const post = postsData.find(post => post.fileName === fileName);
        if (!post)
            return { error: 'Post Not found!' };
        const newPostsData = postsData.filter(post => post.fileName !== fileName);
        try {
            setUpdating(true);
            mutate(newPostsData, false);

            await axios.post<{ fileName: string; }>(DELETE_POSTS_API_ROUTE, { fileName });

            return { error: undefined };
        } catch (error) {

            mutate([...newPostsData, post], false);
            return { error: error };
        }
        finally {
            setUpdating(false);
        }
    };
    const importPosts = async () => {
        try {
            setUpdating(true);
            const { data: newPostsData } = await axios.get<Post[]>(IMPORT_POSTS_API_ROUTE);
            mutate(newPostsData, false);
            return { error: undefined };
        } catch (error) {

            return { error: error };
        }
        finally {
            setUpdating(false);
        }
    };
    return { postsData, isLoading, error, adminError, mutate, isUpdating, insertPost, updatePost, deletePost, importPosts };
};

export default useAdminPostsData;
