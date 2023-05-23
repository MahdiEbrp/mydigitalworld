import React, { useContext, useState } from 'react';
import ImageLoader from '../ImageLoader';
import Modal from '../Modal';
import Button from '../Button';
import supabase from '@/lib/supabase';
import CircularLoader from '../CircularLoader';
import SubjectItem from '../SubjectItem';
import { AiOutlineMail } from 'react-icons/ai';
import { VscSignIn } from 'react-icons/vsc';
import { getTimeSinceDate } from '@/lib/dateUtility';
import { SignInModalContext } from '../../context/SignInContext';
import { AuthContext } from '@/context/AuthContext';
import { Provider } from '@supabase/supabase-js';

const SignIn = () => {
  const { isModalVisible, setModalVisibility } = useContext(SignInModalContext);
  const { session, isLoading } = useContext(AuthContext);

  const handleSignInWithOAuth = async (provider: Provider) => {
    await supabase.auth.signInWithOAuth({ provider });
  };

  const SignInForm = () =>
    <>
      <ImageLoader className='rounded' src={'/images/login.jpg'} alt='lock,security,safe,login' width={300} height={300} />
      <div className='flex flex-col justify-center items-center'>
        <Button onClick={() => handleSignInWithOAuth('google')}>
          Sign in with Google
        </Button>
        <Button onClick={() => handleSignInWithOAuth('github')}>
          Sign in with Github
        </Button>
      </div>
    </>
    ;

  const UserInfo = () => {
    const user = session?.user;

    const [isSignOutDisabled, setIsSignOutDisabled] = useState(false);

    const handleSignOut = async () => {
      await supabase.auth.signOut();
      setModalVisibility(false);
      setIsSignOutDisabled(true);
    };

    if (!user) return <></>;

    return (
      <>
        {session.user.email &&
          <SubjectItem icon={AiOutlineMail} subject='Email' detail={session.user.email} />
        }
        {session.user.last_sign_in_at &&
          <SubjectItem icon={VscSignIn} subject='Last sign in' detail={getTimeSinceDate(session.user.last_sign_in_at)} />
        }
        <div className='flex flex-col items-center'>
          <Button disabled={isSignOutDisabled} className='w-fit' onClick={handleSignOut}>Sign out</Button>
        </div>
      </>
    );
  };

  return (
    <Modal isOpen={isModalVisible} title={session ? 'User Information' : 'Sign in'} onClose={() => setModalVisibility(false)}>
      {isLoading ?
        <CircularLoader />
        :
        <div className='mt-3'>{session ? <UserInfo /> : <SignInForm />}</div>
      }
    </Modal>
  );
};

export default SignIn;
