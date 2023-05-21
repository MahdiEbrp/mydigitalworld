import React, { useContext } from 'react';
import ImageLoader from '../ImageLoader';
import Modal from '../Modal';
import { SignInModalContext } from '../../context/SignInContext';
import Button from '../Button';
import supabase from '@/lib/supabase';

const SignIn = () => {
  const { isModalVisible, setModalVisibility } = useContext(SignInModalContext);

  const handleGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  };
  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };
  return (
    <Modal isOpen={isModalVisible} title='Sign in' onClose={() => setModalVisibility(false)}>
      <ImageLoader className='rounded' src={'/images/login.jpg'} alt='lock,security,safe,login' width={300} height={300} />
      <div className='flex flex-col justify-center items-center' >
        <Button onClick={handleGoogle}>
          Sign in with Google
        </Button>
        <Button onClick={handleGitHub}>
          Sign in with Github
        </Button>
      </div>
    </Modal>
  );
};

export default SignIn;
