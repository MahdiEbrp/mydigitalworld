/* eslint-disable max-lines */
import AdminError from '@/components/display/AdminError';
import Button from '@/components/Button';
import Card, { CardContent, CardTitle } from '@/components/Card';
import Checkbox from '@/components/Checkbox';
import CircleButton from '@/components/CircleButton';
import ComboBox from '@/components/ComboBox';
import FetchError from '@/components/display/FetchError';
import Head from 'next/head';
import Input from '@/components/Input';
import LabelledComponent from '@/components/LabelledComponent';
import Link from 'next/link';
import Loader from '@/components/display/Loader';
import React, { useMemo, useState } from 'react';
import TextArea from '@/components/TextArea';
import Tooltip from '@/components/Tooltip';
import getHumorousHTTPMessage from '@/lib/humorousHTTPMessage';
import getMarkdownSlugs, { getThumbnails } from '@/lib/fileHelper';
import useAdminPostsData from '@/helpers/useAdminPostsData';
import { AxiosError } from 'axios';
import { BiEdit } from 'react-icons/bi';
import { FaExclamationTriangle, FaTrash } from 'react-icons/fa';
import { GetStaticProps } from 'next';
import { IoAdd } from 'react-icons/io5';
import { Post } from '@/type/posts';
import { RiAdminFill } from 'react-icons/ri';
import { useMessageBox } from '@/context/MessageBoxContext';
import { useToast } from '@/context/ToastContext';

const INPUT_ROWS = 8;

let title = '';
let description = '';
let keywords = '';
type AdminUpdatePostsProps = {
    slugs: string[];
    thumbnails: string[];
};
const AdminUpdatePosts: React.FC<AdminUpdatePostsProps> = ({ slugs, thumbnails }) => {

    const { postsData, error, adminError, isLoading, isUpdating, insertPost, updatePost, deletePost, importPosts } =
        useAdminPostsData();
    const { showMessageBox } = useMessageBox();
    const { showToast } = useToast();
    const [selectedMarkdown, setSelectedMarkdown] = useState('');
    const [selectedThumbnail, setSelectedThumbnail] = useState('');
    const [canInsert, setCanInsert] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const RenderContent = () => {

        const markdowns = useMemo(() => slugs.map((slug) => ({
            value: slug,
            label: slug,
        })), []);
        const _thumbnails = useMemo(() => thumbnails.map((thumbnail) => ({
            value: thumbnail,
            label: thumbnail,
        })), []);

        if (error) return <FetchError />;
        if (isLoading) return <Loader />;
        if (adminError) return <AdminError />;

        const handleMarkdownChange = (value: string, index: number) => {
            if (index === -1) return;
            setSelectedMarkdown(value);
            const filteredPost = postsData.find(post => post.fileName === value);
            if (filteredPost) {
                title = filteredPost.title;
                description = filteredPost.description;
                keywords = filteredPost.keywords;
                setCanInsert(false);
                setIsVisible(filteredPost.isVisible);
                setSelectedThumbnail(filteredPost.thumbnail);

            }
            else {
                title = '';
                keywords = '';
                description = '';
                setCanInsert(true);
                setIsVisible(true);
                setSelectedThumbnail('');

            }
        };
        const handleThumbnailChange = (value: string, index: number) => {
            if (index === -1) return;
            setSelectedThumbnail(value);
        };

        const handleClear = () => {
            setSelectedMarkdown('');
            setSelectedThumbnail('');
            title = '';
            keywords = '';
            description = '';

        };

        const handleDelete = async () => {
            const confirmButton = await showMessageBox('Deleting this item? Let\'s consult the committee of second thoughts! 🤔💥🗑️', 'Delete item', ['yes', 'no']);
            if (confirmButton === 'yes') {
                const { error } = await deletePost(selectedMarkdown);

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
            if (selectedMarkdown === '') {
                showToast('Oops! 🙈 No Markup selected. 😅', 'error');
                return;
            }
            if (selectedThumbnail === '') {
                showToast('Oops! 😱 Thumbnail missing. 🙈', 'error');
                return;
            }
            if (title === '') {
                showToast('Oops, Missing Title Magic! 🎩✨', 'error');
                return;
            }
            if (description === '') {
                showToast('🤷‍♂️ No description: Words Gone Fishing!', 'error');
                return;
            }
            if (keywords === '') {
                showToast('I\'m so lost, I need some keywords 🔍', 'error');
                return;
            }
            const newData = { fileName: selectedMarkdown,thumbnail:selectedThumbnail, title, keywords, description, isVisible };
            let response: { error: unknown; } = { error: undefined };

            if (insertMode)
                response = await insertPost(newData as unknown as Post);
            else
                response = await updatePost(newData as unknown as Post);

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
                const { error } = await importPosts();
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
        const handleCheckBox = () => {
            setIsVisible(prev => !prev);
        };

        return (
            <Card className='w-[min(90vh,90%)]'>
                <CardTitle title='Admin-Update Blog Posts' />
                <CardContent>
                    <div className='flex flex-col gap-1'>
                        <LabelledComponent label='Select blog post'>
                            <ComboBox selectedValue={selectedMarkdown} options={markdowns} onSelectionChange={handleMarkdownChange} onClear={handleClear} />
                        </LabelledComponent>
                        <LabelledComponent label='Select thumbnail'>
                            <ComboBox selectedValue={selectedThumbnail} options={_thumbnails} onSelectionChange={handleThumbnailChange} onClear={handleClear} />
                        </LabelledComponent>
                        <LabelledComponent label='Title'>
                            <Input defaultValue={title} onChange={e => title = e.target.value}
                                id='title' name='title'
                                maxLength={500} className='border border-primary-100 rounded' />
                        </LabelledComponent>
                        <LabelledComponent label='keywords'>
                            <Input id='keywords' defaultValue={keywords} onChange={e => keywords = e.target.value}
                                maxLength={100} className='border border-primary-100 rounded' />
                        </LabelledComponent>
                        <LabelledComponent label='Description'>
                            <TextArea defaultValue={description} onChange={e => description = e.target.value}
                                rows={INPUT_ROWS}
                                id='description' name='description'
                                maxLength={500}
                            />
                        </LabelledComponent>
                        <Checkbox label='Grant visibility to the blog post.' defaultChecked={isVisible} onClick={handleCheckBox} />
                        <div className='flex justify-between items-center flex-col sm:flex-row '>
                            <div className='flex '>
                                <Tooltip text='Add New'>
                                    <CircleButton disabled={selectedMarkdown === '' || isUpdating || !canInsert} onClick={() => handleUpdate(true)}>
                                        <IoAdd className='w-7 h-7' />
                                    </CircleButton>
                                </Tooltip>
                                <Tooltip text='Update'>
                                    <CircleButton disabled={selectedMarkdown === '' || isUpdating || canInsert} onClick={() => handleUpdate(false)}>
                                        <BiEdit className='w-7 h-7' />
                                    </CircleButton>
                                </Tooltip>
                                <Tooltip text='Delete'>
                                    <CircleButton disabled={selectedMarkdown === '' || isUpdating || canInsert} onClick={handleDelete}>
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
                <title>Admin-Update Post</title>
            </Head>
            <div className='flex justify-center items-center min-h-screen min-w-full'>
                <RenderContent />
            </div>
        </>
    );
};
export const getStaticProps: GetStaticProps<AdminUpdatePostsProps> = async () => {
    const slugs = getMarkdownSlugs();
    const thumbnails = getThumbnails();
    return {
        props: {
            slugs,
            thumbnails
        },
    };
};
export default AdminUpdatePosts;
