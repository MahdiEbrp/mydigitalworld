import axios from 'axios';
import useSWR from 'swr';
import { CommentType } from '@/type/comment';
import { useEffect, useState } from 'react';

const COMMENTS_API_ROUTE = `${process.env.NEXT_PUBLIC_HOST}/api/comment/fetch`;
const INSERT_COMMENTS_API_ROUTE = `${process.env.NEXT_PUBLIC_HOST}/api/comment/insert`;
const UPDATE_COMMENTS_API_ROUTE = `${process.env.NEXT_PUBLIC_HOST}/api/comment/update`;

async function fetchComments(url: string, topicId: string): Promise<CommentType[]> {
    const { data } = await axios.post(url, { topicId }, {
        withCredentials: true,
    });

    return data as CommentType[];
}

const useCommentData = (topicId: string) => {
    const { data: commentData, error,isLoading, mutate } = useSWR(
        topicId ? COMMENTS_API_ROUTE : null,
        (url) => fetchComments(url, topicId),
    );
    const [status, setStatus] = useState<'fetching' | 'updating' | 'loaded'>('fetching');

    useEffect(() => {
        if (isLoading)
            setStatus('fetching');
        else
            setStatus('loaded');
    },[isLoading]);

    const insertComment = async (opinion: string,parentId?:string) => {
        try {
            setStatus('updating');

            const { data: response } = await axios.post<CommentType>(INSERT_COMMENTS_API_ROUTE, { opinion, topicId, parentId });
            mutate([...commentData || [], response], false);
            return {error:undefined};
        } catch (error) {
            return {error:error};
        } finally {
            setStatus('loaded');
        }
    };

    const updateComment = async (id: string, action: 'like' | 'dislike' | 'delete') => {
        try {
            if (action === 'delete') {
                mutate((prevState) => prevState?.filter((comment) => comment.id !== id),false);
            } else {
                const updatedComments = commentData?.map((comment) => {
                    if (comment.id === id) {
                        const likedBySessionUser = comment.likedBySessionUser;
                        const dislikedBySessionUser = comment.dislikedBySessionUser;
                        const likes = likedBySessionUser ? comment.likes - 1 : action === 'like' ?  comment.likes + 1 : comment.likes;
                        const dislikes = dislikedBySessionUser ? comment.dislikes - 1 : action === 'dislike' ? comment.dislikes + 1 : comment.dislikes;

                        if (action === 'like') {
                            return { ...comment, likes, dislikes, likedBySessionUser: !likedBySessionUser, dislikedBySessionUser: false };
                        } else {
                            return { ...comment, likes, dislikes, dislikedBySessionUser: !dislikedBySessionUser, likedBySessionUser: false };
                        }
                    } else {
                        return comment;
                    }
                }) || [];

                mutate([...updatedComments], false);

            }
            const { data: response } = await axios.post<CommentType>(UPDATE_COMMENTS_API_ROUTE, { id, action });
            mutate(prevState => response ? prevState?.map(comment => comment.id === response.id ? response : comment) : prevState, false);

            return { error: undefined };
        } catch (error) {
            return { error: error };
        }
    };

    return { commentData, status, error, insertComment, updateComment };
};

export default useCommentData;
