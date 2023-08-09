import { IconType } from 'react-icons';

type SubjectProps = {
    icon: IconType;
    subject: string;
    detail: string;
};

const SubjectItem = ({ icon: Icon, subject, detail }: SubjectProps) =>
    <div className='flex flex-col sm:flex-row justify-between items-center mb-2'>
        <div className='flex items-baseline sm:items-center'>
            <Icon className='mr-2 text-primary-800' />
            <span className='text-primary-800 text-center'>{subject}</span>
        </div>
        <hr className='border-text-800 border-opacity-20 border-dotted flex-grow ml-2' />
        <span className='font-bold text-center text-primary-900'>{detail}</span>
    </div>
    ;

export default SubjectItem;