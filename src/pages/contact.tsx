import Card, { CardContent, CardTitle } from '@/components/Card';
import Head from 'next/head';
import ImageLoader from '@/components/ImageLoader';
import React from 'react';
import Tooltip from '@/components/Tooltip';
import { FaGithub, FaInstagram, FaLinkedin, FaTelegram } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { MdEmail } from 'react-icons/md';

type ContactLinkProps = {
    icon: IconType;
    link: string;
    className: string;
    tooltipText: string;
}

const ContactLink = ({ icon: Icon, link, className, tooltipText }: ContactLinkProps) => {
    return (
        <Tooltip text={tooltipText}>

            <a href={link} target='_blank' rel='noopener noreferrer'>
                <Icon className={`w-8 h-8 text-2xl hover:animate-pulse ${className}`} />
            </a>
        </Tooltip>
    );
};

const ContactMePage = () => {
    return (
        <>
            <Head>
                <title>Contact Me 📞</title>
            </Head>
            <div className='flex flex-col justify-center items-center min-h-screen animate-fadeIn'>
                <Card>
                    <CardTitle title='Contact Me 📞' />
                    <ImageLoader
                        className='rounded'
                        width={300}
                        height={300}
                        src='/images/contactUs.svg'
                        alt='image of someone calling'
                    />
                    <CardContent className='mt-2'>
                        <p>
                            Hey there! 🎉😄 If you have any questions, inquiries, or just want to say hello, feel free to get in touch with me using the contact form below! 💌📬 I&apos;m always super-duper happy to hear from you! 🤩💬
                        </p>
                        <div className='flex items-center justify-center gap-4 mt-4'>
                            <ContactLink icon={MdEmail} link='mailto:admin@mebrp.com?subject=Hi%20Mahdi👋😄'
                                className='text-email' tooltipText='Email' />
                            <ContactLink icon={FaTelegram} link='https://t.me/PiecesBoy'
                                className='text-telegram' tooltipText='Telegram' />
                            <ContactLink icon={FaInstagram} link='https://www.instagram.com/__rainstorm____/'
                                className='text-instagram' tooltipText='Instagram' />
                            <ContactLink icon={FaLinkedin} link='https://linkedin.com/in/mahdi-ebrahim-pour-51603922a'
                                className='text-linkedin' tooltipText='Linkedin' />
                            <ContactLink icon={FaGithub} link='https://github.com/MahdiEbrp'
                                className='text-github' tooltipText='Github' />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default ContactMePage;
