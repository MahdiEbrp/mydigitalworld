import AdminError from '@/components/display/AdminError';
import Button from '@/components/Button';
import Card, { CardContent, CardTitle } from '@/components/Card';
import CircleButton from '@/components/CircleButton';
import ComboBox, { ComboBoxOption } from '@/components/ComboBox';
import FetchError from '@/components/display/FetchError';
import Head from 'next/head';
import Input from '@/components/Input';
import LabelledComponent from '@/components/LabelledComponent';
import Link from 'next/link';
import Loader from '@/components/display/Loader';
import TextArea from '@/components/TextArea';
import Tooltip from '@/components/Tooltip';
import getHumorousHTTPMessage from '@/lib/humorousHTTPMessage';
import useAdminGalleryData from '@/helpers/useAdminGalleryData';
import { AxiosError } from 'axios';
import { BiEdit } from 'react-icons/bi';
import { FaExclamationTriangle, FaTrash } from 'react-icons/fa';
import { Gallery } from '@/type/gallery';
import { IoAdd } from 'react-icons/io5';
import { RiAdminFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { useMessageBox } from '@/context/MessageBoxContext';
import { useToast } from '@/context/ToastContext';

const INPUT_ROWS = 8;

let altTag = '';
let src = '';
let title = '';
let location = '';
let description = '';
const AdminUpdateGallery = () => {

    const { galleryData, error, adminError, isLoading, isUpdating, insertGallery, updateGallery, deleteGallery, importGallery } = useAdminGalleryData();
    const { showMessageBox } = useMessageBox();
    const { showToast } = useToast();
    const [selectedValue, setSelectedValue] = useState('');
    const RenderContent = () => {
        const [options, setOptions] = useState<ComboBoxOption[]>([]);

        useEffect(() => {
            const values = galleryData.map((image) => ({
                value: image.id,
                label: image.title,
            }));
            setOptions(values);
        }, []);

        if (isLoading) return <Loader />;
        if (adminError) return <AdminError />;
        if (error) return <FetchError />;

        const handleSelectionChange = (value: string, index: number) => {
            if (index === -1) return;
            setSelectedValue(value);
            const post = galleryData[index];
            title = post.title;
            location = post.location;
            src = post.src;
            altTag = post.altTag;
            description = post.description;
        };
        const handleClear = () => {
            setSelectedValue('');
            title = '';
            location = '';
            src = '';
            altTag = '';
            description = '';
        };

        const handleDelete = async () => {
            const confirmButton = await showMessageBox('Deleting this item? Let\'s consult the committee of second thoughts! 🤔💥🗑️', 'Delete item', ['yes', 'no']);
            if (confirmButton === 'yes') {
                const { error } = await deleteGallery(selectedValue);

                if (error) {
                    if (error instanceof AxiosError)
                        showToast(getHumorousHTTPMessage(error.response?.status || 0), 'error', 4000);
                    else
                        showToast('Seriously, doesn\'t know what\'s happening.🧐👻', 'error', 2000);
                }
                else {
                    showToast('🗑️ Oopsie-daisy! 🚫📝 Your post has taken a one-way trip to the virtual dumpster! 🙌', 'success', 2000);
                    handleClear();
                }
            }
        };

        const handleUpdate = async (insertMode: boolean) => {
            if (!insertMode && selectedValue === '') {
                showToast('Oops! 🙈 No item selected. 😅', 'error');
                return;
            }
            if (title === '') {
                showToast('Oops, Missing Title Magic! 🎩✨', 'error');
                return;
            }
            if (location === '') {
                showToast('Lost. Location: Not Found. 🙈', 'error');
                return;
            }
            if (src === '') {
                showToast('📷 Oops! Image: Missing 😅', 'error');
                return;
            }
            if (altTag === '') {
                showToast('🤷‍♀️ Lost in Translation: Altless Image!', 'error');
                return;
            }
            if (description === '') {
                showToast('🤷‍♂️ No description: Words Gone Fishing!', 'error');
                return;
            }
            const id = insertMode ? Math.random().toString() : selectedValue;
            const newData = { id, title, src, altTag, location, description };
            let response: { error: unknown; } = { error: undefined };
            if (insertMode)
                response = await insertGallery(newData as Gallery);
            else
                response = await updateGallery(newData as Gallery);
            const { error } = response;
            if (error) {
                if (error instanceof AxiosError)
                    showToast(getHumorousHTTPMessage(error.status || 0), 'error', 4000);
                else
                    showToast('Seriously, doesn\'t know what\'s happening.🧐👻', 'error', 2000);
            }
            else {
                showToast(`🎉 Congratulations! You nailed it! 🙌 Your post has been successfully ${insertMode ? 'created' : 'updated'}. Keep up the great work! 💪`, 'success', 2000);
                handleClear();
            }

        };
        const handleImport = async () => {
            const confirmButton = await showMessageBox('Are you sure you want to import default data? Don\'t blame us for chaos! 😅', 'Import Data', ['yes', 'no']);
            if (confirmButton === 'yes') {
                const { error } = await importGallery();
                if (error) {
                    if (error instanceof AxiosError)
                        showToast(getHumorousHTTPMessage(error.response?.status || 0), 'error', 4000);
                    else
                        showToast('Seriously, doesn\'t know what\'s happening.🧐👻', 'error', 2000);
                }
                else {
                    showToast('🎉 Congratulations! You nailed it! 🙌 The data has been successfully imported. Keep up the great work! 💪', 'success', 2000);
                    handleClear();
                }

            }

        };
        return (
            <Card className='w-[min(90vh,90%)]'>
                <CardTitle title='Admin-Update Gallery' />
                <CardContent>
                    <div className='flex flex-col gap-1'>
                        <LabelledComponent label='Select post'>
                            <ComboBox selectedValue={selectedValue} options={options} onSelectionChange={handleSelectionChange} onClear={handleClear} />
                        </LabelledComponent>
                        <LabelledComponent label='Title'>
                            <Input defaultValue={title} onChange={e => title = e.target.value}
                                id='title' name='title'
                                maxLength={500} className='border border-primary-100 rounded' />
                        </LabelledComponent>
                        <LabelledComponent label='Location'>
                            <Input defaultValue={location}
                                id='location' name='location' onChange={e => location = e.target.value}
                                maxLength={500} className='border border-primary-100 rounded' />
                        </LabelledComponent>
                        <LabelledComponent label='Image URL'>
                            <Input defaultValue={src} maxLength={500}
                                id='image' name='image' onChange={e => src = e.target.value}
                                className='border border-primary-100 rounded' />
                        </LabelledComponent>
                        <LabelledComponent label='Alt tag'>
                            <Input id='alt' defaultValue={altTag} onChange={e => altTag = e.target.value}
                                maxLength={100} className='border border-primary-100 rounded' />
                        </LabelledComponent>
                        <LabelledComponent label='Description'>
                            <TextArea defaultValue={description} onChange={e => description = e.target.value}
                                rows={INPUT_ROWS}
                                id='description' name='description'
                                maxLength={1024}
                            />
                        </LabelledComponent>
                        <div className='flex justify-between items-center flex-col sm:flex-row '>
                            <div className='flex '>
                                <Tooltip text='Add New'>
                                    <CircleButton disabled={isUpdating} onClick={() => handleUpdate(true)}>
                                        <IoAdd className='w-7 h-7' />
                                    </CircleButton>
                                </Tooltip>
                                <Tooltip text='Update'>
                                    <CircleButton disabled={selectedValue === '' || isUpdating} onClick={() => handleUpdate(false)}>
                                        <BiEdit className='w-7 h-7' />
                                    </CircleButton>
                                </Tooltip>
                                <Tooltip text='Delete'>
                                    <CircleButton disabled={selectedValue === '' || isUpdating} onClick={handleDelete}>
                                        <FaTrash className='w-7 h-7' />
                                    </CircleButton>
                                </Tooltip>
                            </div>
                            <Button disabled={isUpdating} className='gap-1' onClick={handleImport}>
                                <FaExclamationTriangle className='w-5 h-5' />
                                <span>Import From JSON</span>
                            </Button>
                            <Tooltip text='Back To admin panel'>
                                <Link href='/admin/adminPanel'>
                                    <CircleButton>
                                        <RiAdminFill className='w-7 h-7' />
                                    </CircleButton>
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <>
            <Head>
                <title>Admin-Update Gallery</title>
            </Head>
            <div className='flex justify-center items-center min-h-screen min-w-full'>
                <RenderContent />
            </div>
        </>
    );
};

export default AdminUpdateGallery;
