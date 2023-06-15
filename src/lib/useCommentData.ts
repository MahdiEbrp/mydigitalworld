import axios from 'axios';
import useSWR from 'swr';
import { CommentType } from '@/type/comment';

const COMMENTS_API_ROUTE = `${process.env.NEXT_PUBLIC_HOST}/api/comment/fetch`;

const fetcher = async (url: string, topicId: string) => {
    const { data } = await axios.post(url, { topicId }, {
        withCredentials: true,
    });
    return data as CommentType[];
};

const useCommentData = (topicId: string) => {
    const { data: comments, error } = useSWR(topicId ? COMMENTS_API_ROUTE : null, (url) => fetcher(url, topicId));

    const commentData = comments as CommentType[];
    const isLoading = !commentData && !error;
    const hasError = error !== undefined;

    return { commentData, isLoading, hasError };
};

export default useCommentData;
