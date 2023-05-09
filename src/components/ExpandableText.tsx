import { useState, useRef, useEffect } from 'react';

interface ExpandableTextProps {
    children: string;
}

function ExpandableText({ children }: ExpandableTextProps) {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (textRef.current && textRef.current.scrollHeight > textRef.current.clientHeight) {
            setIsOverflowing(true);
        }
    }, []);

    function toggleExpand() {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className='relative'>
            <p
                ref={textRef}
                className={` overflow-hidden ${isExpanded ? 'max-h-none' : ''}`}
            >
                {children}
            </p>
            {isOverflowing &&
                <button
                    onClick={toggleExpand}
                    className='absolute bottom-0 right-0 text-link'
                >
                    {isExpanded ? 'Show less' : 'Continue reading...'}
                </button>
            }
        </div>
    );
}

export default ExpandableText;
