import React, { isValidElement, ReactElement } from 'react';

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

const TabGroup: React.FC<TabGroupProps> = ({ activeId, children, ...rest }) => {
    return (
        <div className='flex flex-col' {...rest}>
            {React.Children.map(children, (child) => {
                if (isValidElement(child) && typeof child.type === 'function' && child.type.name === 'Tab') {
                    const tab = child as unknown as ReactElement<TabProps>;
                    return (
                        <div className={`${activeId === tab.props.id ? 'block' : 'hidden'}`}>
                            {tab.props.children}
                        </div>
                    );
                }
                else {
                    // eslint-disable-next-line no-console
                    console.error('TabGroup can only have Tab components as children');
                    return <></>;
                }
            })}
        </div>
    );
};

export { Tab, TabGroup };
