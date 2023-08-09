import Card, { CardContent } from './Card';
import ImageLoader from './ImageLoader';
import TextLimitByWords from './TextLimit';
import { FaHeart, FaRegComment, FaThumbsDown } from 'react-icons/fa';
import { Gallery } from '@/type/gallery';
import { HTMLAttributes } from 'react';
import { HiOutlineRefresh } from 'react-icons/hi';
import { IoLocationSharp } from 'react-icons/io5';
import { getFormattedDate, getTimeSinceDate } from '@/lib/dateUtility';

type ImageCardProps = {
    isLoading: boolean;
    isDisable: boolean;
} & Gallery;
const ImageCard = ({
    title,
    location,
    src,
    description,
    likes,
    dislikes,
    comments,
    topicId,
    createdAt,
    likedBySessionUser,
    dislikedBySessionUser,
    commentedBySessionUser,
    isLoading,
    isDisable,
    altTag,
    onLikeClick = () => 0,
    onDislikeClick = () => 0,
    onCommentClick = () => 0
}: ImageCardProps) => {
    return (
        <Card className='animate-fadeIn max-w-xl overflow-hidden !p-0'>
            <ImageLoader
                className='max-h-[300px] max-w-screen object-cover'
                width={400}
                height={300}
                src={src}
                alt={altTag}
            />
            <CardContent className='m-3'>
                <h2 className='text-lg text-primary-950 font-semibold'>{title}</h2>
                <p className='inline-flex gap-1 text-center text-primary-800'>
                    <IoLocationSharp />
                    {location}
                </p>
                <p className='text-base text-center text-primary-800'>
                    {`${getTimeSinceDate(createdAt)} (${getFormattedDate(createdAt)})`}
                </p>
                <TextLimitByWords className='text-lg text-primary-900 mt-4' maxLength={30}>
                    {description}
                </TextLimitByWords>
                <>
                    {!isLoading &&
                        <div className={`flex mt-4 ${isDisable ? 'pointer-events-none' : ''}`}>
                            <button
                                className={`mr-2 ${likedBySessionUser ? 'text-like-800' : 'text-primary-800'
                                    } hover:animate-pulse ${likedBySessionUser ? 'hover:text-like-900' : 'hover:text-primary-900'
                                    }`}
                                onClick={() => onLikeClick(topicId)}
                            >
                                <FaHeart className='inline mr-1' />
                                {likes}
                            </button>
                            <button
                                className={`mr-2 ${dislikedBySessionUser ? 'text-paper' : 'text-primary-800'
                                    } hover:animate-pulse hover:text-primary-900`}
                                onClick={() => onDislikeClick(topicId)}
                            >
                                <FaThumbsDown className='inline mr-1' />
                                {dislikes}
                            </button>
                            <button
                                className={`${commentedBySessionUser ? 'text-paper' : 'text-primary-800'
                                    } hover:animate-pulse hover:text-primary-900`}
                                onClick={() => onCommentClick(topicId)}
                            >
                                <FaRegComment className='inline mr-1' />
                                {comments}
                            </button>
                        </div>
                    }
                    {isLoading &&
                        <div className='flex mt-4'>
                            <HiOutlineRefresh className='animate-spin' />
                        </div>
                    }
                </>
            </CardContent >
        </Card >
    );
};

type GalleryProps = {
    images: Gallery[];
    onLikeClick?: (id: string) => void;
    onDislikeClick?: (id: string) => void;
    onCommentClick?: (id: string) => void;
    loadingTopicIds?: string[],
    disabledTopicIds?: string[],
} & HTMLAttributes<HTMLDivElement>;

const ImageGallery = ({ images, loadingTopicIds = [], disabledTopicIds = [], onLikeClick = () => void 0, onDislikeClick = () => void 0, onCommentClick = () => void 0, ...rest }: GalleryProps) => {
    const { className } = rest;
    return (
        <div {...rest} className={`flex flex-row gap-1 justify-evenly flex-wrap items-start ${className ?? ''}`}>
            {images.map(({ id, ...image }) =>
                <ImageCard
                    key={id}
                    id={id}
                    isLoading={loadingTopicIds.includes(image.topicId)}
                    isDisable={disabledTopicIds.includes(image.topicId)}
                    onLikeClick={onLikeClick}
                    onDislikeClick={onDislikeClick}
                    onCommentClick={onCommentClick}
                    {...image}
                />
            )}
        </div>
    );
};

export default ImageGallery;
