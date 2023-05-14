import React, { HTMLAttributes } from 'react';
import { FaHeart, FaRegComment, FaThumbsDown } from 'react-icons/fa';
import ImageLoader from './ImageLoader';

export type ImageDataProps = {
    id: string;
    title: string;
    location: string;
    src: string;
    description: string;
    likes: number;
    dislikes: number;
    comments: number;
    onLikeClick?: (id: string) => void;
    onDislikeClick?: (id: string) => void;
    onCommentClick?: (id: string) => void;
};

const ImageCard = ({ title, location, src, description, likes, dislikes, comments, id,
    onLikeClick = () => 0, onDislikeClick = () => 0, onCommentClick = () => 0 }: ImageDataProps) => {
    return (
        <div className='max-w-xs bg-primary-500 animate-fadeIn rounded-xl shadow-md overflow-hidden' >
            <ImageLoader className='h-48 w-full object-cover' width={400} height={400} src={src} alt={title} />
            <div className='p-6'>
                <h2 className='text-lg text-primary-950 font-semibold'>{title}</h2>
                <p className='text-primary-800'>{location}</p>
                <p className='text-primary-900 mt-4'>{description}</p>
                <div className='flex justify-between items-center mt-4'>
                    <div>
                        <button className='mr-2 text-primary-800 hover:animate-pulse hover:text-primary-900' onClick={() => onLikeClick(id)}>
                            <FaHeart className='inline mr-1' />
                            {likes}
                        </button>
                        <button className='mr-2 text-primary-800 hover:animate-pulse hover:text-primary-900' onClick={() => onDislikeClick(id)}>
                            <FaThumbsDown className='inline mr-1' />
                            {dislikes}
                        </button>
                        <button className='text-primary-800 hover:animate-pulse hover:text-primary-900' onClick={() => onCommentClick(id)}>
                            <FaRegComment className='inline mr-1' />
                            {comments}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

type GalleryProps = {
    images: ImageDataProps[];
    onLikeClick?: (id: string) => void;
    onDislikeClick?: (id: string) => void;
    onCommentClick?: (id: string) => void;
} & HTMLAttributes<HTMLDivElement>;


export const ImageGallery = ({ images, onLikeClick, onDislikeClick, onCommentClick, ...rest }: GalleryProps) => {

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' {...rest}>
            {images.map(image =>
                <ImageCard key={image.id} title={image.title} location={image.location} src={image.src} description={image.description} likes={image.likes} dislikes={image.dislikes} comments={image.comments} id={image.id} onLikeClick={onLikeClick} onDislikeClick={onDislikeClick} onCommentClick={onCommentClick} />
            )}
        </div>
    );
};


export default ImageGallery;
