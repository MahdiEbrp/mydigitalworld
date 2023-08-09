import { HTMLAttributes, ReactNode, isValidElement, useState } from 'react';

type TooltipProps = {
    text: string;
    children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const getDisabledProps = (element: ReactNode) => {
    if (!isValidElement(element) || !element.props.disabled) {
        return false;
    }
    return Boolean(element.props.disabled);
};

const Tooltip = ({ text, children, ...rest }: TooltipProps) => {
    const { className } = { ...rest };

    const [showTooltip, setShowTooltip] = useState(false);
    const isDisabled = getDisabledProps(children);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <div {...rest} className='relative inline-block' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {children}
            {!isDisabled &&
                <div
                    className={`${className ? className : ''} z-[99999] absolute top-[100%] left-1/2 transition-all transform translate-x-[-50%] bg-primaryBackground-800 text-paper px-2 py-1 rounded text-xs whitespace-nowrap ${showTooltip ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                >
                    {text}
                </div>
            }
        </div>
    );
};

export default Tooltip;
