import React, { useState } from 'react';
import { RiCheckboxBlankLine, RiCheckboxFill } from 'react-icons/ri';

type CheckboxProps = {
    label: string;
    onCheckedChange?: (checked: boolean) => void;
    defaultChecked: boolean;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

const Checkbox: React.FC<CheckboxProps> = ({
    label,
    onCheckedChange,
    defaultChecked,
    ...rest
}) => {
    const [isChecked, setIsChecked] = useState<boolean>(defaultChecked);

    const { className, ...otherProps } = rest;

    const handleCheckboxChange = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        onCheckedChange?.(newCheckedState);
    };

    return (
        <label {...otherProps} className={`flex items-center cursor-pointer ${className || ''}`}>
            <input
                type='checkbox'
                className='hidden'
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <div className='flex items-center'>
                {isChecked ?
                    <RiCheckboxFill className='w-7 h-7 animate-wobble' />
                    :
                    <RiCheckboxBlankLine className='w-7 h-7 animate-wobble' />
                }
            </div>
            <span>{label}</span>
        </label>
    );
};

export default Checkbox;
