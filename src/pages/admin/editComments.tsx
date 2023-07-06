import AdminError from '@/components/display/AdminError';
import Card, { CardContent, CardTitle } from '@/components/Card';
import CircleButton from '@/components/CircleButton';
import ComboBox, { ComboBoxOption } from '@/components/ComboBox';
import FetchError from '@/components/display/FetchError';
import Head from 'next/head';
import LabelledComponent from '@/components/LabelledComponent';
import Loader from '@/components/display/Loader';
import Tooltip from '@/components/Tooltip';
import useAdminCommentsData from '@/helpers/useAdminCommentsData';
import { FaCalendarCheck, FaCheckSquare, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const AdminEditComments = () => {

    const { commentsData, error, adminError, isLoading, isUpdating } = useAdminCommentsData();
    const [selectedTopic, setSelectedTopic] = useState('');
    const RenderContent = () => {
        const [options, setOptions] = useState<ComboBoxOption[]>([]);

        useEffect(() => {
            const values = commentsData?.topics.map(comment => ({
                value: comment.id,
                label: comment.description || 'No description',
            }));
            setOptions(values || []);
        }, []);

        if (isLoading) return <Loader />;
        if (adminError) return <AdminError />;
        if (error) return <FetchError />;

        const handleSelectionChange = (value: string, index: number) => {
            if (index === -1) return;
            setSelectedTopic(value);
        };
        const handleClear = () => {
            setSelectedTopic('');
        };
        return (
            <Card className='w-[min(90vh,90%)]'>
                <CardTitle title='Admin-Update Comments' />
                <CardContent>
                    <div className='flex flex-col gap-1'>
                        <LabelledComponent label='Select post'>
                            <ComboBox selectedValue={selectedTopic} options={options} onSelectionChange={handleSelectionChange} onClear={handleClear} />
                        </LabelledComponent>
                        <div className='flex justify-between items-center flex-col sm:flex-row '>
                            <div className='flex '>
                                <Tooltip text='Select All'>
                                    <CircleButton disabled={isUpdating}>
                                        <FaCheckSquare className='w-7 h-7' />
                                    </CircleButton>
                                </Tooltip>
                                <Tooltip text='Deselect All'>
                                    <CircleButton disabled={isUpdating} >
                                        <FaCalendarCheck className='w-7 h-7' />
                                    </CircleButton>
                                </Tooltip>
                                <Tooltip text='Delete'>
                                    <CircleButton disabled={isUpdating} >
                                        <FaTrash className='w-7 h-7' />
                                    </CircleButton>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <>
            <Head>
                <title>Admin-Edit Comments</title>
            </Head>
            <div className='flex justify-center items-center min-h-screen min-w-full'>
                <RenderContent />
            </div>
        </>
    );
};

export default AdminEditComments;
