import { FC, useEffect, useMemo, useState } from 'react';

type TextLimitProps = {
    maxLength: number;
    className?: string;
    children: string;
};

const TIMER_INTERVAL_MS = 300;

const TextLimitByWords: FC<TextLimitProps> = ({ maxLength: maxWords, className = '', children }) => {
    const [showFullText, setShowFullText] = useState(false);
    const wordsArray = useMemo(() => children.trim().split(/\s+/), [children]);
    const wordCount = useMemo(() => wordsArray.length, [wordsArray]);
    const hiddenWords = useMemo(() => wordsArray.slice(wordCount - maxWords).join(' '), [maxWords, wordCount, wordsArray]);

    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (isTransitioning) {
            const intervalId = setInterval(() => {
                setShowFullText(prevShowFullText => !prevShowFullText);
                setIsTransitioning(false);
            }, TIMER_INTERVAL_MS);
            return () => clearInterval(intervalId);
        }
    }, [isTransitioning]);

    const handleButtonClick = () => {
        setIsTransitioning(true);
    };

    const textToShow = wordsArray.slice(0, showFullText ? wordCount : maxWords).join(' ');
    const linkToShow =
        wordCount > maxWords &&
        <span
            onClick={handleButtonClick}
            className='mt-4 px-4 py-2 font-bold rounded-lg cursor-pointer text-link focus:outline-none focus:shadow-outline-blue'
        >
            {showFullText ? 'Show Less' : 'Continue...'}
        </span>
        ;

    return (
        <div className={`${className} inline-flex`}>
            <p className={`overflow-hidden ${isTransitioning ? 'max-h-0' : 'max-h-screen'} transition-[max-height] duration-300 text-ellipsis`}>
                {textToShow}
                {!showFullText && <span className='hidden'>{hiddenWords}</span>}
                {linkToShow}
            </p>
        </div>
    );
};
export const TextLimitByLength: FC<TextLimitProps> = ({ maxLength, className = '', children }) => {
    const [showFullText, setShowFullText] = useState(false);

    const hiddenWords = useMemo(() => children.substring(maxLength), [children, maxLength]);

    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (isTransitioning) {
            const intervalId = setInterval(() => {
                setShowFullText(prevShowFullText => !prevShowFullText);
                setIsTransitioning(false);
            }, TIMER_INTERVAL_MS);
            return () => clearInterval(intervalId);
        }
    }, [isTransitioning]);

    const handleButtonClick = () => {
        setIsTransitioning(true);
    };

    const textToShow = children.slice(0, showFullText ? children.length : maxLength);
    const linkToShow =
        children.length > maxLength &&
        <span
            onClick={handleButtonClick}
            className='font-bold rounded-lg cursor-pointer text-link focus:outline-none focus:shadow-outline-blue'
        >
            {showFullText ? 'Show Less' : 'Continue...'}
        </span>
        ;

    return (
        <div className={`${className} flex flex-col`}>
            <p className={`overflow-hidden ${isTransitioning ? 'max-h-0' : 'max-h-screen'} transition-[max-height] duration-300 text-ellipsis`}>
                {textToShow}
                {!showFullText && <span className='hidden'>{hiddenWords}</span>}
            </p>
            {linkToShow}
        </div>
    );
};

export default TextLimitByWords;
