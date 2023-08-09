import Button from '../Button';
import CircularLoader from '../CircularLoader';
import ImageLoader from '../ImageLoader';
import Link from 'next/link';
import Modal from '../Modal';
import SubjectItem from '../SubjectItem';
import { AiOutlineMail } from 'react-icons/ai';
import { BsFillCalendarDateFill, BsGithub, BsGoogle } from 'react-icons/bs';
import { MdEmojiPeople } from 'react-icons/md';
import { SignInModalContext } from '../../context/SignInContext';
import { getTimeSinceDate } from '@/lib/dateUtility';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useContext, useState } from 'react';

const SignIn = () => {
  const { isModalVisible, setModalVisibility } = useContext(SignInModalContext);
  const { data: session, status } = useSession();

  const handleSignInWithOAuth = async (provider: string) => {
    await signIn(provider);
  };

  const SignInForm = () =>
    <>
      <ImageLoader className='rounded' src={'/images/login.jpg'} alt='lock,security,safe,login' width={300} height={300} />
      <div className='flex flex-col justify-center items-center' >
        <Button className='google' onClick={() => handleSignInWithOAuth('google')} >
          <span className='inline-flex items-center gap-1'>
            <BsGoogle />
            <span>
              Sign in with Google
            </span>
          </span>
        </Button>
        <Button className='github' onClick={() => handleSignInWithOAuth('github')}>
          <span className='inline-flex items-center gap-1'>
            <BsGithub />
            <span>
              Sign in with Github
            </span>
          </span>
        </Button>
      </div>
    </>
    ;

  const UserInfo = () => {
    const user = session?.user;

    const [isSignOutDisabled, setIsSignOutDisabled] = useState(false);

    const handleSignOut = async () => {
      await signOut();
      setModalVisibility(false);
      setIsSignOutDisabled(true);
    };

    if (!user) return <></>;
    return (
      <div>
        {user.image &&
          <ImageLoader src={user.image} width={128} height={128} alt='my avatar' className='rounded-full shadow-lg' />
        }
        {user.name &&
          <SubjectItem icon={MdEmojiPeople} subject='Name' detail={user.name} />
        }
        {user.email &&
          <SubjectItem icon={AiOutlineMail} subject='Email' detail={user.email} />
        }
        {user.createdAt &&
          <SubjectItem icon={BsFillCalendarDateFill} subject='Created at' detail={getTimeSinceDate(session.user.createdAt.toString())} />
        }
        <div className='flex flex-row items-center justify-center'>
          <Button disabled={isSignOutDisabled} className='w-fit' onClick={handleSignOut}>Sign out</Button>
          {user.isAdmin &&
            <Button className='w-fit' onClick={() => setModalVisibility(false)}>
              <Link href='/admin/adminPanel'>
                Admin panel
              </Link>
            </Button>
          }

        </div>
      </div >
    );
  };

  return (
    <Modal isOpen={isModalVisible} title={session ? 'User Information' : 'Sign in'} onClose={() => setModalVisibility(false)}>
      {status === 'loading' ?
        <CircularLoader />
        :
        <div className='mt-3'>{session ? <UserInfo /> : <SignInForm />}</div>
      }
    </Modal>
  );
};

export default SignIn;
