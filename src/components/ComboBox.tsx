import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { MdClear } from 'react-icons/md';
import Animation from './Animation';

export type ComboBoxOption = {
    label: string;
    value: string;
};

type ComboBoxProps = {
    options: ComboBoxOption[];
    onSelectionChange?: (value: string, index: number) => void;
} & HTMLAttributes<HTMLDivElement>;

const ComboBox: React.FC<ComboBoxProps> = ({ options, onSelectionChange, ...rest }) => {
    const [selectedOption, setSelectedOption] = useState<ComboBoxOption | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState<ComboBoxOption[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const { className } = rest;

    useEffect(() => {
        setFilteredOptions(options);
    }, [options]);

    const handleOptionClick = (option: ComboBoxOption) => {
        setSelectedOption(option);
        const selectedIndex = options.findIndex(item => item.value === option.value);
        onSelectionChange?.(option.value, selectedIndex);
        setIsOpen(false);
        if (inputRef.current)
            inputRef.current.value = option.label;
    };

    const handleInputChange = () => {
        if (!inputRef.current)
            return;

        const searchText = inputRef.current.value.trim();
        const regex = new RegExp(searchText, 'i');
        const filteredOptions = options.filter(option => regex.test(option.label));
        setFilteredOptions(filteredOptions);
    };
    const handleClear = () => {
        setFilteredOptions(options);
        setSelectedOption(null);
        onSelectionChange?.('', -1);
        if (inputRef.current)
            inputRef.current.value = '';
        setIsOpen(false);
    };

    return (
        <div className={`${className ? className : ''} relative w-full`}>
            <div className='flex border rounded overflow-hidden border-primary-100'>
                <input
                    className='block text-base resize-none shadow-sm w-full px-4 py-2 leading-5 text-input bg-input border-none focus:outline-none focus:bg-input focus:border-primary-100'
                    placeholder='Type to search...'
                    onClick={() => setIsOpen(true)}
                    onChange={handleInputChange}
                    ref={inputRef}
                />
                <button
                    type='button'
                    className='text-input bg-input border-none focus:outline-none focus:bg-input focus:border-primary-100'
                    onClick={handleClear}>
                    <span className='flex items-center pr-2 pointer-events-none'>
                        <MdClear className='h-5 w-5' />
                    </span>
                </button>
                <button
                    type='button'
                    className='text-input bg-input border-none focus:outline-none focus:bg-input focus:border-primary-100'
                    onClick={() => setIsOpen(!isOpen)}>
                    <span className='flex items-center pr-2 pointer-events-none'>
                        <HiChevronDown className={`h-5 w-5 ${isOpen ? 'transform rotate-180' : ''}`} />
                    </span>
                </button>

            </div>

            <div className='absolute z-50 mt-1 w-full bg-primary-500 shadow-lg max-h-60 rounded-es overflow-auto focus:outline-none'>
                <Animation animation={isOpen ? 'expandTop' : 'collapseTop'} >
                    {filteredOptions.map((option) =>
                        <button
                            key={option.value}
                            type='button'
                            className={`w-full text-left py-2 px-4 transition-opacity hover:text-paper opacity-90 hover:opacity-100 ${selectedOption?.value === option.value ? 'bg-primary-700 text-primary-900' : ''}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </button>
                    )}
                </Animation>
            </div>
        </div>
    );
};

export default ComboBox;
