import React, { useState } from 'react';
import Card, { CardContent } from '../Card';
import ImageLoader from '../ImageLoader';
import Modal from '../Modal';

const SignIn = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Modal isOpen={isOpen} title='Sign in' onClose={()=>setIsOpen(false) }>

            <Card>
                <CardContent>
                    <ImageLoader className='rounded' src={'/images/login.jpg'} alt='lock,security,safe,login' width={300} height={300} />
                    <div className='flex flex-col justify-center items-center' >
                        {/* {Object.values(providers).map((provider) =>

                            <div key={provider.id} >
                                <Button onClick={() => signIn(provider.id)}>
                                    Sign in with {provider.name}
                                </Button>
                            </div>
                        )} */}
                    </div>
                </CardContent>
            </Card>
        </Modal>
    );
};

export default SignIn;