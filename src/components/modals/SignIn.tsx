import React, { useContext } from 'react';
import ImageLoader from '../ImageLoader';
import Modal from '../Modal';
import { SignInModalContext } from '../context/SignInContext';
import Button from '../Button';
import { signIn } from 'next-auth/react';

const SignIn = () => {
  const { isModalVisible, setModalVisibility } = useContext(SignInModalContext);

  return (
    <Modal isOpen={isModalVisible} title='Sign in' onClose={() => setModalVisibility(false)}>
      <ImageLoader className='rounded' src={'/images/login.jpg'} alt='lock,security,safe,login' width={300} height={300} />
      <div className='flex flex-col justify-center items-center' >
        <Button onClick={() => signIn('google')}>
          Sign in with Google
        </Button>
      </div>
    </Modal>
  );
};

export default SignIn;
