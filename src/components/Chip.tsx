import React from 'react';
import { FaTimes } from 'react-icons/fa';

type ChipProps= {
    title: string;
    showIcon?: boolean;
    onRemove?: () => void;
}

const Chip: React.FC<ChipProps> = ({ title, onRemove,showIcon=false }) => {

    return (
        <div
            className={'inline-flex animate-fadeIn items-center rounded-full bg-primary-200 text-primary-950 py-1 px-2 mr-2 mb-2  cursor-pointer'}
        >
            <span className='text-sm font-semibold'>{title}</span>
            {showIcon &&
                <button onClick={onRemove} className='ml-2'>
                    <FaTimes className='h-4 w-4' />
                </button>
            }
        </div>
    );
};

export default Chip;