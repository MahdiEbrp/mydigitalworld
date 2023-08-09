import CircularLoader from './CircularLoader';
import Image, { ImageProps } from 'next/image';
import { BsEmojiDizzy } from 'react-icons/bs';
import { useState } from 'react';

const MAX_ALT_LENGTH = 20;

const ImageLoader = (props: ImageProps) => {

    const { src, alt, width, height, className, ...rest } = props;
    const absoluteSrc = src.toString().startsWith('\\') ? `${process.env.NEXT_PUBLIC_HOST}/${src}` : src;
    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

    const handleLoad = () => {
        setStatus('loaded');
    };

    const handleError = () => {
        setStatus('error');
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            {status === 'loading' && <CircularLoader />}
            {status === 'error' &&
                <div className='text-sm text-center text-primary-800'>
                    <BsEmojiDizzy className='inline m-2' />
                    <span>
                        Error: Image could not be loaded.
                        {alt && alt.length > MAX_ALT_LENGTH ? ` (alt: ${alt.slice(0, MAX_ALT_LENGTH)}...)` : ` (alt: ${alt})`}
                    </span>
                </div>
            }
            {status !== 'error' &&
                <Image
                    {...rest}
                    src={absoluteSrc}
                    alt={alt}
                    onLoad={handleLoad}
                    width={width}
                    height={height}
                    onError={handleError}
                    className={`object-cover ${className ? className : ''}`}
                />
            }
        </div>
    );
};


export default ImageLoader;