import CircleButton from './CircleButton';
import ImageLoader from './ImageLoader';
import Tooltip from './Tooltip';
import { FaArrowLeft, FaArrowRight, FaPause, FaPlay } from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';

type SlideProps = {
    title: string;
    imageUrl: string;
    imageAlt: string;
    description: string;
};
const SLIDE_SPEED_MS = 20 * 1000;

const SlideShow = ({ slides = [] }: { slides: SlideProps[]; }) => {
    const [activeId, setActiveId] = useState(0);
    const [paused, setPaused] = useState(false);
    const MAX_STEP = slides.length;
    const nextStep = useCallback(() => {
        setActiveId((prevId) => (prevId + 1) % MAX_STEP);
    }, [MAX_STEP]);

    const previousStep = () => {
        setActiveId((prevId) => prevId === 0 ? MAX_STEP - 1 : prevId - 1);
    };
    const handlePause = () => {
        setPaused(prev => !prev);
    };
    useEffect(() => {
        // eslint-disable-next-line no-undef
        let interval: NodeJS.Timeout | null = null;

        if (!paused) {
            interval = setInterval(() => {
                nextStep();
            }, SLIDE_SPEED_MS);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [nextStep, paused]);
    return (
        <div className='flex flex-col'>
            {slides.map((slide, index) =>
                <div key={index} className={`${index === activeId ? 'block' : 'hidden'}`}>
                    {index === activeId &&
                        <h1 className='text-xl text-primary-950 text-center font-bold mb-4 mt-4 animate-fadeIn'>{slide.title}</h1>
                    }
                    <div className='relative inline-block animate-fadeIn'>
                        <ImageLoader
                            src={slide.imageUrl}
                            width={640}
                            height={480}
                            quality={100}
                            alt={slide.imageAlt}
                            className='!block overflow-hidden rounded-md !object-scale-down'
                        />
                        <p className='block sm:absolute bottom-0 rounded-b-md p-1 bg-transparentPaper'>{slide.description}</p>

                    </div>
                </div>
            )}
            <div className='flex items-center self-center'>
                <Tooltip text='Previous step'>
                    <CircleButton onClick={previousStep}>
                        <FaArrowLeft />
                    </CircleButton>
                </Tooltip>
                <Tooltip text='Pause'>
                    <CircleButton onClick={handlePause} >
                        {paused ? <FaPlay /> : <FaPause />}
                    </CircleButton>
                </Tooltip>
                <Tooltip text='Next step'>
                    <CircleButton onClick={nextStep}>
                        <FaArrowRight />
                    </CircleButton>
                </Tooltip>
            </div>
        </div>
    );
};

export default SlideShow;
