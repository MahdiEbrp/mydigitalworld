import Button from '@/components/Button';
import Card, { CardContent, CardTitle } from '@/components/Card';
import { useToast } from '@/context/ToastContext';
import Head from 'next/head';

export const Home = () => {
  const toast = useToast();
  const handleClick = () => {
    const type = Math.floor(Math.random() * 4);
    switch (type) {
      case 0:
        toast.showToast('you won 1000$', 'success', 4000);
        break;
      case 1:
        toast.showToast('you lost nothing', 'warning', 4000);
        break;
      case 2:
        toast.showToast('you lost 1000$', 'error', 4000);
        break;
      case 3:
        toast.showToast('your balance is zero', 'info', 4000);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className='flex justify-center items-center min-h-screen'>
        <Card>
          <CardTitle title='Home' />
          <CardContent><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.</p></CardContent>
          <Button onClick={handleClick}>
            Surprise Me!
          </Button>
        </Card>
      </div>


    </>
  );
};

export default Home;