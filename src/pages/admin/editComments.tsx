import AdminError from '@/components/display/AdminError';
import Card, { CardContent, CardTitle } from '@/components/Card';
import CircleButton from '@/components/CircleButton';
import ComboBox, { ComboBoxOption } from '@/components/ComboBox';
import CommentList from '@/components/CommentList';
import FetchError from '@/components/display/FetchError';
import Head from 'next/head';
import LabelledComponent from '@/components/LabelledComponent';
import Loader from '@/components/display/Loader';
import Tooltip from '@/components/Tooltip';
import getHumorousHTTPMessage from '@/lib/humorousHTTPMessage';
import useAdminCommentsData from '@/helpers/useAdminCommentsData';
import { AxiosError } from 'axios';
import { FaTrash } from 'react-icons/fa';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useMessageBox } from '@/context/MessageBoxContext';
import { useToast } from '@/context/ToastContext';

const AdminEditComments = () => {

    const { commentsData, error, isAdminForbidden, isLoading, isUpdating, deleteComments } = useAdminCommentsData();
    const [selectedTopic, setSelectedTopic] = useState('');
    const [checkedIds, setCheckedIds] = useState<string[]>([]);
    const { showMessageBox } = useMessageBox();
    const { showToast } = useToast();

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
        if (isAdminForbidden) return <AdminError />;
        if (error) return <FetchError />;

        const handleTopicChange = (value: string, index: number) => {
            if (index === -1) return;
            setSelectedTopic(value);
        };
        const handleTopicClear = () => {
            setSelectedTopic('');
        };
        const handleCheckedChange = (id: string) => {
            const newIds = checkedIds.includes(id) ? checkedIds.filter(prevId => prevId !== id) : [...checkedIds, id];
            setCheckedIds(newIds);
        };
        const handleDeselect = () => {
            setCheckedIds([]);
        };
        const handleSelectAll = () => {
            const commentIds = commentsData?.comments.map((comment) => comment.id) || [];
            setCheckedIds(commentIds);
        };
        const handleDelete = async () => {
            const confirmButton = await showMessageBox('Deleting this item? Let\'s consult the committee of second thoughts! 🤔💥🗑️', 'Delete item', ['yes', 'no']);
            if (confirmButton === 'yes') {
                const { error } = await deleteComments(checkedIds);

                if (error) {
                    if (error instanceof AxiosError)
                        showToast(getHumorousHTTPMessage(error.response?.status || 0), 'error', 4000);
                    else
                        showToast('Seriously, doesn\'t know what\'s happening.🧐👻', 'error', 2000);
                }
                else {
                    showToast('🗑️ Oopsie-daisy! 🚫📝 Your post has taken a one-way trip to the virtual dumpster! 🙌', 'success', 4000);
                }
            }
        };
        return (
            <Card className='w-[min(90vh,90%)]'>
                <CardTitle title='Admin-Update Comments' />
                <CardContent>
                    <div className='flex flex-col gap-1'>
                        <LabelledComponent label='Select post'>
                            <ComboBox selectedValue={selectedTopic} options={options} onSelectionChange={handleTopicChange} onClear={handleTopicClear} />
                        </LabelledComponent>
                        <CommentList commentList={commentsData?.comments || []} filterSelectedId={selectedTopic} onSelectionChange={(item) => handleCheckedChange(item)} checkedIds={checkedIds} />
                        <div className='flex justify-between items-center flex-col sm:flex-row '>
                            <div className='flex '>
                                <Tooltip text='Select All'>
                                    <CircleButton disabled={isUpdating} onClick={handleSelectAll}>
                                        <MdCheckBox className='w-7 h-7' />
                                    </CircleButton>
                                </Tooltip>
                                <Tooltip text='Deselect All' onClick={handleDeselect}>
                                    <CircleButton disabled={isUpdating} >
                                        <MdCheckBoxOutlineBlank className='w-7 h-7' />
                                    </CircleButton>
                                </Tooltip>
                                <Tooltip text='Delete'>
                                    <CircleButton disabled={isUpdating} onClick={handleDelete}>
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


