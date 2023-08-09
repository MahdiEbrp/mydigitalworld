import React, { ReactElement } from 'react';

type TabProps = {
    id: string;
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

type TabGroupProps = {
    activeId: string;
    children: ReactElement<TabProps>[];
    useFadeIn?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Tab: React.FC<TabProps> = ({ id, children, ...rest }) => {
    return (
        <div  {...rest} id={id}>
            {children}
        </div>
    );
};

const TabGroup: React.FC<TabGroupProps> = ({ activeId, children, className, useFadeIn = false, ...rest }) => {

    return (
        <div {...rest} className={`flex flex-col ${className || ''}`}>
            {children.map((child) => {
                const tab = child as ReactElement<TabProps>;
                return (
                    <div key={tab.props.id} className={`${useFadeIn ? 'animate-fadeIn' : ''} ${activeId === tab.props.id ? 'block' : 'hidden'} ${tab.props.className || ''}`}>
                        {tab.props.children}
                    </div>
                );
            })}
        </div>
    );
};

export { Tab, TabGroup };
