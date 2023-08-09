import Input from './Input';
import React, { HTMLAttributes, useEffect, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { MdClear } from 'react-icons/md';

export type ComboBoxOption = {
    label: string;
    value: string;
};

type ComboBoxProps = {
    options: ComboBoxOption[];
    selectedValue?: string;
    onSelectionChange?: (value: string, index: number) => void;
    onClear?: () => void;
} & HTMLAttributes<HTMLDivElement>;
const ComboBox: React.FC<ComboBoxProps> = ({ options, selectedValue, onSelectionChange, onClear, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState<ComboBoxOption[]>([]);
    const [inputValue, setInputValue] = useState('');
    const { className } = rest;

    useEffect(() => {
        const selectedOption = options.find(op => op.value === selectedValue || '');
        if (selectedOption)
            setInputValue(selectedOption.label);
    }, [selectedValue, options]);
    useEffect(() => {
        setFilteredOptions(options);
    }, [options]);

    const handleOptionClick = (option: ComboBoxOption) => {
        const selectedIndex = options.findIndex(item => item.value === option.value);
        onSelectionChange?.(option.value, selectedIndex);
        setIsOpen(false);
        setInputValue(option.label);
    };

    const handleInputChange = (label: string) => {
        setInputValue(label);
        const searchText = label.trim();
        const regex = new RegExp(searchText, 'i');
        const filteredOptions = options.filter(option => regex.test(option.label));
        setFilteredOptions(filteredOptions);
    };
    const handleClear = () => {
        setFilteredOptions(options);
        onSelectionChange?.('', -1);
        setInputValue('');
        setIsOpen(false);
        onClear?.();
    };

    return (
        <div className={`${className ? className : ''} relative w-full`}>
            <div className='flex border rounded overflow-hidden border-primary-100'>
                <Input
                    placeholder='Keyboard, unleash the searching power!'
                    value={inputValue}
                    onClick={() => setIsOpen(true)}
                    onChange={(e) => handleInputChange(e.target.value)}
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

            <div className={`${isOpen ? 'opacity-100' : 'opacity-0 max-w-0 max-h-0'} transition-all duration-300 absolute z-50 mt-1 w-full bg-primary-500 shadow-lg max-h-60 rounded-es overflow-auto focus:outline-none`}>
                {filteredOptions.map((option) =>
                    <button
                        key={option.value}
                        type='button'
                        className={`w-full text-left py-2 px-4 transition-opacity hover:text-paper opacity-90 hover:opacity-100 ${selectedValue === option.value ? 'bg-primary-700 text-primary-900' : ''}`}
                        onClick={() => handleOptionClick(option)}
                    >
                        {option.label}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ComboBox;
