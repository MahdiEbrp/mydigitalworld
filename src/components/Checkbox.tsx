import React, { useEffect, useState } from 'react';
import { RiCheckboxBlankLine, RiCheckboxFill } from 'react-icons/ri';

type CheckboxProps = {
    label: string;
    onCheckedChange?: (checked: boolean) => void;
    defaultChecked: boolean;
    onClick?: () => void;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

const Checkbox: React.FC<CheckboxProps> = ({
    label,
    onCheckedChange,
    defaultChecked,
    onClick,
    ...rest
}) => {
    const [isChecked, setIsChecked] = useState<boolean>(defaultChecked);

    const { className, ...otherProps } = rest;

    const handleCheckboxChange = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        onCheckedChange?.(newCheckedState);
    };

    const handleClick = () => {
        onClick?.();
    };
    useEffect(() => {
        setIsChecked(defaultChecked);
    }, [defaultChecked]);
    return (
        <label {...otherProps} className={`flex items-center cursor-pointer ${className || ''}`} onClick={e => e.preventDefault}>
            <input
                type='checkbox'
                className='hidden'
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <div className='flex items-center' onClick={handleClick}>
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
