import { ReactNode, useEffect, useState } from 'react';
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
let selectedValue ='';
const AdminUpdateGallery = () => {
    const [altTag, setAltTag] = useState('');
    const [title, setTitle] = useState('');
    const [src, setSrc] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const { galleryData, error, adminError, isLoading } = useAdminGalleryData();
    const { showMessageBox } = useMessageBox();


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
            if (index === -1)
                return;
            selectedValue = value;
            const post = galleryData[index];
            setTitle(post.title);
            setLocation(post.location);
            setSrc(post.src);
            setAltTag(post.altTag);
            setDescription(post.description);
        };
        const showDeleteMessageBox = async () => {
            const button = await showMessageBox('Are you sure?', 'Delete item', ['yes', 'no']);

        };
        return (
            <Card className='w-[min(90vh,90%)]'>
                <CardTitle title='Admin-Update Gallery' />
                <CardContent>
                    <div className='flex flex-col gap-1'>
                        <LabelledComponent label='Select post'>
                            <ComboBox options={options} onSelectionChange={handleSelectionChange} />
                        </LabelledComponent>
                        <LabelledComponent label='Title'>
                            <Input defaultValue={title} maxLength={500} className='border border-primary-100 rounded' onBlur={(e) => setTitle(e.currentTarget.value)} />
                        </LabelledComponent>
                        <LabelledComponent label='Location'>
                            <Input defaultValue={location} maxLength={500} className='border border-primary-100 rounded' onBlur={(e) => setLocation(e.currentTarget.value)} />
                        </LabelledComponent>
                        <LabelledComponent label='Image URL'>
                            <Input defaultValue={src} maxLength={500} className='border border-primary-100 rounded' onBlur={(e) => setSrc(e.currentTarget.value)} />
                        </LabelledComponent>
                        <LabelledComponent label='Alt tag'>
                            <Input defaultValue={altTag} maxLength={100} className='border border-primary-100 rounded' onBlur={(e) => setAltTag(e.currentTarget.value)} />
                        </LabelledComponent>
                        <LabelledComponent label='Description'>
                            <TextArea
                                rows={INPUT_ROWS}
                                defaultValue={description}
                                onBlur={(e) => setDescription(e.currentTarget.value)}
                                maxLength={1024}
                            />
                        </LabelledComponent>
                        <div className='flex justify-between items-center flex-col sm:flex-row '>
                            <div className='flex '>
                                <Tooltip text='Add New'>
                                    <CircleButton onClick={showDeleteMessageBox}>
                                        <IoAdd className='w-7 h-7' />
                                    </CircleButton>
                                </Tooltip>
                                <Tooltip text='Update'>
                                    <CircleButton disabled={selectedValue === ''}>
                                        <BiEdit className='w-7 h-7' />
                                    </CircleButton>
                                </Tooltip>
                                <Tooltip text='Delete'>
                                    <CircleButton disabled={selectedValue === ''}>
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
