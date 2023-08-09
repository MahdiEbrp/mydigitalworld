import { getFormattedDate, getTimeSinceDate } from '@/lib/dateUtility';
import { Post } from '@/type/posts';
import Link from 'next/link';
import { useMemo } from 'react';
import { BiCalendar } from 'react-icons/bi';
import Chip from './Chip';
import ImageLoader from './ImageLoader';
import Tooltip from './Tooltip';

type BlogPostItemProps = {
    post: Post,
    OnKeywordClick: (keyword: string) => void;
};
const MAX_LENGTH = 120;

const BlogPostItem = ({ post, OnKeywordClick }: BlogPostItemProps) => {
    const truncateDescription = useMemo(() =>
        post.description.length <= MAX_LENGTH ? post.description : post.description.substring(0, MAX_LENGTH) + '...'
        , [post.description]);

    return (
        <div className='bg-primary-400 flex flex-col sm:flex-row items-center gap-1 p-2 rounded-md shadow-md mb-4'>
            <div className='flex overflow-hidden rounded'>
                <ImageLoader src={`/images/blog/${post.thumbnail}.jpg`} width={100} height={200} alt={`image of ${post.thumbnail}`} />
            </div>
            <div className='flex flex-1 flex-col ml-5'>
                <h2 className='text-xl font-bold mb-2'>{post.title}</h2>
                <p className='self-start'>
                    {truncateDescription}
                </p>
                <div className='flex items-center self-end mb-2'>
                    <BiCalendar className='w-5 h-5 mr-2' />
                    <Tooltip className='!bg-primary-500' text={getFormattedDate(post.createdAt)}>
                        <span className='text-sm'>
                            {getTimeSinceDate(post.createdAt)}
                        </span>
                    </Tooltip>
                </div>
                <Link className='font-bold rounded-lg text-sm p-1 text-link self-end' href={`/blog/${post.fileName}`} >Read More...</Link>
                <div className='flex flex-wrap'>
                    {post.keywords.split(' ').map((keyword: string, keywordIndex: number) =>
                        <Chip title={keyword} key={keywordIndex} onClick={() => OnKeywordClick(keyword)} />
                    )}
                </div>
            </div>
        </div>

    );
};

export default BlogPostItem;
