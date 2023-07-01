import { ReactNode, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Card, { CardContent, CardTitle } from '@/components/Card';
import ComboBox, { ComboBoxOption } from '@/components/ComboBox';
import AdminError from '@/components/display/AdminError';
import FetchError from '@/components/display/FetchError';
import Loader from '@/components/display/Loader';
import NothingToSee from '@/components/display/NothingToSee';
import useAdminGalleryData from '@/helpers/useAdminGalleryData';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import { FaExclamationTriangle, FaTrash } from 'react-icons/fa';
import CircleButton from '@/components/CircleButton';
import Button from '@/components/Button';
import { IoAdd } from 'react-icons/io5';
import Tooltip from '@/components/Tooltip';
import { BiEdit } from 'react-icons/bi';
import { useMessageBox } from '@/context/MessageBoxContext';
import { Gallery } from '@/type/gallery';
import { useToast } from '@/context/ToastContext';

const INPUT_ROWS = 8;

type LabelledComponentProps = {
    label: string;
    children: ReactNode;
};

const LabelledComponent = ({ label, children }: LabelledComponentProps) => {
    return (
        <div className='flex flex-col gap-1 items-center w-full'>
            <h4>{label}:</h4>
            {children}
        </div>
    );
};
let selectedValue = '';
let title = '';
let location = '';
let src = '';
let altTag = '';
let description = '';
const AdminUpdateGallery = () => {
    const altTagRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const srcRef = useRef<HTMLInputElement>(null);
    const locationRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const { galleryData, error, adminError, isLoading, insertGallery } = useAdminGalleryData();
    const { showMessageBox } = useMessageBox();
    const { showToast } = useToast();

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
        if (!galleryData || galleryData.length === 0) return <NothingToSee />;

        const handleSelectionChange = (value: string, index: number) => {
            if (index === -1) return;
            selectedValue = value;
            const post = galleryData[index];
            if (titleRef.current && locationRef.current && srcRef.current && altTagRef.current && descriptionRef.current) {
                titleRef.current.value = post.title;
                locationRef.current.value = post.location;
                srcRef.current.value = post.src;
                altTagRef.current.value = post.altTag;
                descriptionRef.current.value = post.description;
            }
        };
        const handleClear = () => {
            selectedValue = '';
            if (titleRef.current && locationRef.current && srcRef.current && altTagRef.current && descriptionRef.current) {
                titleRef.current.value = '';
                locationRef.current.value = '';
                srcRef.current.value = '';
                altTagRef.current.value = '';
                descriptionRef.current.value = '';
            }
        };
        const handleDelete = async () => {
            const button = await showMessageBox('Are you sure?', 'Delete item', ['yes', 'no']);

        };
        const handleInputChange = () => {
            if (!titleRef.current || !locationRef.current || !srcRef.current || !altTagRef.current || !descriptionRef.current) {
                showToast('Invalid object!', 'error');
                return;
            }
            title = titleRef.current.value;
            location = locationRef.current.value;
            src = srcRef.current.value;
            altTag = altTagRef.current.value;
            description = descriptionRef.current.value;
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
            insertGallery(newData as Gallery);
        };
        return (
            <Card className='w-[min(90vh,90%)]'>
                <CardTitle title='Admin-Update Gallery' />
                <CardContent>
                    <div className='flex flex-col gap-1'>
                        <LabelledComponent label='Select post'>
                            <ComboBox options={options} onSelectionChange={handleSelectionChange} onClear={handleClear} />
                        </LabelledComponent>
                        <LabelledComponent label='Title'>
                            <Input defaultValue={title} inputRef={titleRef} onChange={handleInputChange}
                                id='title' name='title'
                                maxLength={500} className='border border-primary-100 rounded' />
                        </LabelledComponent>
                        <LabelledComponent label='Location'>
                            <Input defaultValue={location} inputRef={locationRef}
                                id='location' name='location' onChange={handleInputChange}
                                maxLength={500} className='border border-primary-100 rounded' />
                        </LabelledComponent>
                        <LabelledComponent label='Image URL'>
                            <Input defaultValue={src} inputRef={srcRef} maxLength={500}
                                id='image' name='image' onChange={handleInputChange}
                                className='border border-primary-100 rounded' />
                        </LabelledComponent>
                        <LabelledComponent label='Alt tag'>
                            <Input id='alt' defaultValue={altTag} onChange={handleInputChange}
                                inputRef={altTagRef} maxLength={100} className='border border-primary-100 rounded' />
                        </LabelledComponent>
                        <LabelledComponent label='Description'>
                            <TextArea defaultValue={description} onChange={handleInputChange}
                                rows={INPUT_ROWS} inputRef={descriptionRef}
                                id='description' name='description'
                                maxLength={1024}
                            />
                        </LabelledComponent>
                        <div className='flex justify-between items-center flex-col sm:flex-row '>
                            <div className='flex '>
                                <Tooltip text='Add New'>
                                    <CircleButton onClick={() => handleUpdate(true)}>
                                        <IoAdd className='w-7 h-7' />
                                    </CircleButton>
                                </Tooltip>
                                <Tooltip text='Update'>
                                    <CircleButton disabled={selectedValue === ''} onClick={() => handleUpdate(false)}>
                                        <BiEdit className='w-7 h-7' />
                                    </CircleButton>
                                </Tooltip>
                                <Tooltip text='Delete'>
                                    <CircleButton disabled={selectedValue === ''} onClick={handleDelete}>
                                        <FaTrash className='w-7 h-7' />
                                    </CircleButton>
                                </Tooltip>
                            </div>
                            <Button className='gap-1'>
                                <FaExclamationTriangle className='w-5 h-5' />
                                <span>Import From JSON</span>
                            </Button>
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
