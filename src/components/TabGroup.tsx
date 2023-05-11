import React, { ReactElement } from 'react';

type TabProps = {
    id: string;
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

type TabGroupProps = {
    activeId: string;
    children: ReactElement<TabProps>[];
} & React.HTMLAttributes<HTMLDivElement>;

const Tab: React.FC<TabProps> = ({ id, children, ...rest }) => {
    return (
        <div id={id} {...rest}>
            {children}
        </div>
    );
};

const TabGroup: React.FC<TabGroupProps> = ({ activeId, children, className, ...rest }) => {

    return (
        <div className={`flex flex-col ${className || ''}`} {...rest}>
            {children.map((child) => {
                const tab = child as ReactElement<TabProps>;
                return (
                    <div key={tab.props.id} className={`${activeId === tab.props.id ? 'block' : 'hidden'} ${tab.props.className || ''}`}>
                        {tab.props.children}
                    </div>
                );
            })}
        </div>
    );
};

export { Tab, TabGroup };
