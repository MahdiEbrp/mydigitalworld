import React, { ReactElement, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

type AccordionSectionProps = {
    title: string;
    borderRadius?: string;
};

const AccordionSection = ({ title, children, borderRadius = 'rounded-none' }: React.PropsWithChildren<AccordionSectionProps>) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const icon = isExpanded ? <FaChevronUp className='w-6 h-6 text-primary-950' /> : <FaChevronDown className='w-6 h-6 text-primary-950' />;
    return (
        <div className={`overflow-hidden shadow-lg ${borderRadius} w-[min(100%,100vw)]`}>
            <button
                onClick={toggleExpand}
                className='flex items-center justify-between w-full py-2 px-4 text-left bg-primary-800 hover:bg-primary-950 focus:outline-none'
            >
                <h1 className='font-bold overflow-ellipsis text-lg text-primary-950 mr-2'>{title}</h1>
                {icon}
            </button>
            <div className={`transition-all duration-500 rounded-b-lg ${isExpanded ? 'max-h-[100rem]' : 'max-h-0'}`}>
                <div className='px-4 pt-2 pb-4 bg-primary-400 text-paper'>
                    {children}
                </div>
            </div>
        </div>
    );
};

type AccordionProps = {
    children: ReactElement | ReactElement[];
};

const Accordion = ({ children }: AccordionProps) => {


    const length = React.Children.count(children);

    if (length === 0) return null;

    const lastIndex = length - 1;

    const getBorderStyle = (index: number) => {
        const borderBottomStyle = 'border-b-2 border-primary-200';
        if (length === 1) return 'rounded';
        if (index === 0) return `rounded-t-lg ${borderBottomStyle}`;
        if (index === lastIndex) return 'rounded-b-lg';
        return `rounded-none ${borderBottomStyle}`;
    };

    return (
        <div className='flex flex-col items-center'>
            {React.Children.map(children, (child, index) =>
                React.cloneElement(child, { key: index, borderRadius: getBorderStyle(index) })
            )}
        </div>
    );
};

export { AccordionSection };
export default Accordion;
