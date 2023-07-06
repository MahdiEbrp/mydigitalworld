import { HTMLAttributes, ReactNode } from 'react';

type LabelledComponentProps = {
    label: string;
    children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const LabelledComponent = ({ label, children, ...rest }: LabelledComponentProps) => {
    const { className } = { ...rest };

    return (
        <div {...rest} className={`flex flex-col gap-1 items-center w-full ${className ? className : ''}`}>
            <h4>{label}:</h4>
            {children}
        </div>
    );
};
export default LabelledComponent;