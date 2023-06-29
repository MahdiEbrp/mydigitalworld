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



const AdminUpdateGallery = () => {
    const altTagRef = useRef<HTMLInputElement>(null);
    const srcRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const locationRef = useRef<HTMLInputElement>(null);

    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    const { galleryData, error, adminError, isLoading } = useAdminGalleryData();

    const RenderContent = () => {
        const [options, setOptions] = useState<ComboBoxOption[]>([]);
        const [selectedIndex, setSelectedIndex] = useState(-1);

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
            setSelectedIndex(index);
            if (index === -1)
                return;
            const post = galleryData[index];
            if (srcRef.current && descriptionRef.current && altTagRef.current && titleRef.current && locationRef.current) {
                titleRef.current.value = post.title;
                srcRef.current.value = post.src;
                altTagRef.current.value = post.altTag;
                locationRef.current.value = post.location;
                descriptionRef.current.value = post.description;

            }
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
                            <Input maxLength={500} className='border border-primary-100 rounded' inputRef={titleRef} />
                        </LabelledComponent>
                        <LabelledComponent label='Image URL'>
                            <Input maxLength={500} className='border border-primary-100 rounded' inputRef={srcRef} />
                        </LabelledComponent>
                        <LabelledComponent label='Location'>
                            <Input maxLength={500} className='border border-primary-100 rounded' inputRef={locationRef} />
                        </LabelledComponent>
                        <LabelledComponent label='Alt tag'>
                            <Input maxLength={100} className='border border-primary-100 rounded' inputRef={altTagRef} />
                        </LabelledComponent>
                        <LabelledComponent label='Description'>
                            <TextArea
                                rows={INPUT_ROWS}
                                inputRef={descriptionRef}
                                maxLength={1024}
                            />
                        </LabelledComponent>
                        <div className='flex justify-between items-center flex-col sm:flex-row '>
                            <div className='flex '>
                                <Tooltip text='Add New'>
                                    <CircleButton>
                                        <IoAdd className='w-7 h-7' />
                                    </CircleButton>
                                </Tooltip>
                                <Tooltip text='Update'>
                                    <CircleButton disabled={selectedIndex === -1}>
                                        <BiEdit className='w-7 h-7' />
                                    </CircleButton>
                                </Tooltip>
                                <Tooltip text='Delete'>
                                    <CircleButton disabled={selectedIndex === -1}>
                                        <FaTrash className='w-7 h-7' />
                                    </CircleButton>
                                </Tooltip>
                            </div>
                            <Button >
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
