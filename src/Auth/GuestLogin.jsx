import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/AuthProvider';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const GUEST_SESSION_DURATION = 120000;

const GuestLogin = () => {
  const navigate = useNavigate()
  const { guestSignIn, signUserOut } = useUserContext()

  const signInAsGuest = async () => {

    try {
      await guestSignIn();
      // localStorage.setItem('guestLoginTimestamp', Date.now().toString());
      navigate("/");
    } catch (error) {
      toast.error(error.message)
      // console.error("Error signing in as guest", error);
    }
  };
  useEffect(() => {

    const loginTimestamp = localStorage.getItem('guestLoginTimestamp');
    if (loginTimestamp) {
      const currentTime = Date.now();
      const elapsedTime = currentTime - parseInt(loginTimestamp, 10);
      const remainingTime = GUEST_SESSION_DURATION - elapsedTime;

      if (remainingTime <= 0) {
        signUserOut();
      } 
    }
  }, [signUserOut]);

  return (
    <button className='w-[100%] flex items-center justify-center gap-4' type='button' onClick={signInAsGuest}>Sign in as Guest</button>
  );
};

export default GuestLogin